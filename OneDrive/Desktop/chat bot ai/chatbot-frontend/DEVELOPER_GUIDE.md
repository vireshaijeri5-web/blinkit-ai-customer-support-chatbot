# 🚀 Developer Quick Start Guide

## Getting Started in 5 Minutes

### 1. Open in Browser
```bash
# Simply open index.html in your web browser
# Or use a local server:
python -m http.server 8000
# Then navigate to http://localhost:8000
```

### 2. Test the Chatbot
- Type a message like "Where is my order?"
- Try clicking quick action buttons
- Upload an image for damage claims
- Escalate to a human agent

### 3. Access Admin Dashboard
- Click "📊 Admin Panel" button in sidebar
- Or open `admin.html` directly
- Try uploading a dataset
- Check analytics and chat logs

## 📁 File Structure & Responsibilities

```
chatbot-frontend/
│
├── index.html           # Main chatbot UI
│   ├── Sidebar with context
│   ├── Chat message area
│   ├── Input controls
│   └── Modals (escalation, refund)
│
├── admin.html           # Admin dashboard
│   ├── Dataset management
│   ├── Knowledge base testing
│   ├── Chat logs viewer
│   ├── Settings panel
│   └── Analytics dashboard
│
├── styles.css           # Main styling (1000+ lines)
│   ├── Color scheme & variables
│   ├── Layout (sidebar, chat, modals)
│   ├── Components (buttons, inputs, tables)
│   └── Responsive design
│
├── admin-styles.css     # Admin styling (700+ lines)
│   ├── Admin layout
│   ├── Forms & inputs
│   ├── Tables & data displays
│   └── Dashboard components
│
├── script.js            # Chat functionality (450+ lines)
│   ├── Message handling
│   ├── Sentiment analysis
│   ├── Image processing
│   ├── Escalation logic
│   └── UI interactions
│
├── admin-script.js      # Admin functionality (250+ lines)
│   ├── Tab switching
│   ├── Dataset uploads
│   ├── Form handling
│   └── Data visualization
│
├── config.json          # Configuration & settings
│   ├── Bot configuration
│   ├── Support categories
│   ├── Escalation rules
│   └── UI theme settings
│
├── README.md            # Documentation
├── API_INTEGRATION.md   # Backend integration guide
└── DEVELOPER_GUIDE.md   # This file
```

## 🎯 Key Functions Overview

### Chat Functions (script.js)

```javascript
// Main chat entry point
sendMessage(quickMsg = null)
  → Captures user input
  → Adds to message display
  → Triggers bot response

generateBotResponse(userMessage)
  → Analyzes sentiment
  → Categorizes message
  → Returns contextual response

categorizeMessage(message)
  → Matches keywords against 5 categories
  → Returns category name
  → Used for routing responses

analyzeSentiment(message)
  → Counts frustration/positive words
  → Updates sentiment indicator
  → Triggers escalation if needed

processRefund()
  → Shows refund modal
  → Generates refund ID
  → Updates bot message

escalateToHuman()
  → Creates chat summary
  → Shows escalation modal
  → Prepares for agent handoff
```

### Admin Functions (admin-script.js)

```javascript
// Tab management
switchTab(tabName)
  → Shows/hides tab content
  → Updates active nav state

handleUpload(event)
  → Validates form data
  → Creates table row
  → Shows success modal

testQuery()
  → Searches knowledge base
  → Returns mock results
  → Displays relevance scores

saveSettings()
  → Persists configuration
  → Shows confirmation

logout()
  → Confirms logout
  → Redirects to chat
```

## 🔧 Customization Examples

### Add New Support Category

```javascript
// 1. Add to botResponses in script.js
const botResponses = {
    'new-category': {
        keywords: ['keyword1', 'keyword2', 'keyword3'],
        responses: [
            'Response 1',
            'Response 2',
            'Response 3'
        ]
    }
};

// 2. Add to supportCategories in config.json
{
  "id": "new-category",
  "name": "Category Name",
  "icon": "🎯",
  "keywords": ["keyword1", "keyword2"]
}

// 3. Add quick action button to index.html
<button class="quick-btn" onclick="sendMessage('category query')">
  🎯 Category Name
</button>
```

### Change Color Theme

```css
/* Update in styles.css */
:root {
    --primary: #FFD60A;         /* Main color */
    --primary-dark: #FFC300;    /* Hover state */
    --secondary: #0066FF;       /* Links/accents */
    --success: #2ecc71;         /* Success state */
    --danger: #e74c3c;          /* Error state */
    --bg-dark: #0F1419;         /* Background */
    /* ... etc */
}
```

### Modify Welcome Message

```html
<!-- In index.html -->
<div class="message bot-message">
    <div class="message-avatar">🤖</div>
    <div class="message-content">
        <p>Your custom welcome message here!</p>
    </div>
</div>
```

## 🧪 Testing Features

### Test Sentiment Analysis

```javascript
// In browser console:
// Try these messages to see sentiment change
sendMessage("Thanks so much! Everything is perfect!");  // Positive
sendMessage("Where is my order?");                      // Neutral
sendMessage("This is terrible! I'm very angry!");       // Frustrated
```

### Test Escalation

