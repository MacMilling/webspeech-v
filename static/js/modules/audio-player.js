// WebSpeech V - Audio Player
// Audio playback and control functionality

export class AudioPlayer {
  constructor(audioElement) {
    this.audioElement = audioElement || document.createElement('audio');
    this.currentSource = null;
    
    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Set up audio element event listeners
   * @private
   */
  setupEventListeners() {
    this.audioElement.addEventListener('ended', () => {
      this.onEnded && this.onEnded();
    });

    this.audioElement.addEventListener('error', (e) => {
      this.onError && this.onError(e);
      console.error('Audio playback error:', e);
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      this.onLoaded && this.onLoaded();
    });

    this.audioElement.addEventListener('timeupdate', () => {
      this.onTimeUpdate && this.onTimeUpdate(this.getCurrentTime(), this.getDuration());
    });
  }

  /**
   * Load an audio file
   * @param {string} url - URL of audio file
   * @returns {Promise<void>}
   */
  load(url) {
    return new Promise((resolve, reject) => {
      this.currentSource = url;
      this.audioElement.src = url;

      this.audioElement.addEventListener('loadeddata', () => {
        resolve();
      }, { once: true });

      this.audioElement.addEventListener('error', (e) => {
        reject(e);
      }, { once: true });

      this.audioElement.load();
    });
  }

  /**
   * Play audio
   * @returns {Promise<void>}
   */
  async play() {
    try {
      await this.audioElement.play();
    } catch (error) {
      console.error('Playback failed:', error);
      throw error;
    }
  }

  /**
   * Pause audio
   */
  pause() {
    this.audioElement.pause();
  }

  /**
   * Stop audio (pause and reset to beginning)
   */
  stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  /**
   * Toggle play/pause
   * @returns {Promise<void>}
   */
  async togglePlayPause() {
    if (this.isPlaying()) {
      this.pause();
    } else {
      await this.play();
    }
  }

  /**
   * Check if audio is currently playing
   * @returns {boolean} True if playing
   */
  isPlaying() {
    return !this.audioElement.paused && !this.audioElement.ended && this.audioElement.currentTime > 0;
  }

  /**
   * Seek to specific time
   * @param {number} time - Time in seconds
   */
  seek(time) {
    this.audioElement.currentTime = time;
  }

  /**
   * Get current playback time
   * @returns {number} Current time in seconds
   */
  getCurrentTime() {
    return this.audioElement.currentTime;
  }

  /**
   * Get total duration
   * @returns {number} Duration in seconds
   */
  getDuration() {
    return this.audioElement.duration || 0;
  }

  /**
   * Set volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setVolume(volume) {
    this.audioElement.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get current volume
   * @returns {number} Volume level (0.0 to 1.0)
   */
  getVolume() {
    return this.audioElement.volume;
  }

  /**
   * Mute audio
   */
  mute() {
    this.audioElement.muted = true;
  }

  /**
   * Unmute audio
   */
  unmute() {
    this.audioElement.muted = false;
  }

  /**
   * Toggle mute
   */
  toggleMute() {
    this.audioElement.muted = !this.audioElement.muted;
  }

  /**
   * Check if audio is muted
   * @returns {boolean} True if muted
   */
  isMuted() {
    return this.audioElement.muted;
  }

  /**
   * Get the audio element
   * @returns {HTMLAudioElement} The audio element
   */
  getElement() {
    return this.audioElement;
  }

  /**
   * Clear the audio source
   */
  clear() {
    this.stop();
    this.audioElement.removeAttribute('src');
    this.audioElement.load();
    this.currentSource = null;
  }

  /**
   * Show audio controls
   */
  showControls() {
    this.audioElement.controls = true;
  }

  /**
   * Hide audio controls
   */
  hideControls() {
    this.audioElement.controls = false;
  }

  /**
   * Format time in MM:SS format
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  static formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) {
      return '00:00';
    }
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Clean up resources
   */
  dispose() {
    this.clear();
    this.onEnded = null;
    this.onError = null;
    this.onLoaded = null;
    this.onTimeUpdate = null;
  }
}

export default AudioPlayer;
