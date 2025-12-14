# WebSpeech V - UI Wireframes and Design Mockups

## Overview

This document contains ASCII-based wireframes and design mockups for the WebSpeech V user interface. These wireframes serve as a visual guide for implementing the concepts outlined in CONCEPTS.md.

## 1. Main Dashboard (Text-to-Speech Mode)

### Desktop View (1920x1080)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════════════════════════════╗  │
│  ║  [MacMilling Logo]          WebSpeech V                    [🌙] [⚙️] [👤]        ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════════════╝  │
├─────────────┬───────────────────────────────────────────────────────────────────────────┤
│             │                                                                           │
│  SIDEBAR    │                     TEXT TO SPEECH                                       │
│             │                                                                           │
│ ┌─────────┐ │  ┌──────────────────────────────────────────────────────────────────┐   │
│ │ ▶ TTS   │ │  │  Enter or import your text                                       │   │
│ │   STS   │ │  │                                                                  │   │
│ └─────────┘ │  │  ┌────────────────────────────────────────────────────────────┐ │   │
│             │  │  │ Type your text here or import from SRT file...             │ │   │
│ MODELS      │  │  │                                                            │ │   │
│ ┌─────────┐ │  │  │                                                            │ │   │
│ │ Default │ │  │  │                                                            │ │   │
│ │ ● XTTS  │ │  │  │                                                            │ │   │
│ │ ○ Model2│ │  │  └────────────────────────────────────────────────────────────┘ │   │
│ └─────────┘ │  │  [📄 Import SRT] [📋 Paste]              Characters: 0 / 5000  │   │
│             │  └──────────────────────────────────────────────────────────────────┘   │
│ HISTORY     │                                                                           │
│ ┌─────────┐ │  ┌───────────────────────┬───────────────────────┬──────────────────┐   │
│ │ Recent  │ │  │  VOICE PROFILE        │  SETTINGS             │  CONTROLS        │   │
│ │ Files   │ │  │                       │                       │                  │   │
│ │ •••     │ │  │  ┌─────────────────┐  │  Language:            │  Speed: 1.0x     │   │
│ └─────────┘ │  │  │  [👤 Avatar]    │  │  [🌐 English ▼]      │  ├────●────┤    │   │
│             │  │  │                 │  │                       │                  │   │
│ FAVORITES   │  │  │  Voice Name:    │  │  Pitch:               │  Pitch: 0        │   │
│ ┌─────────┐ │  │  │  "Sarah"        │  │  [♪ Normal ▼]        │  ├────●────┤    │   │
│ │ ⭐️ List │ │  │  │                 │  │                       │                  │   │
│ └─────────┘ │  │  │  Tags: Female,  │  │  Emotion:             │  ┌─────────────┐│   │
│             │  │  │  English, Clear │  │  [😊 Neutral ▼]      │  │   ▶ START   ││   │
│ SETTINGS    │  │  │                 │  │                       │  └─────────────┘│   │
│ ┌─────────┐ │  │  │  [▶ Preview]    │  │                       │                  │   │
│ │ ⚙️ Prefs│ │  │  │  [⭐️ Favorite] │  │  [🎚️ Advanced]       │  [💾 Save]      │   │
│ └─────────┘ │  │  └─────────────────┘  │                       │  [📤 Share]     │   │
│             │  │                       │                       │                  │   │
│             │  │  [📁 Browse Library]  │  [🎤 Record Custom]   │  [🔄 Batch]     │   │
│             │  └───────────────────────┴───────────────────────┴──────────────────┘   │
│             │                                                                           │
│             │  ┌──────────────────────────────────────────────────────────────────┐   │
│             │  │  🔊 GENERATED AUDIO                                              │   │
│             │  │                                                                  │   │
│             │  │  ▶ ████████████████░░░░░░░░░░░░░░░░░░░░░  0:15 / 0:30          │   │
│             │  │                                                                  │   │
│             │  │  [Waveform Visualization]                                       │   │
│             │  │  ▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁          │   │
│             │  │                                                                  │   │
│             │  │  [⏮️] [⏯️] [⏭️] [🔄] [⬇️ Download] [✂️ Edit] [👂 Compare]       │   │
│             │  └──────────────────────────────────────────────────────────────────┘   │
│             │                                                                           │
├─────────────┴───────────────────────────────────────────────────────────────────────────┤
│  © 2025 MacMilling Computer-Software Entertainment Technologies | v0.907 | Help | Docs │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## 2. Speech-to-Speech Mode

