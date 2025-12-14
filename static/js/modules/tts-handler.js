// WebSpeech V - Text-to-Speech Handler
// Handles TTS operations

import apiClient from './api-client.js';
import { Validators } from '../utils/validators.js';
import i18n from '../utils/i18n.js';

export class TtsHandler {
  constructor() {
    this.isProcessing = false;
    this.currentJobId = null;
    this.timer = null;
    this.elapsedTime = 0;
  }

  /**
   * Generate speech from text
   * @param {object} params - TTS parameters
   * @param {string} params.text - Text to synthesize
   * @param {string} params.voice - Voice file to use
   * @param {string} params.language - Language code
   * @param {number} params.speed - Speech speed
   * @param {string} params.model - Model name (optional)
   * @param {Function} onProgress - Progress callback
   * @param {Function} onComplete - Completion callback
   * @param {Function} onError - Error callback
   * @returns {Promise<void>}
   */
  async generate(params, onProgress, onComplete, onError) {
    const messages = i18n.getMessages();

    // Validate inputs
    const textValidation = Validators.validateText(params.text);
    if (!textValidation.valid) {
      if (onError) onError(messages.lang11);
      return;
    }

    const voiceValidation = Validators.validateVoice(params.voice);
    if (!voiceValidation.valid) {
      if (onError) onError(messages.lang10);
      return;
    }

    const speedValidation = Validators.validateSpeed(params.speed);
    if (!speedValidation.valid) {
      if (onError) onError(messages.lang16);
      params.speed = speedValidation.value; // Use default value
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
      const result = await apiClient.generateTTS({
        text: params.text,
        voice: params.voice,
        language: params.language,
        speed: params.speed,
        model: params.model || ''
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
          onError(result.msg || 'TTS generation failed');
        }
      }
    } catch (error) {
      this.stopProgressTimer();
      console.error('TTS generation error:', error);
      if (onError) {
        onError('Error: ' + error.message);
      }
    } finally {
      this.isProcessing = false;
    }
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
   * Cancel current operation
   */
  cancel() {
    this.stopProgressTimer();
    this.isProcessing = false;
    this.currentJobId = null;
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
  }
}

export default TtsHandler;