```javascript
// Messages that trigger escalation:
sendMessage("I need help urgently! This is ridiculous!");
// Or click escalate button directly
escalateToHuman();
```

### Test Image Upload

```javascript
// Drag & drop an image onto the chat input area
// Or click the camera button and select an image
// Then type: "Item arrived damaged"
// This triggers refund processing
```

### Test Admin Features

```javascript
// Go to admin.html
// Click Dataset Uploads tab
// Try uploading a test file
// Fill form and submit to see success modal
```

## 🐛 Debugging Tips

### Browser Console Commands

```javascript
// View chat history
console.log(chatHistory);

// Check user sentiment
console.log(userSentiment);

// View uploaded images
console.log(uploadedImages);

// Check current context
console.log(conversationContext);

// Test a response
generateBotResponse("test message");
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Messages not appearing | Check if `chatMessages` element exists |
| Modal not closing | Use `console.log(document.querySelector('.modal'))` to verify |
| Images not uploading | Check file format and browser console for errors |
| Sentiment not updating | Verify words exist in frustration/positive arrays |
| Admin dashboard blank | Check if active class is set on tab |

## 📊 Data Structures

### Chat Message Object
```javascript
{
    sender: 'user' | 'bot',
    text: 'message content',
    images: ['base64_string', ...],
    timestamp: Date object
}
```

### User Context Object
```javascript
{
    activeOrder: '#ORD-12345',
    userName: 'John Doe',
    memberTier: 'Gold',
    cartItems: ['item1 x qty', 'item2 x qty']
}
```

### Response Category Object
```javascript
{
    id: 'category_name',
    keywords: ['keyword1', 'keyword2'],
    responses: ['response1', 'response2']
}
```

## 🎨 CSS Classes Reference

### Main Layout
- `.container` - Root flex container
- `.sidebar` - Left sidebar with context
- `.chat-container` - Main chat area
- `.chat-messages` - Messages display area
- `.chat-input-area` - Input controls

### Message Components
- `.message` - Single message wrapper
- `.message-avatar` - User/bot icon
- `.message-content` - Message text
- `.bot-message` - Bot message styling
- `.user-message` - User message styling

### Modal Components
- `.modal` - Modal overlay
- `.modal.show` - Visible modal
- `.modal-content` - Modal inner content
- `.modal-buttons` - Button group

### Admin Components
- `.admin-container` - Admin layout root
- `.admin-sidebar` - Admin navigation
- `.tab-content` - Tab panel
- `.datasets-table` - Data table
- `.chart-card` - Analytics card

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (limited support - needs polyfills)

## ⚡ Performance Optimization

### Current Optimizations
1. **Lazy Loading**: Images load only when needed
2. **Message Virtualization**: Old messages removed from DOM
3. **CSS Variables**: Reduced file size
4. **Minimal Dependencies**: No external libraries required
5. **Event Delegation**: Single listeners for multiple elements

### Future Optimizations
1. Service Workers for offline mode
2. Message compression
3. IndexedDB for chat history
4. Progressive loading of datasets
5. WebWorkers for sentiment analysis

## 🔐 Security Considerations

```javascript
// Always sanitize user input
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;  // Prevents XSS
    return div.innerHTML;
}

// Used in: addMessage()
// Never use innerHTML with unsanitized user input
```

## 📱 Responsive Design Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) {
    .sidebar { width: 320px; }
}

/* Tablet */
@media (max-width: 1024px) {
    .sidebar { width: 280px; }
}

/* Mobile */
@media (max-width: 768px) {
    .container { flex-direction: column; }
    .sidebar { border-bottom: 1px solid border; }
}
```

## 🚀 Deployment Steps

1. **Build**:
   ```bash
   # No build step needed - it's vanilla HTML/CSS/JS
   ```

2. **Test**:
   ```bash
   # Use local server
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Deploy**:
   ```bash
   # Copy all files to web server
   # Configure API_BASE_URL in script.js
   # Set up SSL certificate
   # Configure CORS headers
   ```

4. **Verify**:
   - [ ] Chatbot loads without errors
   - [ ] All features work
   - [ ] Responsive on mobile
   - [ ] Admin dashboard accessible
   - [ ] API integration working

## 📚 Resources

- **Configuration**: See `config.json` for all settings
- **API Docs**: See `API_INTEGRATION.md` for backend setup
- **User Docs**: See `README.md` for features
- **HTML Structure**: See `index.html` and `admin.html`

## 🆘 Getting Help

### Check These First
1. Browser console for errors
2. Network tab for API calls
3. Element inspector for DOM issues
4. Application tab for stored data

### Debug Logs
```javascript
// Enable detailed logging in script.js
const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log(...args);
}
```

## 💡 Pro Tips

1. **Use DevTools**: Open F12 to debug in real-time
2. **Test Offline**: Browser dev tools can simulate offline
3. **Mobile Testing**: Use device emulation in DevTools
4. **Network Throttling**: Simulate slow connections
5. **Console Experiments**: Test code before adding it
6. **Git Version Control**: Track all changes
7. **Comment Your Code**: Explain non-obvious logic

---

**Version**: 1.0.0  
**Last Updated**: June 15, 2024  
**Questions?** Refer to the code comments or README.md