### Desktop View

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════════════════════════════╗  │
│  ║  [MacMilling Logo]          WebSpeech V                    [🌙] [⚙️] [👤]        ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════════════╝  │
├─────────────┬───────────────────────────────────────────────────────────────────────────┤
│             │                                                                           │
│  SIDEBAR    │                   SPEECH TO SPEECH                                       │
│             │                                                                           │
│ ┌─────────┐ │  ┌──────────────────────────────────────────────────────────────────┐   │
│ │   TTS   │ │  │  SOURCE AUDIO                                                    │   │
│ │ ▶ STS   │ │  │                                                                  │   │
│ └─────────┘ │  │  ┌────────────────────────────────────────────────────────────┐ │   │
│             │  │  │                                                            │ │   │
│ MODELS      │  │  │            🎵                                              │ │   │
│ ┌─────────┐ │  │  │                                                            │ │   │
│ │ Default │ │  │  │      Drag & drop audio file here                          │ │   │
│ │ ● XTTS  │ │  │  │      or click to browse                                   │ │   │
│ │ ○ Model2│ │  │  │                                                            │ │   │
│ └─────────┘ │  │  │      Supported: WAV, MP3, FLAC                            │ │   │
│             │  │  │                                                            │ │   │
│ HISTORY     │  │  └────────────────────────────────────────────────────────────┘ │   │
│ ┌─────────┐ │  │  [📁 Browse] [🎤 Record]                                     │   │
│ │ Recent  │ │  └──────────────────────────────────────────────────────────────────┘   │
│ │ Jobs    │ │                                                                           │
│ │ •••     │ │  ┌──────────────────────────────────────────────────────────────────┐   │
│ └─────────┘ │  │  SOURCE PREVIEW                                                  │   │
│             │  │  ▶ ████████████████████████████████  2:34                       │   │
│ QUEUE       │  │  ▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁          │   │
│ ┌─────────┐ │  └──────────────────────────────────────────────────────────────────┘   │
│ │ Current │ │                                                                           │
│ │ Jobs    │ │  ┌────────────────────────┬─────────────────────────────────────────┐   │
│ │ (0)     │ │  │  TARGET VOICE          │  PROCESSING OPTIONS                     │   │
│ └─────────┘ │  │                        │                                         │   │
│             │  │  ┌──────────────────┐  │  ☑ Preserve emotion                     │   │
│             │  │  │  [👤]            │  │  ☑ Remove background noise              │   │
│             │  │  │                  │  │  ☐ Enhance clarity                      │   │
│             │  │  │  Voice: "John"   │  │  ☐ Match original speed                 │   │
│             │  │  │  Male, English   │  │                                         │   │
│             │  │  │                  │  │  Quality: ●●●●○ High                    │   │
│             │  │  │  [Change Voice]  │  │  Processing: [GPU ▼]                    │   │
│             │  │  └──────────────────┘  │                                         │   │
│             │  │                        │  ┌──────────────────────────────────┐   │   │
│             │  │  [📁 Browse Voices]    │  │     ▶ CONVERT SPEECH             │   │
│             │  │  [🎤 Record Custom]    │  └──────────────────────────────────┘   │   │
│             │  └────────────────────────┴─────────────────────────────────────────┘   │
│             │                                                                           │
│             │  ┌──────────────────────────────────────────────────────────────────┐   │
│             │  │  🔊 CONVERTED AUDIO                                              │   │
│             │  │                                                                  │   │
│             │  │  ▶ ████████████████████████████████  2:34                       │   │
│             │  │  ▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁          │   │
│             │  │                                                                  │   │
│             │  │  [⏯️] [⬇️ Download] [👂 Compare A/B] [🔄 Retry] [⚙️ Adjust]    │   │
│             │  └──────────────────────────────────────────────────────────────────┘   │
├─────────────┴───────────────────────────────────────────────────────────────────────────┤
│  © 2025 MacMilling Computer-Software Entertainment Technologies | v0.907 | Help | Docs │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## 3. Model Management Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════════════════════════════╗  │
│  ║  [MacMilling Logo]          WebSpeech V                    [🌙] [⚙️] [👤]        ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════════════╝  │
├─────────────┬───────────────────────────────────────────────────────────────────────────┤
│             │                                                                           │
│  SIDEBAR    │                     MODEL MANAGEMENT                                     │
│             │                                                                           │
│ ┌─────────┐ │  System Resources:  CPU: ███░░ 60%  |  GPU: ████░ 80%  |  RAM: ██░░░ 40%│
│ │   TTS   │ │                                                                           │
│ │   STS   │ │  ┌──────────────────────┬──────────────────────┬──────────────────────┐ │
│ └─────────┘ │  │  MODEL: Default      │  MODEL: XTTS         │  MODEL: CustomVoice  │ │
│             │  │  ┌────────────────┐  │  ┌────────────────┐  │  ┌────────────────┐  │ │
│ ▶ MODELS    │  │  │   [Default]    │  │  │   [XTTS]       │  │  │   [Custom]     │  │ │
│ ┌─────────┐ │  │  │                │  │  │                │  │  │                │  │ │
│ │ Active  │ │  │  │   Status:      │  │  │   Status:      │  │  │   Status:      │  │ │
│ │ Models  │ │  │  │   ● Running    │  │  │   ● Running    │  │  │   ○ Stopped    │  │ │
│ │ (2/4)   │ │  │  │                │  │  │                │  │  │                │  │ │
│ └─────────┘ │  │  │   Languages: 1 │  │  │   Languages: 16│  │  │   Languages: 1 │  │ │
│             │  │  │   Quality: Med │  │  │   Quality: High│  │  │   Quality: High│  │ │
│ SETTINGS    │  │  │   Speed: Fast  │  │  │   Speed: Med   │  │  │   Speed: Slow  │  │ │
│ ┌─────────┐ │  │  │                │  │  │                │  │  │                │  │ │
│ │ System  │ │  │  │   GPU: N/A     │  │  │   GPU: 45%     │  │  │   GPU: 0%      │  │ │
│ │ Config  │ │  │  │   RAM: 512MB   │  │  │   RAM: 2.1GB   │  │  │   RAM: 0MB     │  │ │
│ └─────────┘ │  │  │                │  │  │                │  │  │                │  │ │
│             │  │  │   Jobs: 12     │  │  │   Jobs: 156    │  │  │   Jobs: 0      │  │ │
│             │  │  │   Uptime: 2d   │  │  │   Uptime: 2d   │  │  │   Uptime: 0m   │  │ │
│             │  │  │                │  │  │                │  │  │                │  │ │
│             │  │  │  [⏸️ Stop]     │  │  │  [⏸️ Stop]     │  │  │  [▶️ Start]    │  │ │
│             │  │  │  [⚙️ Config]   │  │  │  [⚙️ Config]   │  │  │  [⚙️ Config]   │  │ │
│             │  │  └────────────────┘  │  └────────────────┘  │  └────────────────┘  │ │
│             │  └──────────────────────┴──────────────────────┴──────────────────────┘ │
│             │                                                                           │
│             │  ┌──────────────────────────────────────────────────────────────────┐   │
│             │  │  PERFORMANCE METRICS (Last 24 hours)                             │   │
│             │  │                                                                  │   │
│             │  │  Processing Speed (jobs/hour)          Resource Usage           │   │
│             │  │  ┌────────────────────────────┐        ┌────────────────────┐  │   │
│             │  │  │ 25│             ██          │        │ GPU ████░ 80%      │  │   │
│             │  │  │ 20│          ██ ██          │        │ CPU ███░░ 60%      │  │   │
│             │  │  │ 15│       ██ ██ ██ ██       │        │ RAM ██░░░ 40%      │  │   │
│             │  │  │ 10│    ██ ██ ██ ██ ██       │        │ Disk ██░░░ 35%     │  │   │
│             │  │  │  5│ ██ ██ ██ ██ ██ ██ ██    │        └────────────────────┘  │   │
│             │  │  └────────────────────────────┘                                │   │
│             │  │    6a  9a  12p  3p  6p  9p  12a                                │   │
│             │  └──────────────────────────────────────────────────────────────────┘   │
│             │                                                                           │
│             │  ┌──────────────────────────────────────────────────────────────────┐   │
│             │  │  ACTIONS                                                         │   │
│             │  │                                                                  │   │
│             │  │  [➕ Add New Model]  [🔄 Refresh Status]  [📊 Detailed Stats]   │   │
│             │  │  [⚡ Optimize Performance]  [🔧 Advanced Settings]              │   │
│             │  └──────────────────────────────────────────────────────────────────┘   │
├─────────────┴───────────────────────────────────────────────────────────────────────────┤
│  © 2025 MacMilling Computer-Software Entertainment Technologies | v0.907 | Help | Docs │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## 4. Mobile View (iPhone 13 - 390x844)

