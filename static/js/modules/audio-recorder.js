// WebSpeech V - Audio Recorder
// Audio recording functionality using MediaRecorder API

export class AudioRecorder {
  constructor(options = {}) {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.recordingTime = 0;
    this.timerInterval = null;
    this.maxRecordingTime = options.maxRecordingTime || 20; // Maximum recording time in seconds
    this.onTimeUpdate = null;
    this.onRecordingComplete = null;
  }

  /**
   * Get recorded audio blob
   * @returns {Blob|null} Recorded audio blob or null if no recording
   */
  getRecordedBlob() {
    if (this.audioChunks.length === 0) {
      return null;
    }
    return new Blob(this.audioChunks, { type: 'audio/wav' });
  }

  /**
   * Check if browser supports audio recording
   * @returns {boolean} True if supported
   */
  isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }

  /**
   * Start recording audio
   * @param {object} options - Recording options
   * @returns {Promise<void>}
   */
  async startRecording(options = {}) {
    if (!this.isSupported()) {
      throw new Error('Audio recording is not supported in this browser');
    }

    try {
      // Request microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });

      // Reset state
      this.audioChunks = [];
      this.recordingTime = 0;

      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(this.stream);

      // Handle data available event
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      // Handle stop event
      this.mediaRecorder.onstop = () => {
        this.stopTimer();
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        
        if (this.onRecordingComplete) {
          this.onRecordingComplete(audioBlob);
        }
      };

      // Start recording
      this.mediaRecorder.start();

      // Start timer
      this.startTimer();

      return Promise.resolve();
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  /**
   * Stop recording
   * @returns {Promise<Blob>} Recorded audio blob
   */
  stopRecording() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        reject(new Error('No active recording to stop'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        this.stopTimer();
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        
        // Stop all tracks
        if (this.stream) {
          this.stream.getTracks().forEach(track => track.stop());
          this.stream = null;
        }

        if (this.onRecordingComplete) {
          this.onRecordingComplete(audioBlob);
        }

        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Check if currently recording
   * @returns {boolean} True if recording
   */
  isRecording() {
    return this.mediaRecorder && this.mediaRecorder.state === 'recording';
  }

  /**
   * Get current recording time
   * @returns {number} Recording time in seconds
   */
  getRecordingTime() {
    return this.recordingTime;
  }

  /**
   * Start recording timer
   * @private
   */
  startTimer() {
    this.stopTimer(); // Clear any existing timer
    
    this.timerInterval = setInterval(() => {
      this.recordingTime += 1;
      
      if (this.onTimeUpdate) {
        this.onTimeUpdate(this.recordingTime);
      }

      // Auto-stop if max time reached
      if (this.recordingTime >= this.maxRecordingTime) {
        this.stopRecording().catch(err => {
          console.error('Auto-stop failed:', err);
        });
      }
    }, 1000);
  }

  /**
   * Stop recording timer
   * @private
   */
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /**
   * Cancel recording without saving
   */
  cancel() {
    this.stopTimer();
    
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    this.audioChunks = [];
    this.recordingTime = 0;
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.cancel();
    this.onTimeUpdate = null;
    this.onRecordingComplete = null;
  }
}

export default AudioRecorder;
