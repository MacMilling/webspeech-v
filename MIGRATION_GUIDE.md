# Front-End Modernization - Migration Guide

This guide helps developers understand the changes made in Phase 1 of the WebSpeech V front-end modernization.

## What Changed?

### Before (Old Architecture)
- **Single monolithic file:** All JavaScript code (~810 lines) was inline in `index.html`
- **jQuery dependency:** Used jQuery for DOM manipulation and AJAX
- **Inline styles:** CSS was mixed in `<style>` tags within HTML
- **Global functions:** All functions were in global scope
- **No separation of concerns:** HTML, CSS, and JS all mixed together

### After (New Architecture)
- **Modular ES6 JavaScript:** Code split into 10+ focused modules
- **Vanilla JavaScript:** Removed jQuery dependency, using native Fetch API
- **Organized CSS:** Three separate CSS files with clear responsibilities
- **ES6 modules:** Proper imports/exports, no global pollution
- **Clear separation:** HTML for structure, CSS for styling, JS for behavior

## File Mapping

### JavaScript Migration

| Old Location | New Location | Description |
|-------------|--------------|-------------|
| `index.html` inline | `static/js/app.js` | Main application logic |
| `index.html` inline | `static/js/modules/api-client.js` | API calls (replaced jQuery AJAX) |
| `index.html` inline | `static/js/modules/audio-recorder.js` | Recording functionality |
| `index.html` inline | `static/js/modules/audio-player.js` | Audio playback |
| `index.html` inline | `static/js/modules/file-upload.js` | File upload with drag-drop |
| `index.html` inline | `static/js/modules/model-manager.js` | Model management |
| `index.html` inline | `static/js/modules/tts-handler.js` | TTS generation |
| `index.html` inline | `static/js/modules/sts-handler.js` | STS conversion |
| `index.html` inline | `static/js/utils/i18n.js` | Language switching |
| `index.html` inline | `static/js/utils/validators.js` | Input validation |
| N/A | `static/js/utils/config.js` | Configuration constants |

### CSS Migration

| Old Location | New Location | Description |
|-------------|--------------|-------------|
| `index.html` `<style>` | `static/css/themes.css` | MacMilling branding colors |
| `index.html` `<style>` | `static/css/main.css` | Layout and typography |
| `index.html` `<style>` | `static/css/components.css` | Reusable components |

## Function Migration Guide

### Old → New Function Mappings

```javascript
// Old: Global function
function init() { ... }

// New: Method on app instance
window.app.loadVoiceList()
```

```javascript
// Old: Global function with jQuery
function start(el) {
  $.post('/tts', data, function(res) { ... });
}

// New: Method with Fetch API
await window.app.handleStartGeneration()
// Internally uses: await ttsHandler.generate(params, ...)
```

```javascript
// Old: Global recording functions
function startRecording() { ... }
function stopRecording() { ... }

// New: AudioRecorder class
const recorder = new AudioRecorder();
await recorder.startRecording();
await recorder.stopRecording();
```

```javascript
// Old: jQuery AJAX
$.get('/init', function(res) { ... });

// New: API Client
const voices = await apiClient.getVoiceList();
```

```javascript
// Old: Language switching with jQuery
function switch_language() {
  $(`[data-${type}]`).each(...);
}

// New: I18n utility
i18n.init('zh');
i18n.switchLanguage('en');
```

## API Compatibility

**No changes to Flask backend APIs.** All endpoints work exactly as before:

- `GET /` - Renders index.html with template variables
- `POST /upload` - Uploads audio files
- `POST /tts` - Text-to-speech generation
- `POST /sts` - Speech-to-speech conversion  
- `GET /init` - Get voice list
- `GET /isstart` - Get model status
- `POST /onoroff` - Toggle model on/off
- `GET /stsstatus` - Get STS thread status
- `GET /checkupdate` - Check for updates

## Testing Your Migration

### 1. Check File Structure

Verify all new files exist:
```bash
ls -la static/css/
ls -la static/js/modules/
ls -la static/js/utils/
```

### 2. Syntax Check

Run syntax check on all JavaScript files:
```bash
for file in static/js/app.js static/js/modules/*.js static/js/utils/*.js; do
  node --check "$file" && echo "✓ $file" || echo "✗ $file FAILED"
done
```