### Main Screen (TTS Mode)

```
┌──────────────────────────┐
│  ☰  WebSpeech V   [🌙][👤] │
├──────────────────────────┤
│                          │
│  [MacMilling Logo]       │
│                          │
│  ┌────────────────────┐  │
│  │ Mode:              │  │
│  │ ● TTS  ○ STS       │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ Enter Text:        │  │
│  │                    │  │
│  │ Type here or       │  │
│  │ import SRT file    │  │
│  │                    │  │
│  │                    │  │
│  │                    │  │
│  └────────────────────┘  │
│  [📄 Import] [📋 Paste] │
│                          │
│  Voice Profile:          │
│  ┌────────────────────┐  │
│  │ [👤] Sarah         │  │
│  │ Female, English    │  │
│  │ [Change] [Preview] │  │
│  └────────────────────┘  │
│                          │
│  Language: [English ▼]   │
│                          │
│  Speed: 1.0x             │
│  ├──────●──────┤         │
│                          │
│  Pitch: 0                │
│  ├──────●──────┤         │
│                          │
│  ┌────────────────────┐  │
│  │    ▶ GENERATE      │  │
│  └────────────────────┘  │
│                          │
│  🔊 Audio Output:        │
│  ┌────────────────────┐  │
│  │ ▶ ████░░░░  0:15   │  │
│  │ ▁▂▃█▇▅▃▂▁▂▃█▇▅▃▂▁ │  │
│  │ [⏯️] [⬇️] [🔄]     │  │
│  └────────────────────┘  │
│                          │
│ [🏠] [📝] [⚙️] [📊] [👤]  │
└──────────────────────────┘
```

