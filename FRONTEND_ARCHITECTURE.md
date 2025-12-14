# WebSpeech V - Front-End Modernization

## Overview
This document describes the modernized front-end architecture implemented in Phase 1 of the WebSpeech V front-end modernization project.

## Architecture

### File Structure
```
static/
├── css/
│   ├── themes.css          # Color schemes and CSS variables
│   ├── main.css            # Core layout and typography
│   └── components.css      # Reusable component styles
├── js/
│   ├── app.js              # Main application entry point
│   ├── modules/            # Core functionality modules
│   │   ├── api-client.js       # API communication
│   │   ├── audio-recorder.js   # Audio recording
│   │   ├── audio-player.js     # Audio playback
│   │   ├── file-upload.js      # File upload handling
│   │   ├── model-manager.js    # Model management
│   │   ├── tts-handler.js      # Text-to-Speech
│   │   └── sts-handler.js      # Speech-to-Speech
│   └── utils/              # Utility functions
│       ├── config.js           # Configuration constants
│       ├── i18n.js             # Internationalization
│       └── validators.js       # Input validation
└── images/
    └── logo_macmilling.png

templates/
└── index.html              # Main template (streamlined)
```

## Module Descriptions

### Core Modules

#### `app.js`
Main application coordinator that initializes all modules and manages the application lifecycle.

**Key Responsibilities:**
- Initialize all modules
- Set up event listeners
- Coordinate between modules
- Handle application state

**Usage:**
```javascript
import app from '/static/js/app.js';

// Initialize with server configuration
app.init({
  language: 'en',
  version: '1.0.0',
  textModel: true,
  voiceModel: true
});
```

#### `api-client.js`
Centralized API communication using the Fetch API.

**Key Features:**
- RESTful API calls
- File upload support
- Error handling
- Response parsing

**Example:**
```javascript
import apiClient from './modules/api-client.js';

// Upload audio file
const result = await apiClient.uploadAudio(file);

// Generate TTS
const ttsResult = await apiClient.generateTTS({
  text: 'Hello world',
  voice: 'voice.wav',
  language: 'en',
  speed: 1.0
});
```

#### `audio-recorder.js`
Audio recording functionality using the MediaRecorder API.

**Key Features:**
- Microphone access
- Recording with timer
- Auto-stop on max duration
- Blob generation

**Example:**
```javascript
import AudioRecorder from './modules/audio-recorder.js';

const recorder = new AudioRecorder({
  maxRecordingTime: 20 // seconds
});

// Set up callbacks
recorder.onTimeUpdate = (time) => {
  console.log(`Recording: ${time}s`);
};

// Start recording
await recorder.startRecording();

// Stop and get blob
const blob = await recorder.stopRecording();
```

#### `audio-player.js`
Audio playback and control.

**Key Features:**
- Play/pause/stop controls
- Seek functionality
- Volume control
- Time formatting

**Example:**
```javascript
import AudioPlayer from './modules/audio-player.js';

const player = new AudioPlayer(audioElement);

// Load and play
await player.load('/path/to/audio.wav');
await player.play();

// Control playback
player.pause();
player.seek(30); // Seek to 30 seconds
player.setVolume(0.8); // Set volume to 80%
```

#### `file-upload.js`
File upload handling with drag-and-drop support.

**Key Features:**
- Drag and drop interface
- Click to upload
- File validation
- Progress callbacks

**Example:**
```javascript
import FileUpload from './modules/file-upload.js';

const uploader = new FileUpload(dropZoneElement, {
  allowedTypes: ['.wav', '.mp3', '.flac'],
  maxSize: 100 * 1024 * 1024, // 100MB
  onUploadComplete: (fileName) => {
    console.log('Uploaded:', fileName);
  }
});
```

#### `model-manager.js`
Model status management and control.

**Key Features:**
- Load model status
- Start/stop models
- Status updates
- Event delegation

**Example:**
```javascript
import ModelManager from './modules/model-manager.js';

const manager = new ModelManager();
manager.init(modelListElement, modelSelectElement);

// Check if model is running
if (manager.isModelRunning('custom-model')) {
  // Proceed with model
}
```

#### `tts-handler.js` & `sts-handler.js`
Handlers for TTS and STS operations.

**Key Features:**
- Input validation
- Progress tracking
- Error handling
- Cancellation support

**Example:**
```javascript
import TtsHandler from './modules/tts-handler.js';

const tts = new TtsHandler();

await tts.generate(
  { text, voice, language, speed, model },
  (elapsedTime) => console.log(`Processing: ${elapsedTime}s`),
  (result) => console.log('Success:', result),
  (error) => console.error('Error:', error)
);
```

### Utility Modules

#### `config.js`
Centralized configuration constants.

**Example:**
```javascript
import CONFIG from './utils/config.js';

// Use configuration values
if (speed < CONFIG.SPEED.MIN || speed > CONFIG.SPEED.MAX) {
  speed = CONFIG.SPEED.DEFAULT;
}
```

#### `i18n.js`
Internationalization utilities for bilingual support (English/Chinese).

**Key Features:**
- Language switching
- UI text updates
- Message translation
- Placeholder updates

