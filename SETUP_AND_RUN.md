# 🚀 How to Run the Chatbot Locally

## Quick Start (30 seconds)

### Windows Users
1. Double-click **START_SERVER.bat**
2. Select option **[1] Start with Python**
3. Browser opens automatically to `http://localhost:8000`
4. Done! The chatbot is running 🎉

### Mac/Linux Users
1. Open Terminal in the chatbot-frontend folder
2. Run: `bash start_server.sh`
3. Select option **[1] Start with Python**
4. Browser opens automatically to `http://localhost:8000`
5. Done! The chatbot is running 🎉

---

## Setup Requirements

### Windows

#### Option 1: Python (Recommended)
```bash
# Download Python from https://www.python.org/downloads/
# Install and check:
python --version
# Then run:
START_SERVER.bat
```

#### Option 2: Node.js
```bash
# Download from https://nodejs.org/
# Install and check:
node --version
npm --version
# Then run:
START_SERVER.bat
# Select option [2]
```

### Mac

#### Option 1: Python (Built-in)
```bash
# Python usually comes with macOS
# Check:
python3 --version

# Run server:
bash start_server.sh
```

#### Option 2: Homebrew + Python
```bash
# Install Homebrew if needed:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python:
brew install python3

# Run server:
bash start_server.sh
```

### Linux

#### Ubuntu/Debian
```bash
# Install Python:
sudo apt-get update
sudo apt-get install python3

# Run server:
bash start_server.sh
```

#### Fedora
```bash
# Install Python:
sudo dnf install python3

# Run server:
bash start_server.sh
```

---

## Running the Server

### Method 1: Using Server Launchers (Easiest)

**Windows**: Double-click `START_SERVER.bat`  
**Mac/Linux**: Run `bash start_server.sh`

Then select:
- **Option 1** - Python HTTP Server (Recommended)
- **Option 2** - Node.js HTTP Server
- **Option 3** - Open in Browser Only

### Method 2: Manual Python Server

```bash
# Navigate to the chatbot-frontend folder
cd path/to/chatbot-frontend

# Start Python server
python -m http.server 8000

# Or Python 3:
python3 -m http.server 8000

# Server runs at: http://localhost:8000
```

### Method 3: Manual Node.js Server

```bash
# Install http-server globally (first time only)
npm install -g http-server

# Navigate to the chatbot-frontend folder
cd path/to/chatbot-frontend

# Start server on port 8080
http-server -p 8080

# Or with open browser:
http-server -p 8080 -o

# Server runs at: http://localhost:8080
```

### Method 4: Live Server (VS Code Extension)

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically

---

## Accessing the Chatbot

### Main Chatbot Interface
- **URL**: http://localhost:8000
- **File**: index.html
- Click the chat icon or refresh if it doesn't load

### Admin Dashboard
- **URL**: http://localhost:8000/admin.html
- **Access**: Click "📊 Admin Panel" in the sidebar
- Or go directly to admin.html

### Quick Links

```
Main Chat:    http://localhost:8000
Admin Panel:  http://localhost:8000/admin.html
API Config:   See API_INTEGRATION.md
```

---

## Testing the Chatbot

### 1. Chat Interface
- [x] Type a message: "Where is my order?"
- [x] Click quick action buttons
- [x] Upload an image for damage claims
- [x] Test escalation to human agent

### 2. Admin Dashboard
- [x] Upload a test dataset
- [x] View chat logs
- [x] Check analytics
- [x] Test settings

### 3. Features to Test
- [x] Message sending (Enter key)
- [x] Image upload (📷 button)
- [x] Sentiment analysis (Watch emotions change)
- [x] Escalation (High frustration triggers auto-escalate)
- [x] Responsive design (Resize browser window)
- [x] Mobile view (Open in mobile device or use DevTools)

---

## Troubleshooting

### "Python is not installed"
**Solution**: 
- Download from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH"
- Restart your computer

### "Port 8000 already in use"
**Solution**:
```bash
# Use different port:
python -m http.server 8001
# Access at: http://localhost:8001
```

### "Website won't load"
**Solution**:
1. Check browser console (F12)
2. Make sure all files are in the chatbot-frontend folder
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try a different port

### "Styles not loading"
**Solution**:
1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Check if styles.css is in the folder
3. Check browser console for 404 errors

### "Script errors in console"
**Solution**:
1. Check if all .js files are present
2. Make sure script.js and advanced.js are loaded
3. Look for 404 errors for missing files

---

## Development Tools

### Browser DevTools (F12)
- **Console**: See logs and errors
- **Network**: Check file loading
- **Elements**: Inspect HTML structure
- **Styles**: Debug CSS issues
- **Application**: View localStorage

