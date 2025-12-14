// WebSpeech V - Input Validators
// Validation functions for form inputs

import CONFIG from './config.js';

export class Validators {
  /**
   * Validate text input for TTS
   * @param {string} text - Text to validate
   * @returns {object} {valid: boolean, error: string}
   */
  static validateText(text) {
    if (!text || !text.trim()) {
      return { valid: false, error: 'Text is required' };
    }

    // Check if text contains only special characters and whitespace
    const specialCharsOnly = /^[~`!@#$%^&*()_+=,./;':\[\]{}<>?\\|"，。？；'：""'｛【】｝！·￥、\s\n\r -]*$/;
    if (specialCharsOnly.test(text)) {
      return { valid: false, error: 'Text contains only special characters' };
    }

    return { valid: true, error: null };
  }

  /**
   * Validate voice selection
   * @param {string} voice - Selected voice
   * @returns {object} {valid: boolean, error: string}
   */
  static validateVoice(voice) {
    if (!voice || voice.trim() === '') {
      return { valid: false, error: 'Voice selection is required' };
    }
    return { valid: true, error: null };
  }

  /**
   * Validate language selection
   * @param {string} language - Selected language code
   * @returns {object} {valid: boolean, error: string}
   */
  static validateLanguage(language) {
    if (!language || !CONFIG.SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
      return { valid: false, error: 'Invalid language selection' };
    }
    
    return { valid: true, error: null };
  }

  /**
   * Validate speed parameter
   * @param {number} speed - Speed value
   * @returns {object} {valid: boolean, error: string, value: number}
   */
  static validateSpeed(speed) {
    const speedNum = parseFloat(speed);
    
    if (isNaN(speedNum)) {
      return { valid: false, error: 'Speed must be a number', value: CONFIG.SPEED.DEFAULT };
    }
    
    if (speedNum < CONFIG.SPEED.MIN || speedNum > CONFIG.SPEED.MAX) {
      return { 
        valid: false, 
        error: `Speed must be between ${CONFIG.SPEED.MIN} and ${CONFIG.SPEED.MAX}`, 
        value: CONFIG.SPEED.DEFAULT 
      };
    }
    
    return { valid: true, error: null, value: speedNum };
  }

  /**
   * Validate file type
   * @param {File} file - File object
   * @param {Array} allowedTypes - Array of allowed file extensions
   * @returns {object} {valid: boolean, error: string}
   */
  static validateFile(file, allowedTypes = ['.wav', '.mp3', '.flac']) {
    if (!file) {
      return { valid: false, error: 'No file selected' };
    }

    const fileName = file.name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
      return { 
        valid: false, 
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
      };
    }

    return { valid: true, error: null };
  }

  /**
   * Validate SRT file
   * @param {File} file - File object
   * @returns {object} {valid: boolean, error: string}
   */
  static validateSrtFile(file) {
    if (!file) {
      return { valid: false, error: 'No file selected' };
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.srt')) {
      return { valid: false, error: 'Only SRT subtitle files are allowed' };
    }

    return { valid: true, error: null };
  }

  /**
   * Validate audio upload for STS
   * @param {string} audioName - Name of uploaded audio
   * @returns {object} {valid: boolean, error: string}
   */
  static validateStsAudio(audioName) {
    if (!audioName || audioName.trim() === '') {
      return { valid: false, error: 'Audio file is required for speech-to-speech conversion' };
    }
    return { valid: true, error: null };
  }

  /**
   * Sanitize text input to prevent XSS
   * @param {string} text - Text to sanitize
   * @returns {string} Sanitized text
   */
  static sanitizeText(text) {
    if (!text) return '';
    
    // Create a temporary element to use browser's built-in text sanitization
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
  }

  /**
   * Validate model status before processing
   * @param {string} modelId - Model ID
   * @param {object} modelStatus - Object containing model statuses
   * @returns {object} {valid: boolean, error: string}
   */
  static validateModelStatus(modelId, modelStatus) {
    if (!modelId || modelId === 'default') {
      return { valid: true, error: null };
    }

    if (!modelStatus || !modelStatus[modelId]) {
      return { valid: false, error: 'Model not found' };
    }

    if (modelStatus[modelId] !== 'on') {
      return { valid: false, error: 'Model is not running. Please start the model first.' };
    }

    return { valid: true, error: null };
  }
}

export default Validators;