**Example:**
```javascript
import i18n from './utils/i18n.js';

// Initialize with language
i18n.init('zh');

// Get messages in current language
const messages = i18n.getMessages();
console.log(messages.lang1); // Translated text

// Switch language
i18n.switchLanguage('en');
```

#### `validators.js`
Input validation functions.

**Key Features:**
- Text validation
- Voice validation
- Language validation
- Speed validation
- File validation

**Example:**
```javascript
import { Validators } from './utils/validators.js';

// Validate text input
const textValidation = Validators.validateText(userInput);
if (!textValidation.valid) {
  alert(textValidation.error);
}

// Validate speed
const speedValidation = Validators.validateSpeed(speed);
if (!speedValidation.valid) {
  speed = speedValidation.value; // Use default
}
```

## CSS Architecture

### `themes.css`
Defines the MacMilling branding color scheme using CSS Custom Properties.

**Color Palette:**
- **Primary:** Deep blues (#0A2463 to #D4E4F7)
- **Accent:** Coral/red (#F76C5E to #FCCAC3)
- **Neutral:** Grays (#1A1D29 to #F5F6FA)
- **Semantic:** Success, warning, error, info colors

**Usage:**
```css
.my-element {
  background-color: var(--primary-700);
  color: var(--neutral-50);
  border-color: var(--accent-600);
}
```

### `main.css`
Core layout, typography, and base styles.

**Key Features:**
- Responsive layout system
- Typography scale
- Form element styles
- Utility classes
- Mobile-first responsive design

### `components.css`
Reusable component styles.

**Components:**
- Buttons (variants: primary, secondary, success, danger, etc.)
- Cards
- Alerts
- Forms
- Modal/drop areas
- Loading spinners
- Badges

## Migration from Old Code

### Key Changes

1. **jQuery → Fetch API**
   ```javascript
   // Old
   $.post('/tts', data, callback);
   
   // New
   await apiClient.post('/tts', data);
   ```

2. **Inline JavaScript → Modules**
   ```html
   <!-- Old -->
   <script>
     function start(el) { ... }
   </script>
   
   <!-- New -->
   <script type="module">
     import app from '/static/js/app.js';
     app.init(config);
   </script>
   ```

3. **Inline Styles → CSS Classes**
   ```html
   <!-- Old -->
   <div style="color: red; padding: 10px;">
   
   <!-- New -->
   <div class="text-danger p-2">
   ```

4. **Global Functions → Class Methods**
   ```javascript
   // Old
   function uploadFromLocal(inputEl) { ... }
   
   // New
   app.handleLocalFileUpload(event)
   ```

## Browser Support

- **Chrome/Edge:** Last 2 versions
- **Firefox:** Last 2 versions
- **Safari:** Last 2 versions

**Required Features:**
- ES6 Modules
- Fetch API
- MediaRecorder API
- CSS Custom Properties
- CSS Grid/Flexbox

## Development Guidelines

### Adding New Features

1. **Create a new module** in `static/js/modules/` if it's a major feature
2. **Use utility functions** from `static/js/utils/` for common tasks
3. **Follow the existing patterns** for consistency
4. **Use event delegation** instead of inline event handlers
5. **Validate inputs** using the Validators class
6. **Handle errors** gracefully with try-catch blocks

### Code Style

- **ES6+ syntax:** Use modern JavaScript features
- **Const/let:** No var declarations
- **Arrow functions:** For callbacks and short functions
- **Template literals:** For string interpolation
- **Async/await:** For asynchronous operations
- **JSDoc comments:** Document public methods

### Testing

Before committing changes:

1. **Syntax check:** Run `node --check` on all JS files
2. **Manual testing:** Test all affected functionality
3. **Cross-browser:** Test in Chrome, Firefox, Safari
4. **Mobile responsive:** Test on mobile devices
5. **Accessibility:** Ensure keyboard navigation works

## Backward Compatibility

All Flask backend endpoints remain unchanged:
- `/` - Main page
- `/upload` - Audio upload
- `/tts` - Text-to-speech
- `/sts` - Speech-to-speech
- `/init` - Voice list
- `/isstart` - Model status
- `/onoroff` - Model toggle
- `/stsstatus` - STS status
- `/checkupdate` - Version check

## Future Enhancements

Potential improvements for Phase 2:
1. **WebSocket support** for real-time progress updates
2. **Service Worker** for offline functionality
3. **Audio visualization** with waveform display
4. **Batch processing** for multiple files
5. **History/favorites** management
6. **Advanced audio controls** (effects, filters)
7. **Keyboard shortcuts** for common actions
8. **Dark mode** theme support

## Troubleshooting

### Module Import Errors

If you see "Failed to resolve module specifier" errors:
- Ensure all import paths are absolute (start with `/`)
- Check that all files exist at the specified paths
- Verify the HTML uses `type="module"` for the main script

### Style Issues

If styles don't load:
- Check CSS file paths in index.html
- Ensure CSS files are in the correct directory
- Clear browser cache

### API Errors

If API calls fail:
- Check browser console for errors
- Verify Flask backend is running
- Check network tab for failed requests
- Ensure CORS is configured if needed

## Support

For issues or questions:
- GitHub Issues: https://github.com/MacMilling/webspeech-v/issues
- Documentation: See `vibe/CONCEPTS.md` for additional details
