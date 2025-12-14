// WebSpeech V - Model Manager
// Handles model status management and control

import apiClient from './api-client.js';
import i18n from '../utils/i18n.js';

export class ModelManager {
  constructor() {
    this.models = {};
    this.modelListElement = null;
    this.modelSelectElement = null;
    this.updateInterval = null;
  }

  /**
   * Initialize model manager with DOM elements
   * @param {HTMLElement} modelListElement - Container for model buttons
   * @param {HTMLSelectElement} modelSelectElement - Select dropdown for models
   */
  init(modelListElement, modelSelectElement) {
    this.modelListElement = modelListElement;
    this.modelSelectElement = modelSelectElement;
    
    // Load initial model status
    this.loadModels();
  }

  /**
   * Load model status from server
   * @returns {Promise<void>}
   */
  async loadModels() {
    try {
      const models = await apiClient.getModelStatus();
      this.models = models || {};
      this.render();
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  }

  /**
   * Render model list and select options
   * @private
   */
  render() {
    if (!this.modelListElement) return;

    const messages = i18n.getMessages();
    const language = i18n.getLanguage();
    
    // Clear existing content
    this.modelListElement.innerHTML = '';
    
    // Build model buttons
    let buttonsHtml = '';
    let selectHtml = `<option value="default">${language === 'zh' ? '默认' : 'Default'}</option>`;
    
    for (const name in this.models) {
      const status = this.models[name];
      const statusText = status ? messages.lang19 : messages.lang20;
      const dataStatus = status ? 'on' : 'off';
      
      buttonsHtml += `
        <button 
          data-model-id="${name}" 
          class="btn btn-sm btn-outline-primary flex-grow-0" 
          data-status="${dataStatus}" 
          onclick="window.app.modelManager.toggleModel('${name}', this)"
        >
          ${name}/${statusText}
        </button>
      `;
      
      selectHtml += `<option value="${name}">${name}/${statusText}</option>`;
    }
    
    this.modelListElement.innerHTML = buttonsHtml;
    
    if (this.modelSelectElement) {
      this.modelSelectElement.innerHTML = selectHtml;
    }
  }

  /**
   * Toggle model on/off
   * @param {string} name - Model name
   * @param {HTMLElement} buttonElement - Button element that triggered the toggle
   * @returns {Promise<void>}
   */
  async toggleModel(name, buttonElement) {
    const currentStatus = buttonElement.getAttribute('data-status');
    const newStatus = currentStatus === 'on' ? 'off' : 'on';
    const messages = i18n.getMessages();
    const language = i18n.getLanguage();

    try {
      // Show loading state
      if (window.layer) {
        var loadingIndex = window.layer.load();
      }

      const result = await apiClient.toggleModel(name, newStatus);

      if (window.layer) {
        window.layer.close(loadingIndex);
      }

      if (result && result.code === 0) {
        // Update status
        this.models[name] = newStatus === 'on';
        
        // Update button
        const statusText = newStatus === 'on' ? messages.lang19 : messages.lang20;
        buttonElement.setAttribute('data-status', newStatus);
        buttonElement.textContent = `${name}/${statusText}`;
        
        // Update select option
        if (this.modelSelectElement) {
          const option = this.modelSelectElement.querySelector(`option[value="${name}"]`);
          if (option) {
            option.textContent = `${name}/${statusText}`;
          }
        }

        // Show success message
        if (window.layer) {
          window.layer.msg(result.msg || (language === 'zh' ? '操作成功' : 'Success'));
        }
      } else {
        // Show error message
        if (window.layer) {
          window.layer.alert(
            result && result.msg ? result.msg : 'Error',
            { title: false }
          );
        } else {
          alert(result && result.msg ? result.msg : 'Error');
        }
      }
    } catch (error) {
      if (window.layer) {
        window.layer.close(loadingIndex);
        window.layer.alert('Failed to toggle model: ' + error.message, { title: false });
      } else {
        alert('Failed to toggle model: ' + error.message);
      }
      console.error('Toggle model error:', error);
    }
  }

  /**
   * Get model status
   * @param {string} name - Model name
   * @returns {boolean} True if model is running
   */
  getModelStatus(name) {
    return this.models[name] === true || this.models[name] === 'on';
  }

  /**
   * Get all models
   * @returns {object} Object containing all models and their statuses
   */
  getAllModels() {
    return { ...this.models };
  }

  /**
   * Check if a model is running
   * @param {string} name - Model name
   * @returns {boolean} True if model is running
   */
  isModelRunning(name) {
    if (!name || name === 'default') {
      return true; // Default model is always considered running
    }
    return this.getModelStatus(name);
  }

  /**
   * Start periodic model status updates
   * @param {number} interval - Update interval in milliseconds (default: 30000)
   */
  startAutoUpdate(interval = 30000) {
    this.stopAutoUpdate();
    this.updateInterval = setInterval(() => {
      this.loadModels();
    }, interval);
  }

  /**
   * Stop periodic model status updates
   */
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.stopAutoUpdate();
    this.models = {};
    this.modelListElement = null;
    this.modelSelectElement = null;
  }
}

export default ModelManager;
