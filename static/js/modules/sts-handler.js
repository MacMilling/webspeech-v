// WebSpeech V - Speech-to-Speech Handler
// Handles STS operations

import apiClient from './api-client.js';
import { Validators } from '../utils/validators.js';
import i18n from '../utils/i18n.js';

export class StsHandler {
  constructor() {
    this.isProcessing = false;
    this.uploadedAudioName = null;
    this.timer = null;
    this.elapsedTime = 0;
    this.statusCheckTimer = null;
    this.statusCheckAttempts = 0;
    this.maxStatusCheckAttempts = 60; // Check for 5 minutes (60 * 5 seconds)
  }

  /**
   * Set uploaded audio file name
   * @param {string} audioName - Name of uploaded audio file
   */
  setUploadedAudio(audioName) {
    this.uploadedAudioName = audioName;
  }

  /**
   * Get uploaded audio file name
   * @returns {string} Audio file name
   */
  getUploadedAudio() {
    return this.uploadedAudioName;
  }

  /**
   * Convert speech to speech
   * @param {object} params - STS parameters
   * @param {string} params.voice - Target voice file
   * @param {Function} onProgress - Progress callback
   * @param {Function} onComplete - Completion callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async generate(params, onProgress, onComplete, onError) {
    const messages = i18n.getMessages();

    // Validate voice
    const voiceValidation = Validators.validateVoice(params.voice);
    if (!voiceValidation.valid) {
      if (onError) onError(messages.lang10);
      return;
    }

    // Validate uploaded audio
    const audioValidation = Validators.validateStsAudio(this.uploadedAudioName);
    if (!audioValidation.valid) {
      if (onError) onError(messages.lang12);
      return;
    }

    // Check if already processing
    if (this.isProcessing) {
      if (onError) onError('Already processing a request');
      return;
    }

    try {
      this.isProcessing = true;
      this.elapsedTime = 0;

      // Start progress timer
      this.startProgressTimer(onProgress);

      // Make API call
      const result = await apiClient.generateSTS({
        voice: params.voice,
        name: this.uploadedAudioName
      });

      // Stop timer
      this.stopProgressTimer();

      // Handle result
      if (result.code === 0) {
        if (onComplete) {
          onComplete(result);
        }
      } else {
        if (onError) {
          onError(result.msg || 'STS conversion failed');
        }
      }
    } catch (error) {
      this.stopProgressTimer();
      console.error('STS conversion error:', error);
      if (onError) {
        onError('Error: ' + error.message);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Check STS thread status
   * @param {Function} onStatus - Status callback
   * @returns {Promise<void>}
   */
  async checkStatus(onStatus) {
    try {
      const result = await apiClient.getStsStatus();
      
      if (result.code === 0) {
        const isRunning = result.msg !== 'stop';
        
        if (onStatus) {
          onStatus(isRunning, result.msg);
        }

        // If not running and haven't exceeded max attempts, check again
        if (!isRunning && this.statusCheckAttempts < this.maxStatusCheckAttempts) {
          this.statusCheckAttempts++;
          setTimeout(() => this.checkStatus(onStatus), 5000);
        }
      }
    } catch (error) {
      console.error('STS status check error:', error);
    }
  }

  /**
   * Start status checking
   * @param {Function} onStatus - Status callback
   */
  startStatusCheck(onStatus) {
    this.statusCheckAttempts = 0;
    this.checkStatus(onStatus);
  }

  /**
   * Stop status checking
   */
  stopStatusCheck() {
    if (this.statusCheckTimer) {
      clearTimeout(this.statusCheckTimer);
      this.statusCheckTimer = null;
    }
    this.statusCheckAttempts = 0;
  }

  /**
   * Start progress timer
   * @param {Function} onProgress - Progress callback
   * @private
   */
  startProgressTimer(onProgress) {
    this.stopProgressTimer();
    
    this.timer = setInterval(() => {
      this.elapsedTime += 1;
      if (onProgress) {
        onProgress(this.elapsedTime);
      }
    }, 1000);
  }

  /**
   * Stop progress timer
   * @private
   */
  stopProgressTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.elapsedTime = 0;
  }

  /**
   * Clear uploaded audio
   */
  clearUploadedAudio() {
    this.uploadedAudioName = null;
  }

  /**
   * Cancel current operation
   */
  cancel() {
    this.stopProgressTimer();
    this.stopStatusCheck();
    this.isProcessing = false;
  }

  /**
   * Check if currently processing
   * @returns {boolean} True if processing
   */
  isActive() {
    return this.isProcessing;
  }

  /**
   * Get elapsed time
   * @returns {number} Elapsed time in seconds
   */
  getElapsedTime() {
    return this.elapsedTime;
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.cancel();
    this.clearUploadedAudio();
  }
}

export default StsHandler;