## 5. Voice Library Modal

```
┌──────────────────────────────────────────────────────────────────┐
│  Voice Library                                      [✕]          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [🔍 Search voices...]                    [Filter ▼] [Sort ▼]   │
│                                                                  │
│  Categories: [All] [Male] [Female] [English] [Favorites]        │
│                                                                  │
│  ┌────────────┬────────────┬────────────┬────────────┐          │
│  │  [👤]      │  [👤]      │  [👤]      │  [👤]      │          │
│  │            │            │            │            │          │
│  │  Sarah     │  John      │  Emma      │  Michael   │          │
│  │  Female    │  Male      │  Female    │  Male      │          │
│  │  English   │  English   │  British   │  American  │          │
│  │  ⭐️⭐️⭐️⭐️⭐️  │  ⭐️⭐️⭐️⭐️   │  ⭐️⭐️⭐️⭐️⭐️  │  ⭐️⭐️⭐️⭐️   │          │
│  │            │            │            │            │          │
│  │  [▶] [⭐️] │  [▶] [⭐️] │  [▶] [⭐️] │  [▶] [⭐️] │          │
│  │  [Select]  │  [Select]  │  [Select]  │  [Select]  │          │
│  └────────────┴────────────┴────────────┴────────────┘          │
│                                                                  │
│  ┌────────────┬────────────┬────────────┬────────────┐          │
│  │  [👤]      │  [👤]      │  [👤]      │  [+]       │          │
│  │  Maria     │  Chen      │  Raj       │            │          │
│  │  Spanish   │  Chinese   │  Indian    │  Upload    │          │
│  │  ⭐️⭐️⭐️⭐️   │  ⭐️⭐️⭐️⭐️⭐️  │  ⭐️⭐️⭐️⭐️   │  Custom    │          │
│  │  [▶] [⭐️] │  [▶] [⭐️] │  [▶] [⭐️] │  Voice     │          │
│  │  [Select]  │  [Select]  │  [Select]  │            │          │
│  └────────────┴────────────┴────────────┴────────────┘          │
│                                                                  │
│  Showing 8 of 156 voices                    [< 1 2 3 ... 20 >]  │
│                                                                  │
│  [🎤 Record New Voice]              [Close]                     │
└──────────────────────────────────────────────────────────────────┘
```

## 6. Recording Interface

```
┌──────────────────────────────────────────────────────────────────┐
│  Record Custom Voice                                [✕]          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Instructions:                                                   │
│  • Speak clearly in a quiet environment                          │
│  • Record for 30-120 seconds for best results                   │
│  • Avoid background noise                                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │                    🎤                                      │ │
│  │                                                            │ │
│  │              Recording Time: 00:15                         │ │
│  │                                                            │ │
│  │         ▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁▂▃▅▆█▇▅▃▂▁                  │ │
│  │                                                            │ │
│  │              Quality: ●●●●● Excellent                      │ │
│  │              Noise Level: ●○○○○ Very Low                   │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   ● START    │  │   ■ STOP     │  │   ▶ PREVIEW  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  Voice Name: [________________________]                          │
│                                                                  │
│  Tags: [________________________]                                │
│  Example: "male, english, deep, professional"                   │
│                                                                  │
│               [Cancel]           [Save & Use]                   │
└──────────────────────────────────────────────────────────────────┘
```

