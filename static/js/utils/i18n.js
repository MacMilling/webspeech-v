// WebSpeech V - Internationalization Utilities
// Handles bilingual support (English/Chinese)

class I18n {
  constructor(defaultLanguage = 'en') {
    this.currentLanguage = defaultLanguage;
    this.translations = {};
  }

  /**
   * Initialize language from server-provided value
   * @param {string} language - Language code ('zh' or 'en')
   */
  init(language) {
    this.currentLanguage = language === 'zh' ? 'zh' : 'en';
    this.updateUI();
  }

  /**
   * Switch to a different language
   * @param {string} language - Language code to switch to
   */
  switchLanguage(language) {
    this.currentLanguage = language === 'zh' ? 'zh' : 'en';
    this.updateUI();
  }

  /**
   * Get the current language code
   * @returns {string} Current language code
   */
  getLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get translation type for data attributes
   * @returns {string} 'cn' for Chinese, 'en' for English
   */
  getType() {
    return this.currentLanguage === 'zh' ? 'cn' : 'en';
  }

  /**
   * Get translated text from language lists
   * @param {string} key - Translation key
   * @param {object} langlist - Language list object
   * @returns {string} Translated text
   */
  t(key, langlist) {
    return langlist[key] || key;
  }

  /**
   * Update all UI elements with data-en and data-cn attributes
   */
  updateUI() {
    const type = this.getType();
    
    // Update text content
    document.querySelectorAll(`[data-${type}]`).forEach(el => {
      const text = el.getAttribute(`data-${type}`);
      if (text) {
        el.textContent = text;
      }
    });

    // Update placeholders
    document.querySelectorAll('[placeholder-en], [placeholder-cn]').forEach(el => {
      const placeholder = el.getAttribute(`placeholder-${type}`);
      if (placeholder) {
        el.setAttribute('placeholder', placeholder);
      }
    });
  }

  /**
   * Get language-specific messages
   * @returns {object} Object containing translated messages
   */
  getMessages() {
    if (this.currentLanguage === 'zh') {
      return {
        lang1: '必须选择要试听的声音',
        lang2: '录制中',
        lang3: '停止录制后,可使用此按钮',
        lang4: '已录制',
        lang5: '开始录制',
        lang6: '停止录制后,可使用此按钮',
        lang7: '请选择要上传的文件',
        lang8: '只可导入srt格式字幕文件',
        lang9: '请选择一个srt文件',
        lang10: '必须选择要使用的声音',
        lang11: '必须输入要合成的文字',
        lang12: '必须上传要转换的声音wav/mp3文件',
        lang13: '开始合成，用时可能较久，耐心等待',
        lang14: '[文字->声音]或[声音->声音]线程还没有启动完毕，请等待',
        lang15: '已转为wav格式: ',
        lang16: '速度必须在0.1--2.0之间，1为正常速度，2为两倍速',
        lang19: '运行中',
        lang20: '已停止'
      };
    } else {
      return {
        lang1: 'You must select the voice for audition',
        lang2: 'Recording',
        lang3: 'Use this button after stopping recording',
        lang4: 'Recorded',
        lang5: 'Start recording',
        lang6: 'Use this button after stopping recording',
        lang7: 'Please select a file to upload',
        lang8: 'Only SRT subtitle files can be imported',
        lang9: 'Please select an SRT file',
        lang10: 'You must select a voice to use',
        lang11: 'You must enter the text to be synthesized',
        lang12: 'You must upload the wav/mp3 audio file for conversion',
        lang13: 'The synthesis might take a while, please wait patiently',
        lang14: '[text->speech] or [speech->speech] thread not started, hold on',
        lang15: 'Converted to wav format: ',
        lang16: 'speed between 0.1 and 2.0, 1 is normal speed',
        lang19: 'Running',
        lang20: 'Stopped'
      };
    }
  }
}

// Export singleton instance
export default new I18n();
