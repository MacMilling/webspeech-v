// WebSpeech V - Main Application
// Application initialization and coordination

import apiClient from './modules/api-client.js';
import AudioRecorder from './modules/audio-recorder.js';
import AudioPlayer from './modules/audio-player.js';
import FileUpload from './modules/file-upload.js';
import ModelManager from './modules/model-manager.js';
import TtsHandler from './modules/tts-handler.js';
import StsHandler from './modules/sts-handler.js';
import i18n from './utils/i18n.js';
import { Validators } from './utils/validators.js';

class WebSpeechApp {
  constructor() {
    // Core components
    this.audioRecorder = null;
    this.audioPlayer = null;
    this.fileUpload = null;
    this.modelManager = new ModelManager();
    this.ttsHandler = new TtsHandler();
    this.stsHandler = new StsHandler();
    
    // State
    this.currentMode = 'tts'; // 'tts' or 'sts'
    this.initialized = false;
  }

  /**
   * Initialize the application
   * @param {object} config - Configuration object from server
   */
  async init(config) {
    if (this.initialized) return;

    // Initialize i18n
    i18n.init(config.language || 'en');

    // Initialize components
    this.initializeAudioRecorder();
    this.initializeAudioPlayer();
    this.initializeFileUpload();
    this.initializeModelManager();
    this.initializeEventListeners();

    // Load initial data
    await this.loadVoiceList();
    await this.modelManager.loadModels();

    // Check for updates
    this.checkForUpdates();

    // Start STS status check if voice model exists
    if (config.voiceModel) {
      this.stsHandler.startStatusCheck(this.handleStsStatus.bind(this));
    }

    this.initialized = true;
    console.log('WebSpeech V initialized');
  }

  /**
   * Initialize audio recorder
   * @private
   */
  initializeAudioRecorder() {
    this.audioRecorder = new AudioRecorder();
    const messages = i18n.getMessages();

    // Set up recorder callbacks
    this.audioRecorder.onTimeUpdate = (time) => {
      const startButton = document.getElementById('startRecord');
      if (startButton) {
        startButton.textContent = `${messages.lang4}${time}s`;
      }
    };

    this.audioRecorder.onRecordingComplete = (blob) => {
      const audioPlayer = document.getElementById('audioPlayer');
      if (audioPlayer) {
        const audioUrl = URL.createObjectURL(blob);
        audioPlayer.src = audioUrl;
      }

      const uploadButton = document.getElementById('upload');
      if (uploadButton) {
        uploadButton.disabled = false;
      }
    };
  }

  /**
   * Initialize audio player
   * @private
   */
  initializeAudioPlayer() {
    const downloadBtn = document.getElementById('downloadbtn');
    if (downloadBtn) {
      this.audioPlayer = new AudioPlayer(downloadBtn);
      this.audioPlayer.showControls();
    }
  }

  /**
   * Initialize file upload for STS
   * @private
   */
  initializeFileUpload() {
    const dropZone = document.getElementById('dropaudio');
    if (!dropZone) return;

    const language = i18n.getLanguage();
    const messages = i18n.getMessages();

    this.fileUpload = new FileUpload(dropZone, {
      saveDir: 'tmp',
      onUploadStart: (file) => {
        dropZone.textContent = language === 'zh' ? '上传中请稍等..' : 'Uploading...';
      },
      onUploadComplete: (fileName, file) => {
        const isWav = file.name.toLowerCase().endsWith('.wav');
        const okText = isWav ? 'OK: ' : messages.lang15;
        dropZone.textContent = okText + fileName;
        this.stsHandler.setUploadedAudio(fileName);
      },
      onUploadError: (error) => {
        dropZone.textContent = 'Error: ' + error;
      }
    });
  }

  /**
   * Initialize model manager
   * @private
   */
  initializeModelManager() {
    const modelList = document.getElementById('model_list');
    const modelSelect = document.getElementById('model');
    
    this.modelManager.init(modelList, modelSelect);
  }

