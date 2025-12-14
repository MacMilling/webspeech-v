// WebSpeech V - File Upload Handler
// Handles file upload (drag-drop and click)

import apiClient from './api-client.js';

export class FileUpload {
  constructor(dropZoneElement, options = {}) {
    this.dropZone = dropZoneElement;
    this.options = {
      allowedTypes: options.allowedTypes || ['.wav', '.mp3', '.flac'],
      maxSize: options.maxSize || 100 * 1024 * 1024, // 100MB default
      saveDir: options.saveDir || '',
      onUploadStart: options.onUploadStart || null,
      onUploadProgress: options.onUploadProgress || null,
      onUploadComplete: options.onUploadComplete || null,
      onUploadError: options.onUploadError || null,
    };

    if (this.dropZone) {
      this.setupEventListeners();
    }
  }

  /**
   * Set up drag and drop event listeners
   * @private
   */
  setupEventListeners() {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, this.preventDefaults, false);
      document.body.addEventListener(eventName, this.preventDefaults, false);
    });

    // Highlight drop zone when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, () => this.highlight(), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, () => this.unhighlight(), false);
    });

    // Handle dropped files
    this.dropZone.addEventListener('drop', (e) => this.handleDrop(e), false);

    // Handle click to open file picker
    this.dropZone.addEventListener('click', () => this.openFilePicker(), false);
  }

  /**
   * Prevent default drag behaviors
   * @param {Event} e - Event object
   * @private
   */
  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Highlight drop zone
   * @private
   */
  highlight() {
    this.dropZone.classList.add('dragover');
  }

  /**
   * Remove highlight from drop zone
   * @private
   */
  unhighlight() {
    this.dropZone.classList.remove('dragover');
  }

  /**
   * Handle file drop
   * @param {DragEvent} e - Drag event
   * @private
   */
  handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  /**
   * Open file picker dialog
   */
  openFilePicker() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = this.options.allowedTypes.join(',');
    
    input.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleFile(e.target.files[0]);
      }
    });

    input.click();
  }

  /**
   * Handle file selection
   * @param {File} file - Selected file
   */
  async handleFile(file) {
    // Validate file
    const validation = this.validateFile(file);
    if (!validation.valid) {
      if (this.options.onUploadError) {
        this.options.onUploadError(validation.error);
      }
      return;
    }

    try {
      // Notify upload start
      if (this.options.onUploadStart) {
        this.options.onUploadStart(file);
      }

      // Upload file
      const result = await apiClient.uploadAudio(file, this.options.saveDir);

      // Handle response
      if (result.code === 0) {
        if (this.options.onUploadComplete) {
          this.options.onUploadComplete(result.data, file);
        }
      } else {
        if (this.options.onUploadError) {
          this.options.onUploadError(result.msg || 'Upload failed');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (this.options.onUploadError) {
        this.options.onUploadError('Upload failed: ' + error.message);
      }
    }
  }

  /**
   * Validate file before upload
   * @param {File} file - File to validate
   * @returns {object} Validation result
   * @private
   */
  validateFile(file) {
    // Check if file exists
    if (!file) {
      return { valid: false, error: 'No file selected' };
    }

    // Check file type
    const fileName = file.name.toLowerCase();
    const isValidType = this.options.allowedTypes.some(type => 
      fileName.endsWith(type.toLowerCase())
    );

    if (!isValidType) {
      return { 
        valid: false, 
        error: `Invalid file type. Allowed: ${this.options.allowedTypes.join(', ')}` 
      };
    }

    // Check file size
    if (file.size > this.options.maxSize) {
      const maxSizeMB = Math.round(this.options.maxSize / 1024 / 1024);
      return { 
        valid: false, 
        error: `File too large. Maximum size: ${maxSizeMB}MB` 
      };
    }

    return { valid: true, error: null };
  }

  /**
   * Update display text in drop zone
   * @param {string} text - Text to display
   */
  updateDisplayText(text) {
    if (this.dropZone) {
      this.dropZone.textContent = text;
    }
  }

  /**
   * Reset drop zone to initial state
   */
  reset() {
    this.unhighlight();
  }

  /**
   * Clean up event listeners
   */
  dispose() {
    if (this.dropZone) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        this.dropZone.removeEventListener(eventName, this.preventDefaults, false);
      });
    }
  }
}

export default FileUpload;