### 3. Manual Testing Checklist

- [ ] **Page loads** without JavaScript errors (check browser console)
- [ ] **Language switching** works (if you have the toggle)
- [ ] **TTS mode:**
  - [ ] Can select voice
  - [ ] Can enter text
  - [ ] Can preview voice
  - [ ] Can record audio
  - [ ] Can upload audio file
  - [ ] Can generate speech
  - [ ] Can play generated audio
  - [ ] Can download generated audio
- [ ] **STS mode:**
  - [ ] Can select target voice
  - [ ] Can drag-drop audio file
  - [ ] Can click to upload audio file
  - [ ] Can convert speech
  - [ ] Can play converted audio
  - [ ] Can download converted audio
- [ ] **Model management:**
  - [ ] Can see model list
  - [ ] Can start/stop models
  - [ ] Model status updates correctly
- [ ] **Responsive design:**
  - [ ] Desktop view works (>1024px)
  - [ ] Tablet view works (768-1024px)
  - [ ] Mobile view works (<768px)

### 4. Cross-Browser Testing

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if on Mac)

## Common Issues and Solutions

### Issue: "Failed to resolve module specifier"

**Cause:** Relative import paths in JavaScript modules.

**Solution:** All import paths must be absolute:
```javascript
// Wrong
import api from './api-client.js';

// Correct
import api from '/static/js/modules/api-client.js';
```

### Issue: Styles not applying

**Cause:** CSS files not linked correctly or browser cache.

**Solution:**
1. Check that CSS files are linked in `index.html`
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser DevTools Network tab for 404 errors

### Issue: "app is not defined"

**Cause:** JavaScript module hasn't loaded or initialized.

**Solution:**
1. Check browser console for module loading errors
2. Ensure `<script type="module">` is used
3. Verify `app.init()` is called after DOM loads

### Issue: Functionality doesn't work

**Cause:** Event listeners not attached or wrong element IDs.

**Solution:**
1. Check browser console for errors
2. Verify element IDs match in HTML and JavaScript
3. Check that app.init() completed successfully

### Issue: Recording doesn't work

**Cause:** Browser permissions or HTTPS requirement.

**Solution:**
1. Microphone access requires user permission
2. MediaRecorder API requires HTTPS (except localhost)
3. Check browser console for permission errors

## Rolling Back (If Needed)

If you need to revert to the old version:

```bash
# Restore old index.html
cp templates/index_old.html templates/index.html

# Or use git
git checkout HEAD~1 templates/index.html

# Restart the Flask app
```

## Development Workflow

### Making Changes

1. **Edit the appropriate module:**
   - UI changes → `templates/index.html` and `static/css/`
   - Feature logic → `static/js/modules/`
   - Shared utilities → `static/js/utils/`

2. **Test your changes:**
   ```bash
   # Check syntax
   node --check static/js/modules/your-module.js
   
   # Run the app
   python app.py
   ```

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

### Adding New Features

Example: Adding a new audio effect

1. **Create module:** `static/js/modules/audio-effects.js`
2. **Export class:**
   ```javascript
   export class AudioEffects {
     applyReverb(audioBlob) { ... }
   }
   ```
3. **Import in app.js:**
   ```javascript
   import AudioEffects from './modules/audio-effects.js';
   ```
4. **Initialize and use:**
   ```javascript
   this.audioEffects = new AudioEffects();
   ```

## Getting Help

If you encounter issues:

1. **Check documentation:**
   - `docs/FRONTEND_ARCHITECTURE.md` - Detailed architecture guide
   - `vibe/CONCEPTS.md` - Original design concepts

2. **Check browser console:**
   - Press F12 to open DevTools
   - Look for errors in Console tab
   - Check Network tab for failed requests

3. **Ask for help:**
   - GitHub Issues: https://github.com/MacMilling/webspeech-v/issues
   - Include: Error messages, browser version, steps to reproduce

## Next Steps (Phase 2+)

Future enhancements planned:
- WebSocket for real-time progress
- Audio waveform visualization
- Batch processing
- Service Worker for offline support
- Advanced audio effects
- History/favorites management

See `vibe/TASKS.md` for the complete roadmap.