  /**
   * Initialize event listeners
   * @private
   */
  initializeEventListeners() {
    // Recording controls
    const startRecord = document.getElementById('startRecord');
    const stopRecord = document.getElementById('stopRecord');
    const uploadRecord = document.getElementById('upload');

    if (startRecord) {
      startRecord.addEventListener('click', () => this.handleStartRecording());
    }

    if (stopRecord) {
      stopRecord.addEventListener('click', () => this.handleStopRecording());
    }

    if (uploadRecord) {
      uploadRecord.addEventListener('click', () => this.handleUploadRecording());
    }

    // File input for local upload
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleLocalFileUpload(e));
    }

    // SRT file upload
    const srtInputs = document.querySelectorAll('input[type="file"][accept=".srt"]');
    srtInputs.forEach(input => {
      input.addEventListener('change', (e) => this.handleSrtUpload(e));
    });

    // Start generation button
    const startButton = document.getElementById('start_button');
    if (startButton) {
      startButton.addEventListener('click', () => this.handleStartGeneration());
    }

    // Voice audition
    const auditionLinks = document.querySelectorAll('[onclick*="shiting"]');
    auditionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleVoiceAudition();
      });
    });

    // Model selection change
    const modelSelect = document.getElementById('model');
    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => this.handleModelChange(e));
    }
  }

  /**
   * Load voice list from server
   * @private
   */
  async loadVoiceList() {
    try {
      const voices = await apiClient.getVoiceList();
      
      const audioSelect = document.getElementById('audioSelect');
      const audioSelect2 = document.getElementById('audioSelect2');

      if (voices && voices.length > 0) {
        const html = voices.map(voice => 
          `<option value="${voice}">${voice}</option>`
        ).join('');

        if (audioSelect) audioSelect.innerHTML = html;
        if (audioSelect2) audioSelect2.innerHTML = html;
      }
    } catch (error) {
      console.error('Failed to load voice list:', error);
    }
  }

  /**
   * Check for application updates
   * @private
   */
  async checkForUpdates() {
    try {
      const result = await apiClient.checkUpdate();
      
      if (result.code === 0 && result.msg) {
        const updateLink = document.getElementById('checkupdate');
        if (updateLink) {
          updateLink.classList.remove('d-none');
          updateLink.textContent = result.msg;
        }
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
    }
  }

  /**
   * Handle STS status updates
   * @param {boolean} isRunning - Whether STS thread is running
   * @param {string} message - Status message
   * @private
   */
  handleStsStatus(isRunning, message) {
    const stsNo = document.getElementById('sts_no');
    const language = i18n.getLanguage();

    if (!stsNo) return;

    if (!isRunning) {
      const errorMsg = language === 'zh' 
        ? '声音转声音 线程未启动，如果已下载了模型，请打开 .env 文件将 ENABLE_STS=0 改为 ENABLE_STS=1，然后重启软件'
        : 'The sts model has not been launched yet, please download it and set .env ENABLE_STS=0 to ENABLE_STS=1';
      stsNo.classList.remove('d-none');
      stsNo.textContent = errorMsg;
    } else {
      stsNo.classList.add('d-none');
      stsNo.textContent = '';
    }
  }

  /**
   * Toggle between TTS and STS modes
   * @param {string} mode - Mode to switch to ('tts' or 'sts')
   */
  toggleMode(mode) {
    this.currentMode = mode;
    
    const ttsArea = document.getElementById('tts-area');
    const stsArea = document.getElementById('sts-area');

    if (mode === 'tts') {
      ttsArea?.classList.remove('d-none');
      stsArea?.classList.add('d-none');
    } else {
      ttsArea?.classList.add('d-none');
      stsArea?.classList.remove('d-none');
    }
  }

  /**
   * Handle start recording
   * @private
   */
  async handleStartRecording() {
    const messages = i18n.getMessages();
    const startButton = document.getElementById('startRecord');
    const stopButton = document.getElementById('stopRecord');
    const uploadButton = document.getElementById('upload');
    const audioPlayer = document.getElementById('audioPlayer');

    try {
      await this.audioRecorder.startRecording();
      
      startButton.textContent = messages.lang2 + '...';
      startButton.disabled = true;
      stopButton.disabled = false;
      uploadButton.disabled = true;
      uploadButton.setAttribute('title', messages.lang3);

      if (audioPlayer) {
        audioPlayer.src = null;
        audioPlayer.load();
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to start recording. Please check microphone permissions.');
    }
  }

  /**
   * Handle stop recording
   * @private
   */
  async handleStopRecording() {
    const messages = i18n.getMessages();
    const startButton = document.getElementById('startRecord');
    const stopButton = document.getElementById('stopRecord');
    const uploadButton = document.getElementById('upload');

    try {
      await this.audioRecorder.stopRecording();
      
      startButton.disabled = false;
      startButton.textContent = messages.lang5;
      stopButton.disabled = true;
      uploadButton.disabled = false;
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }

  /**
   * Handle upload recording
   * @private
   */
  async handleUploadRecording() {
    const messages = i18n.getMessages();
    const uploadButton = document.getElementById('upload');

    try {
      // Get recorded audio blob
      const audioBlob = new Blob(this.audioRecorder.audioChunks, { type: 'audio/wav' });
      
      // Create form data
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recorded_audio.wav');

      // Show loading
      const loadingIndex = window.layer ? window.layer.load() : null;

      // Upload
      const result = await apiClient.postFormData('/upload', formData);

      if (loadingIndex && window.layer) {
        window.layer.close(loadingIndex);
      }

      if (result.code === 0) {
        const audioSelect = document.getElementById('audioSelect');
        if (audioSelect) {
          // Remove previous selection
          const prevSelected = audioSelect.querySelector('option[selected]');
          if (prevSelected) {
            prevSelected.removeAttribute('selected');
          }
          
          // Add new option
          const newOption = document.createElement('option');
          newOption.value = result.data;
          newOption.textContent = result.data;
          newOption.selected = true;
          audioSelect.insertBefore(newOption, audioSelect.firstChild);
        }

        uploadButton.disabled = true;
        uploadButton.setAttribute('title', messages.lang6);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload recording');
    }
  }

  /**
   * Handle local file upload
   * @param {Event} event - Change event
   * @private
   */
  async handleLocalFileUpload(event) {
    const messages = i18n.getMessages();
    const file = event.target.files[0];

    if (!file) {
      if (window.layer) {
        window.layer.alert(messages.lang7, { title: false });
      }
      return;
    }

    try {
      const loadingIndex = window.layer ? window.layer.load() : null;
      const result = await apiClient.uploadAudio(file);

      if (loadingIndex && window.layer) {
        window.layer.close(loadingIndex);
      }

      if (result.code === 0) {
        if (window.layer) {
          window.layer.msg('OK');
        }

        const audioSelect = document.getElementById('audioSelect');
        if (audioSelect) {
          const prevSelected = audioSelect.querySelector('option[selected]');
          if (prevSelected) {
            prevSelected.removeAttribute('selected');
          }

          const newOption = document.createElement('option');
          newOption.value = result.data;
          newOption.textContent = result.data;
          newOption.selected = true;
          audioSelect.insertBefore(newOption, audioSelect.firstChild);
        }

        // Reset file input
        event.target.value = '';
      } else {
        if (window.layer) {
          window.layer.msg(result.msg || 'Error', { icon: 2 });
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  /**
   * Handle SRT file upload
   * @param {Event} event - Change event
   * @private
   */
  handleSrtUpload(event) {
    const messages = i18n.getMessages();
    const file = event.target.files[0];
    const textarea = document.getElementById('textInput');

    if (!file) {
      if (window.layer) {
        window.layer.alert(messages.lang9, { title: false });
      }
      return;
    }

    if (!file.name.toLowerCase().endsWith('.srt')) {
      if (window.layer) {
        window.layer.alert(messages.lang8, { title: false });
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (textarea) {
        textarea.value = e.target.result;
      }
    };
    reader.readAsText(file);
  }

  /**
   * Handle voice audition
   * @private
   */
  handleVoiceAudition() {
    const messages = i18n.getMessages();
    const audioSelect = document.getElementById('audioSelect');
    
    if (!audioSelect) return;

    const wavUrl = audioSelect.value;
    if (!wavUrl) {
      if (window.layer) {
        window.layer.alert(messages.lang1, { title: false });
      }
      return;
    }

    // Create temporary audio element
    const audio = new Audio('/static/voicelist/' + wavUrl);
    
    audio.addEventListener('ended', () => {
      document.body.removeChild(audio);
    });

    document.body.appendChild(audio);
    audio.play().catch(err => {
      console.error('Playback failed:', err);
      document.body.removeChild(audio);
    });
  }

  /**
   * Handle model selection change
   * @param {Event} event - Change event
   * @private
   */
  handleModelChange(event) {
    const language = i18n.getLanguage();
    const modelName = event.target.value;
    const audioSelect = document.getElementById('audioSelect');
    const startRecord = document.getElementById('startRecord');

    if (modelName !== 'default') {
      audioSelect?.setAttribute('disabled', 'true');
      startRecord?.setAttribute('disabled', 'true');

      // Check if model is running
      if (!this.modelManager.isModelRunning(modelName)) {
        const message = language === 'zh' 
          ? '该模型还没有启动，请启动后使用'
          : 'The model has not been launched yet, please launch it and use it';
        
        if (window.layer) {
          window.layer.alert(message, { title: false });
        }
      }
    } else {
      audioSelect?.removeAttribute('disabled');
      startRecord?.removeAttribute('disabled');
    }
  }

  /**
   * Handle start generation (TTS or STS)
   * @private
   */
  async handleStartGeneration() {
    const messages = i18n.getMessages();
    const language = i18n.getLanguage();

    if (this.currentMode === 'tts') {
      await this.handleTtsGeneration();
    } else {
      await this.handleStsGeneration();
    }
  }

  /**
   * Handle TTS generation
   * @private
   */
  async handleTtsGeneration() {
    const messages = i18n.getMessages();
    const language = i18n.getLanguage();

    // Get form values
    const voice = document.getElementById('audioSelect')?.value;
    const text = document.getElementById('textInput')?.value;
    const languageCode = document.getElementById('languageSelect')?.value;
    const speed = document.getElementById('speed')?.value;
    const model = document.getElementById('model')?.value || '';

    // Validate model status if not default
    if (model && model !== 'default') {
      const modelStatus = this.modelManager.getModelStatus(model);
      if (!modelStatus) {
        const message = language === 'zh'
          ? '该模型还没有启动，请启动后使用'
          : 'The model has not been launched yet, please launch it and use it';
        
        if (window.layer) {
          window.layer.alert(message, { title: false });
        }
        return;
      }
    }

    // UI elements
    const tipsElement = document.getElementById('tips');
    const startButton = document.getElementById('start_button');
    const downloadBtn = document.getElementById('downloadbtn');

    // Show processing message
    if (tipsElement) {
      tipsElement.classList.remove('d-none');
      tipsElement.textContent = messages.lang13;
    }

    if (startButton) {
      startButton.disabled = true;
    }

    if (downloadBtn) {
      downloadBtn.removeAttribute('src');
      downloadBtn.classList.add('d-none');
      downloadBtn.load();
    }

    // Generate TTS
    await this.ttsHandler.generate(
      { text, voice, language: languageCode, speed, model },
      (elapsedTime) => {
        // Progress callback
        if (tipsElement) {
          tipsElement.textContent = `${messages.lang13}: ${elapsedTime}秒`;
        }
      },
      (result) => {
        // Success callback
        if (startButton) {
          startButton.disabled = false;
        }

        if (downloadBtn && result.name) {
          downloadBtn.classList.remove('d-none');
          downloadBtn.src = '/static/ttslist/' + result.name;
        }

        if (tipsElement) {
          if (result.msg) {
            tipsElement.innerHTML = result.msg;
          } else {
            tipsElement.classList.add('d-none');
            tipsElement.textContent = '';
          }
        }
      },
      (error) => {
        // Error callback
        if (startButton) {
          startButton.disabled = false;
        }

        if (tipsElement) {
          tipsElement.textContent = 'Error: ' + error;
        }
      }
    );
  }

  /**
   * Handle STS generation
   * @private
   */
  async handleStsGeneration() {
    const messages = i18n.getMessages();
    const voice = document.getElementById('audioSelect2')?.value;

    // UI elements
    const tipsElement = document.getElementById('tips');
    const startButton = document.getElementById('start_button');
    const downloadBtn = document.getElementById('downloadbtn');

    // Show processing message
    if (tipsElement) {
      tipsElement.classList.remove('d-none');
      tipsElement.textContent = messages.lang13;
    }

    if (startButton) {
      startButton.disabled = true;
    }

    if (downloadBtn) {
      downloadBtn.removeAttribute('src');
      downloadBtn.classList.add('d-none');
      downloadBtn.load();
    }

    // Generate STS
    await this.stsHandler.generate(
      { voice },
      (elapsedTime) => {
        // Progress callback
        if (tipsElement) {
          tipsElement.textContent = `${messages.lang13}: ${elapsedTime}秒`;
        }
      },
      (result) => {
        // Success callback
        if (startButton) {
          startButton.disabled = false;
        }

        if (downloadBtn && result.name) {
          downloadBtn.classList.remove('d-none');
          downloadBtn.src = '/static/ttslist/' + result.name;
        }

        if (tipsElement) {
          if (result.msg) {
            tipsElement.innerHTML = result.msg;
          } else {
            tipsElement.classList.add('d-none');
            tipsElement.textContent = '';
          }
        }
      },
      (error) => {
        // Error callback
        if (startButton) {
          startButton.disabled = false;
        }

        if (tipsElement) {
          tipsElement.textContent = 'Error: ' + error;
        }
      }
    );
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.audioRecorder?.dispose();
    this.audioPlayer?.dispose();
    this.fileUpload?.dispose();
    this.modelManager?.dispose();
    this.ttsHandler?.dispose();
    this.stsHandler?.dispose();
  }
}

// Create global app instance
window.app = new WebSpeechApp();

// Export for module usage
export default WebSpeechApp;