### Chrome DevTools Features
- Device Emulation (test mobile)
- Network Throttling (test slow connection)
- Performance Profiling
- Accessibility Audit

### VS Code Extensions
- Live Server (auto-refresh)
- HTML Preview
- CSS Peek
- JavaScript Debugger

---

## Performance Testing

### Slow Network Simulation
```javascript
// In browser console:
// Simulate 3G speed
// DevTools > Network > Change to "Slow 3G"
```

### Mobile Testing
```
Chrome DevTools:
1. Press F12
2. Click device icon (top-left)
3. Select device type
4. Test responsive design
```

### Load Time Measurement
```javascript
// In browser console:
performance.timing.loadEventEnd - performance.timing.navigationStart
// Result in milliseconds
```

---

## File Structure Check

Verify all files are present:
```
chatbot-frontend/
├── index.html              ✓
├── admin.html              ✓
├── styles.css              ✓
├── admin-styles.css        ✓
├── script.js               ✓
├── admin-script.js         ✓
├── advanced.js             ✓ (NEW)
├── config.json             ✓
├── START_SERVER.bat        ✓ (Windows)
├── start_server.sh         ✓ (Mac/Linux)
└── README.md               ✓
```

If any file is missing, the server will work but some features may not function properly.

---

## Common Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Enter** | Send message |
| **Shift+Enter** | New line |
| **Ctrl+K** | Focus message input |
| **Ctrl+Enter** | Send (custom) |
| **Escape** | Close modal |
| **Tab** | Navigate elements |
| **F12** | Open DevTools |
| **Ctrl+R** | Refresh page |
| **Ctrl+Shift+R** | Hard refresh |

---

## Customization While Running

You can edit files while the server is running:

### 1. Edit config.json
```json
{
  "chatbot": {
    "name": "My Custom Bot"
  }
}
```
Reload browser to see changes.

### 2. Edit CSS (Live Reload with Live Server)
- Save `styles.css`
- Page auto-refreshes
- See changes immediately

### 3. Edit JavaScript
- Save `script.js`
- Reload browser (F5)
- Changes take effect

---

## Deployment Preparation

Before deploying to production:

1. **Test on Device**
   ```bash
   # Get your machine IP
   ipconfig getifaddr en0  # Mac
   ipconfig              # Windows
   
   # Access from phone at:
   http://[YOUR_IP]:8000
   ```

2. **Test on Different Browsers**
   - Chrome ✓
   - Firefox ✓
   - Safari ✓
   - Edge ✓

3. **Test on Different Devices**
   - Desktop ✓
   - Tablet ✓
   - Mobile ✓

4. **Check API Endpoints**
   - All endpoints working ✓
   - Error handling tested ✓
   - CORS configured ✓

---

## Server Options Explained

### Python HTTP Server
- ✅ Built-in to Python
- ✅ Zero configuration
- ✅ Good for development
- ❌ Single-threaded
- **Best for**: Quick testing and development

### Node.js HTTP Server
- ✅ Fast and efficient
- ✅ Good performance
- ✅ Extensible
- ❌ Requires Node.js
- **Best for**: Production-like environment

### Live Server (VS Code)
- ✅ Auto-reload on save
- ✅ Integrated with editor
- ✅ Perfect for development
- ❌ Only in VS Code
- **Best for**: Active development

---

## Advanced Configuration

### Change Server Port
```bash
# Python (port 9000)
python -m http.server 9000

# Node.js (port 3000)
http-server -p 3000
```

### Enable CORS
```bash
# Python with CORS headers
python3 -m http.server --bind 0.0.0.0 8000
```

### HTTPS for Testing
```bash
# Using Node.js with HTTPS
npm install -g http-server
http-server -p 8080 -S -C cert.pem -K key.pem
```

---

## Getting Help

### Check These First
1. Browser console (F12)
2. Network tab in DevTools
3. File paths in HTML (src, href)
4. README.md for features

### Common Issues & Solutions

**Issue**: Blank page  
**Solution**: Check browser console for errors

**Issue**: Styles not loading  
**Solution**: Verify styles.css path and check Network tab

**Issue**: Images not showing  
**Solution**: Check image file paths

**Issue**: Admin dashboard not working  
**Solution**: Check admin.html is in correct folder

---

## Next Steps

1. ✅ Run the server (this guide)
2. 🧪 Test all features
3. 🔧 Read DEVELOPER_GUIDE.md for customization
4. 🔌 Check API_INTEGRATION.md for backend setup
5. 🚀 Deploy to production

---

**Ready to run?**

- **Windows**: Double-click `START_SERVER.bat` → Select [1]
- **Mac/Linux**: Run `bash start_server.sh` → Select [1]
- **Browser opens automatically!**

Happy testing! 🎉
