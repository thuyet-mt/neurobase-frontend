# 🧠 Neurobase Frontend - Architecture Documentation

A modern React-based frontend application for the Neurobase enterprise management system, designed to run within PyQt6 WebEngine for desktop applications.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Architecture](#architecture)
- [Components](#components)
- [Internationalization](#internationalization)
- [Theme System](#theme-system)
- [3D Cursor System](#3d-cursor-system)
- [Backend Integration](#backend-integration)
- [Troubleshooting](#troubleshooting)
- [Production Build](#production-build)
- [Contributing](#contributing)

## 🎯 Overview

Neurobase Frontend is a sophisticated React application that serves as the user interface for a comprehensive enterprise management system. It's specifically designed to integrate with Python backend applications through PyQt6 WebEngine, providing a seamless desktop experience.

### Key Characteristics:
- **Desktop-First Design**: Optimized for PyQt6 WebEngine integration
- **Multi-Language Support**: Built-in support for English, Vietnamese, and French
- **Dynamic Theming**: Three distinct themes (Light, Dark, Gold)
- **3D Interactive Cursor**: Custom 3D cursor with theme-based models
- **Responsive Layout**: Adapts to different screen sizes
- **Real-time Communication**: WebChannel integration with Python backend

## ✨ Features

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with golden accents
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Interactive Elements**: Hover effects, animations, and visual feedback
- **Accessibility**: High contrast support and reduced motion preferences

### 🌐 Internationalization
- **Multi-Language Support**: English, Vietnamese, French
- **Dynamic Language Switching**: Real-time language changes
- **Fallback System**: Graceful degradation when language files are unavailable
- **Localized Content**: All UI elements properly translated

### 🎭 Theme System
- **Three Themes**: Light, Dark, and Gold modes
- **Dynamic Switching**: Real-time theme changes
- **Persistent Settings**: Theme preferences saved in localStorage
- **Consistent Styling**: All components adapt to current theme

### 🎯 3D Cursor System
- **Custom 3D Models**: Theme-specific hand robot models
- **Interactive Animations**: Click and hover animations
- **Performance Optimized**: Efficient rendering with Three.js
- **Theme Integration**: Cursor appearance matches current theme

### 🔧 Backend Integration
- **WebChannel Communication**: Direct communication with Python backend
- **Slot-based Actions**: Call Python methods from React components
- **Error Handling**: Comprehensive error management
- **Mock Server**: Development server for testing without backend

## 🛠 Technology Stack

### Frontend Framework
- **React 19.1.0**: Latest React with modern features
- **Vite 7.0.4**: Fast build tool and development server
- **ESLint**: Code quality and consistency

### 3D Graphics
- **Three.js**: 3D graphics library for cursor system
- **GLTFLoader**: 3D model loading
- **WebGL**: Hardware-accelerated rendering

### Styling & UI
- **CSS Modules**: Scoped styling
- **Responsive Design**: Mobile-first approach
- **Custom Icons**: SVG-based icon system

### Development Tools
- **Concurrently**: Run multiple processes
- **Express**: Mock server for development
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
neurobase-frontend/
├── src/
│   ├── components/          # React UI components
│   │   ├── Neurobase.jsx   # Main application component
│   │   ├── Cursor3D.jsx    # 3D cursor system
│   │   ├── MenuButton.jsx  # Navigation menu
│   │   ├── ModeButton.jsx  # Theme switching
│   │   ├── ProgressBar.jsx # Progress tracking
│   │   └── ...             # Other UI components
│   ├── contexts/           # React Context providers
│   │   ├── LanguageContext.js    # Multi-language support
│   │   └── ThemeContext.js       # Theme management
│   ├── services/           # Business logic services
│   │   ├── WebChannelService.js  # Backend communication
│   │   └── ErrorBoundary.jsx     # Error handling
│   ├── assets/             # Static assets
│   │   ├── *.svg          # Icon files
│   │   ├── *.png          # Image files
│   │   └── *.glb          # 3D models
│   ├── constants/          # Configuration constants
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
├── public/                 # Public assets
├── mock-language-server.js # Development mock server
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Package manager (comes with Node.js)
- **Git**: Version control system

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd neurobase-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server

#### Option A: Standalone Development (Recommended for beginners)
```bash
npm run dev
```
This will start the application with built-in fallback data.

#### Option B: With Mock Server (For full development experience)
```bash
npm run dev:mock
```
This starts both the Vite dev server and a mock language server.

#### Option C: With Real Backend
```bash
# Terminal 1: Start Python backend
cd ../neuro-core
python neuro_core/ui/reception_module.py

# Terminal 2: Start frontend
npm run dev
```

### Step 4: Access the Application
Open your browser and navigate to:
- **Development**: http://localhost:5173
- **Mock Server**: http://localhost:3001 (health check)

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run dev:mock     # Start with mock server
npm run mock-server  # Start only mock server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Development Workflow

1. **Start Development Server**:
   ```bash
   npm run dev:mock
   ```

2. **Make Changes**: Edit files in the `src/` directory

3. **Hot Reload**: Changes automatically reflect in the browser

4. **Testing**: Use browser console to test features:
   ```javascript
   // Change language
   localStorage.setItem('language', 'vi');
   
   // Change theme
   localStorage.setItem('theme', 'dark');
   ```

## 🏗 Architecture

### Component Architecture
The application follows a hierarchical component structure:

```
App.jsx
├── ErrorBoundary
├── LanguageProvider
├── ThemeProvider
├── Cursor3D
├── NotificationSystem
└── Neurobase
    ├── Background
    ├── Logo
    ├── Navigation Buttons
    ├── Progress Bar
    ├── Mode Button
    └── Menu Button
```

### State Management
- **React Context**: For global state (language, theme)
- **Local State**: For component-specific state
- **localStorage**: For persistent preferences

### Communication Flow
```
React Component → WebChannel Service → Python Backend
                ↓
            Error Handling → User Notification
```

## 🧩 Components

### Core Components

#### Neurobase.jsx
The main application component that orchestrates the entire UI.

**Key Features:**
- Layout management
- Button event handling
- WebChannel integration
- Responsive design

#### Cursor3D.jsx
Custom 3D cursor system using Three.js.

**Features:**
- Theme-based 3D models
- Mouse tracking
- Click animations
- Performance optimization

#### LanguageContext.js
Manages multi-language support throughout the application.

**Capabilities:**
- Dynamic language loading
- Fallback mechanisms
- Real-time language switching
- Error handling

#### ThemeContext.js
Handles theme switching and styling.

**Features:**
- Three theme modes (light, dark, balance)
- Persistent theme storage
- Dynamic styling updates

### UI Components

#### MenuButton.jsx
Navigation menu with dropdown functionality.

#### ModeButton.jsx
Theme switching button with visual feedback.

#### ProgressBar.jsx
Interactive progress tracking with drag functionality.

#### NotificationSystem.jsx
User feedback system for actions and errors.

## 🌐 Internationalization

### Supported Languages
- **English (en)**: Default language
- **Vietnamese (vi)**: Tiếng Việt
- **French (fr)**: Français

### Language Files Structure
```json
{
  "neurobase_window": {
    "title": "Neurobase",
    "telephone": "Telephone",
    "archives": "Archives",
    // ... more translations
  }
}
```

### Changing Languages
```javascript
// Browser console
localStorage.setItem('language', 'vi'); // Vietnamese
localStorage.setItem('language', 'en'); // English
localStorage.setItem('language', 'fr'); // French
```

### Fallback System
When language files are unavailable:
1. App attempts to load requested language
2. Falls back to English if loading fails
3. Uses built-in English data as final fallback
4. Continues functioning normally

## 🎨 Theme System

### Available Themes

#### Light Theme
- **Background**: #E4DAC2 (Warm beige)
- **Text**: Dark colors for contrast
- **Accents**: Golden highlights

#### Dark Theme
- **Background**: #030303 (Deep black)
- **Text**: Light colors for contrast
- **Accents**: Subtle golden accents

#### Gold Theme
- **Background**: #615637 (Rich brown)
- **Text**: Gold contrast
- **Accents**: Prominent golden elements

### Theme Switching
```javascript
// Browser console
localStorage.setItem('theme', 'light');
localStorage.setItem('theme', 'dark');
localStorage.setItem('theme', 'balance');
```

### Theme Integration
- All components automatically adapt to theme changes
- 3D cursor models change based on theme
- Color schemes update in real-time
- Persistent theme preferences

## 🎯 3D Cursor System

### Overview
The application features a custom 3D cursor that replaces the default mouse cursor with interactive 3D models.

### Features
- **Theme-Based Models**: Different 3D models for each theme
- **Interactive Animations**: Click and hover effects
- **Performance Optimized**: Efficient rendering with Three.js
- **Responsive**: Adapts to different screen sizes

### Model Files
- `hand_robot_dark_v2.glb`: Dark theme cursor
- `hand_robot_gold_v2.glb`: Gold theme cursor
- `hand_robot_gold_v2.glb`: Light/Gold theme cursor

### Technical Implementation
```javascript
// Cursor follows mouse movement
const handleMouseMove = (e) => {
  setMousePosition({ x: e.clientX, y: e.clientY });
};

// Theme-based model loading
const getModelPath = (theme) => {
  switch (theme) {
    case 'dark': return '/neuro_core/config/models_3d/hand_robot_dark_v2.glb';
    case 'balance': return '/neuro_core/config/models_3d/hand_robot_gold_v2.glb';
    case 'light': return '/neuro_core/config/models_3d/hand_robot_gold_v2.glb';
  }
};
```

## 🔌 Backend Integration

### WebChannel Service
The application communicates with Python backend through Qt's WebChannel system.

#### Key Methods
```javascript
// Navigation
await webChannelService.goBack();
await webChannelService.navigateToHome();

// Feature Actions
await webChannelService.openArchives();
await webChannelService.openTelephone();
await webChannelService.openReunions();

// System Actions
await webChannelService.changeTheme('dark');
await webChannelService.updateProgress(75);
await webChannelService.shutdown();
```

#### Error Handling
```javascript
const callSlotWithNotification = async (slotMethod, successMessage, errorMessage) => {
  try {
    await slotMethod();
    showNotificationWithMessage(successMessage);
  } catch (error) {
    console.error('Slot call failed:', error);
    showNotificationWithMessage(errorMessage || 'Action failed');
  }
};
```

### Mock Server
For development without a real backend:

```javascript
// Mock server provides:
- Language files at /langs/{language}.json
- Health check at /health
- CORS support
- Fallback mechanisms
```

## 🐛 Troubleshooting

### Common Issues

#### 1. "Unexpected token '<'" Error
**Problem**: App receives HTML instead of JSON from server.

**Solution**:
```bash
# Use standalone development
npm run dev

# Or ensure mock server is running
npm run dev:mock
```

#### 2. CORS Errors
**Problem**: Cross-origin resource sharing issues.

**Solution**:
```bash
# Ensure mock server is running
npm run mock-server

# Check if port 3001 is available
curl http://localhost:3001/health
```

#### 3. 3D Models Not Loading
**Problem**: 3D cursor models fail to load.

**Solution**:
- Check if model files exist in `/neuro_core/config/models_3d/`
- Verify file permissions
- Check browser console for specific errors

#### 4. App Not Loading
**Problem**: Application fails to start.

**Solution**:
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Start development server
npm run dev
```

### Debug Mode
Enable detailed logging:
```javascript
// Browser console
localStorage.setItem('debug', 'true');
```

### Performance Issues
- **3D Cursor**: Reduce cursor size in Cursor3D component
- **Animations**: Disable animations for better performance
- **Memory**: Check for memory leaks in browser dev tools

## 📦 Production Build

### Building for Production
```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Build Output
```
dist/
├── index.html          # Main HTML file
├── assets/             # Optimized assets
│   ├── *.js           # Bundled JavaScript
│   ├── *.css          # Minified CSS
│   └── *.png          # Optimized images
```

### Deployment
1. **Copy dist/ folder** to your web server
2. **Configure server** to serve static files
3. **Set up routing** for single-page application
4. **Test thoroughly** in production environment

### Performance Optimization
- **Code Splitting**: Automatic with Vite
- **Asset Optimization**: Images and fonts optimized
- **Tree Shaking**: Unused code removed
- **Minification**: JavaScript and CSS minified

## 🤝 Contributing

### Development Guidelines

#### Code Style
- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

#### Component Structure
```javascript
// Component template
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2, children }) => {
  // State and effects
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-name">
      {children}
    </div>
  );
};

export default ComponentName;
```

#### Testing
- Test components in different themes
- Verify multi-language support
- Check responsive design
- Validate accessibility

### Pull Request Process
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions:
- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs through the issue tracker
- **Development**: Follow the troubleshooting guide above

---

**Note**: This application is designed to run within PyQt6 WebEngine and may have limited functionality when run in a standard web browser. For full functionality, integrate with the appropriate Python backend. 