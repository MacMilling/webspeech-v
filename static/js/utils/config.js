// WebSpeech V - Configuration Constants
// Centralized configuration values

export const CONFIG = {
  // Supported languages for TTS
  SUPPORTED_LANGUAGES: [
    'zh-cn', 'en', 'ja', 'ko', 'es', 'de', 'fr', 'it', 
    'tr', 'ru', 'pt', 'pl', 'nl', 'ar', 'hu', 'cs'
  ],

  // File upload settings
  UPLOAD: {
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
    ALLOWED_AUDIO_TYPES: ['.wav', '.mp3', '.flac'],
    ALLOWED_SUBTITLE_TYPES: ['.srt']
  },

  // Audio recording settings
  RECORDING: {
    MAX_DURATION: 20, // seconds
    MIN_DURATION: 5   // seconds
  },

  // Speed constraints
  SPEED: {
    MIN: 0.1,
    MAX: 2.0,
    DEFAULT: 1.0,
    STEP: 0.05
  },

  // Model status check
  MODEL_STATUS: {
    CHECK_INTERVAL: 5000,  // milliseconds
    MAX_ATTEMPTS: 60       // attempts
  }
};

export default CONFIG;