## 7. Settings Panel

```
┌──────────────────────────────────────────────────────────────────┐
│  Settings                                           [✕]          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─ APPEARANCE ───────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Theme:  ○ Light  ● Dark  ○ Auto                          │ │
│  │                                                            │ │
│  │  Language: [English ▼]                                     │ │
│  │                                                            │ │
│  │  Text Size: [Medium ▼]                                     │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─ AUDIO ───────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Output Device: [System Default ▼]                        │ │
│  │                                                            │ │
│  │  Default Quality: [High ▼]                                │ │
│  │                                                            │ │
│  │  Auto-play results: ☑                                     │ │
│  │                                                            │ │
│  │  Save history: ☑  Keep for: [30 days ▼]                  │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─ PERFORMANCE ─────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Processing Device: ● GPU  ○ CPU                          │ │
│  │                                                            │ │
│  │  Max concurrent jobs: [2 ▼]                               │ │
│  │                                                            │ │
│  │  Enable caching: ☑                                        │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌─ ACCESSIBILITY ───────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  High contrast mode: ☐                                    │ │
│  │                                                            │ │
│  │  Reduced motion: ☐                                        │ │
│  │                                                            │ │
│  │  Keyboard shortcuts: ☑                                    │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│               [Reset to Defaults]           [Save]              │
└──────────────────────────────────────────────────────────────────┘
```

## 8. Processing Queue View

```
┌──────────────────────────────────────────────────────────────────┐
│  Processing Queue                    [⏸️ Pause All] [✕ Clear]    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─ IN PROGRESS ─────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │  Job #1234 - Text to Speech                              │  │
│  │  Voice: Sarah | Language: English | Text: "Hello..."      │  │
│  │  ████████████████░░░░░░░░  75% complete                   │  │
│  │  Est. remaining: 12 seconds                               │  │
│  │  [⏸️ Pause] [✕ Cancel]                                    │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ QUEUED ──────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │  Job #1235 - Speech to Speech                            │  │
│  │  Source: audio_file.mp3 | Target Voice: John             │  │
│  │  Status: Waiting... (Position: 1 in queue)               │  │
│  │  [⏫ Priority] [✕ Remove]                                 │  │
│  │                                                            │  │
│  │  ───────────────────────────────────────────────────────  │  │
│  │                                                            │  │
│  │  Job #1236 - Text to Speech (Batch: 3 items)             │  │
│  │  Voice: Multiple | Language: English                      │  │
│  │  Status: Waiting... (Position: 2 in queue)               │  │
│  │  [⏫ Priority] [✕ Remove]                                 │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─ COMPLETED (Last 5) ──────────────────────────────────────┐  │
│  │                                                            │  │
│  │  ✓ Job #1233 - TTS - "Hello world" - 2 min ago           │  │
│  │    [▶ Play] [⬇️ Download] [🔄 Reprocess]                  │  │
│  │                                                            │  │
│  │  ✓ Job #1232 - STS - audio.mp3 → voice_output.wav        │  │
│  │    [▶ Play] [⬇️ Download] [🔄 Reprocess]                  │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│                                          [View Full History]     │
└──────────────────────────────────────────────────────────────────┘
```

## Design Notes

### Color Scheme
- Primary: Deep blue (#0A2463) - Professional, trustworthy
- Accent: Coral red (#F76C5E) - Action, emphasis
- Success: Green (#34C759) - Positive feedback
- Warning: Orange (#FF9500) - Caution
- Error: Red (#FF3B30) - Errors, critical actions
- Neutral grays: For text and backgrounds

### Typography
- Headings: 24px / 20px / 16px (H1/H2/H3)
- Body: 14px regular, 16px for important content
- Small text: 12px for metadata, timestamps
- Monospace: For technical info, file names

### Spacing
- Base unit: 8px
- Common spacing: 8px, 16px, 24px, 32px, 48px
- Padding: Consistent 16px for cards, 24px for modals
- Margins: 16px between sections, 8px between elements

### Accessibility
- All interactive elements minimum 44x44px touch target
- Color contrast ratio ≥ 4.5:1 for text
- Focus indicators: 2px outline with primary color
- ARIA labels on all icons and buttons
- Keyboard navigation throughout

### Responsive Breakpoints
- Mobile: < 768px (stack vertically, hide sidebar)
- Tablet: 768px - 1024px (collapsible sidebar)
- Desktop: > 1024px (full layout with sidebar)

---

These wireframes provide a visual foundation for implementing the concepts described in CONCEPTS.md. They should be refined with actual high-fidelity mockups and user testing before final implementation.
