// WebSpeech V - API Client
// Centralized API communication using Fetch API

export class ApiClient {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   * @param {string} url - API endpoint
   * @param {object} options - Fetch options
   * @returns {Promise<object>} Response data
   */
  async request(url, options = {}) {
    try {
      const response = await fetch(this.baseUrl + url, {
        ...options,
        headers: {
          ...options.headers,
        },
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data;
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} url - API endpoint
   * @returns {Promise<object>} Response data
   */
  async get(url) {
    return this.request(url, { method: 'GET' });
  }

  /**
   * POST request with JSON data
   * @param {string} url - API endpoint
   * @param {object} data - Data to send
   * @returns {Promise<object>} Response data
   */
  async post(url, data) {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    return this.request(url, {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * POST request with FormData (for file uploads)
   * @param {string} url - API endpoint
   * @param {FormData} formData - FormData object
   * @returns {Promise<object>} Response data
   */
  async postFormData(url, formData) {
    return this.request(url, {
      method: 'POST',
      body: formData,
    });
  }

  /**
   * Upload audio file
   * @param {File} file - Audio file to upload
   * @param {string} saveDir - Directory to save the file (optional)
   * @returns {Promise<object>} Upload response
   */
  async uploadAudio(file, saveDir = '') {
    const formData = new FormData();
    formData.append('audio', file);
    if (saveDir) {
      formData.append('save_dir', saveDir);
    }

    return this.postFormData('/upload', formData);
  }

  /**
   * Get list of available voices
   * @returns {Promise<Array>} Array of voice filenames
   */
  async getVoiceList() {
    return this.get('/init');
  }

  /**
   * Get model status
   * @returns {Promise<object>} Object with model statuses
   */
  async getModelStatus() {
    return this.get('/isstart');
  }

  /**
   * Toggle model on/off
   * @param {string} name - Model name
   * @param {string} statusNew - New status ('on' or 'off')
   * @returns {Promise<object>} Response with updated status
   */
  async toggleModel(name, statusNew) {
    return this.post('/onoroff', {
      name: name,
      status_new: statusNew,
    });
  }

  /**
   * Generate speech from text (TTS)
   * @param {object} params - TTS parameters
   * @param {string} params.text - Text to synthesize
   * @param {string} params.voice - Voice file to use
   * @param {string} params.language - Language code
   * @param {number} params.speed - Speech speed (0.1-2.0)
   * @param {string} params.model - Model name (optional)
   * @returns {Promise<object>} TTS result
   */
  async generateTTS(params) {
    const { text, voice, language, speed, model } = params;
    return this.post('/tts', {
      text,
      voice,
      language,
      speed: speed || 1.0,
      model: model || '',
    });
  }

  /**
   * Convert speech to speech (STS)
   * @param {object} params - STS parameters
   * @param {string} params.voice - Target voice file
   * @param {string} params.name - Source audio file name
   * @returns {Promise<object>} STS result
   */
  async generateSTS(params) {
    const { voice, name } = params;
    return this.post('/sts', {
      voice,
      name,
    });
  }

  /**
   * Check for updates
   * @returns {Promise<object>} Update information
   */
  async checkUpdate() {
    return this.get('/checkupdate');
  }

  /**
   * Get STS thread status
   * @returns {Promise<object>} STS status
   */
  async getStsStatus() {
    return this.get('/stsstatus');
  }
}

// Export singleton instance
export default new ApiClient();
