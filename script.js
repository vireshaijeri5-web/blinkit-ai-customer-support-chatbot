// ============ CHATBOT STATE ============
let chatHistory = [];
let uploadedImages = [];
let userSentiment = 'positive';
let conversationContext = {
    activeOrder: '#ORD-12345',
    userName: 'John Doe',
    memberTier: 'Gold',
    cartItems: ['Fresh Milk x2', 'Bread x1']
};

// Bot responses database (in production, connect to backend)
const botResponses = {
    'order': {
        keywords: ['where', 'order', 'track', 'delivery', 'status'],
        responses: [
            'Your order #ORD-12345 is on its way! 📍 Delivery partner is 25 minutes away. You can track in real-time on the map.',
            'I can see you have 1 active order. Is there anything specific about it you\'d like to know?',
            'Your recent orders are: ORD-12340 (Delivered), ORD-12339 (Delivered), ORD-12338 (Cancelled). Which one would you like details on?'
        ]
    },
    'return': {
        keywords: ['return', 'refund', 'damaged', 'broken', 'expired', 'wrong'],
        responses: [
            'I\'ll help you with a return or refund! 🔄 Can you tell me which order has the issue?',
            'Our return policy allows returns within 24 hours of delivery. For damage claims, we offer instant refunds or replacements.',
            'I can process a refund for you right away! For items over ₹500, please provide an image proof.'
        ]
    },
    'product': {
        keywords: ['available', 'stock', 'product', 'substitute', 'alternative', 'out of stock'],
        responses: [
            '🛍️ Let me check availability for you. What product are you looking for?',
            'I found similar alternatives available! Would you like me to suggest some?',
            'This item is currently out of stock, but I can suggest 2 similar products that are available now.'
        ]
    },
    'membership': {
        keywords: ['membership', 'benefit', 'blinkit', 'cash', 'member', 'subscription', 'fee', 'pricing', 'surge'],
        responses: [
            '💳 Great news! As a Gold Member, you get: Extra cashback, Priority delivery, and No surge pricing!',
            'You\'re on a Gold membership! Enjoy ₹200 Blinkit Cash monthly and 5% cashback on all orders.',
            'Let me explain our membership tiers: Basic (Free), Gold (₹99/month), and Platinum (₹199/month). Which would you like details on?'
        ]
    },
    'damage': {
        keywords: ['damage', 'image', 'photo', 'picture', 'expired', 'broken', 'defective'],
        responses: [
            '📸 I can help with damage claims! Please upload an image and tell me what happened.',
            'Once you upload the image, I\'ll process your claim immediately. We approve 99% of damage claims within 5 minutes.',
            'Got it! The image has been received. Based on our damage policy, I\'m processing an instant refund for you.'
        ]
    },
    'general': {
        keywords: [],
        responses: [
            'I\'m here to help! Could you provide more details about your issue?',
            'Thanks for reaching out! How can I assist you better?',
            'I understand. Let me help you resolve this quickly!'
        ]
    }
};

// ============ MESSAGE HANDLING ============
function handleInputKey(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function sendMessage(quickMsg = null) {
    const input = document.getElementById('messageInput');
    const message = quickMsg || input.value.trim();
    
    if (!message && uploadedImages.length === 0) return;

    // Add user message to chat
    addMessage(message, 'user', uploadedImages.length > 0 ? uploadedImages : null);
    
    // Clear input and images
    input.value = '';
    uploadedImages = [];
    clearImagePreview();

    // Simulate bot thinking
    setTimeout(() => {
        generateBotResponse(message);
    }, 500);
}

function addMessage(text, sender, images = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = sender === 'user' ? '👤' : '🤖';
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    let contentHTML = `
        <div class="message-avatar">${avatar}</div>
        <div>
            <div class="message-content">
                ${text ? `<p>${escapeHtml(text)}</p>` : ''}
                ${images && images.length > 0 ? images.map(img => `<img src="${img}" class="message-image" alt="uploaded">`).join('') : ''}
            </div>
            <span class="timestamp">${timestamp}</span>
        </div>
    `;

    messageDiv.innerHTML = contentHTML;
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store in history
    chatHistory.push({
        sender,
        text,
        images,
        timestamp: new Date()
    });
}

function generateBotResponse(userMessage) {
    // Analyze sentiment
    analyzeSentiment(userMessage);

    // Categorize intent
    const category = categorizeMessage(userMessage);
    
    // Get appropriate response
    const responses = botResponses[category].responses;
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Simulate processing
    addTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        addMessage(response, 'bot');

        // Handle special cases
        if (category === 'damage' && uploadedImages.length > 0) {
            processRefund();
        }

        // Check for escalation
        if (shouldEscalate(userMessage, category)) {
            scheduleEscalationSuggestion();
        }
    }, 1500);
}

function categorizeMessage(message) {
    const lower = message.toLowerCase();

    for (const [category, data] of Object.entries(botResponses)) {
        if (category === 'general') continue;
        for (const keyword of data.keywords) {
            if (lower.includes(keyword)) {
                return category;
            }
        }
    }

    return 'general';
}

function analyzeSentiment(message) {
    const frustrationWords = ['angry', 'upset', 'disappointed', 'terrible', 'horrible', 'worst', 'help', 'urgent', '!!!'];
    const positiveWords = ['thanks', 'thank you', 'appreciate', 'happy', 'great', 'awesome', 'love'];

    let frustrationScore = 0;
    let positiveScore = 0;

    const lower = message.toLowerCase();
    frustrationWords.forEach(word => {
        if (lower.includes(word)) frustrationScore++;
    });
    positiveWords.forEach(word => {
        if (lower.includes(word)) positiveScore++;
    });

    if (frustrationScore > positiveScore && frustrationScore > 1) {
        userSentiment = 'frustrated';
    } else if (positiveScore > frustrationScore && positiveScore > 1) {
        userSentiment = 'positive';
    } else {
        userSentiment = 'neutral';
    }

    updateSentimentIndicator();
}

function updateSentimentIndicator() {
    const dots = document.querySelectorAll('.sentiment-dot');
    dots.forEach(dot => dot.classList.remove('positive'));

    if (userSentiment === 'positive') {
        dots[0].classList.add('positive');
    } else if (userSentiment === 'neutral') {
        dots[1].classList.add('positive');
    } else {
        dots[2].classList.add('positive');
    }
}

function shouldEscalate(message, category) {
    const escapeWords = ['human', 'agent', 'help', 'urgent', 'escalate'];
    const frustrated = userSentiment === 'frustrated';
    const messageLength = message.length;

    // Escalate if frustrated and detailed message
    if (frustrated && messageLength > 50) return true;

    // Escalate if specifically requested
    for (const word of escapeWords) {
        if (message.toLowerCase().includes(word)) return true;
    }

    return false;
}

function scheduleEscalationSuggestion() {
    setTimeout(() => {
        const suggestion = document.createElement('div');
        suggestion.className = 'message bot-message';
        suggestion.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div>
                <div class="message-content">
                    <p>I noticed you might need more help. Would you like me to connect you with a support agent?</p>
                </div>
            </div>
        `;
        document.getElementById('chatMessages').appendChild(suggestion);
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }, 2000);
}

// ============ IMAGE HANDLING ============
function triggerImageUpload() {
    document.getElementById('imageInput').click();
}

function handleImageUpload(event) {
    const files = event.target.files;
    if (!files) return;

    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImages.push(e.target.result);
                displayImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    // Reset input
    event.target.value = '';
}

function displayImagePreview(imageSrc) {
    const preview = document.getElementById('imagePreview');
    const item = document.createElement('div');
    item.className = 'preview-item';
    item.innerHTML = `
        <img src="${imageSrc}" alt="preview">
        <button class="remove-preview" onclick="removeImagePreview('${uploadedImages.indexOf(imageSrc)}')">✕</button>
    `;
    preview.appendChild(item);
}

function removeImagePreview(index) {
    uploadedImages.splice(index, 1);
    clearImagePreview();
    uploadedImages.forEach(img => displayImagePreview(img));
}

function clearImagePreview() {
    document.getElementById('imagePreview').innerHTML = '';
}

// ============ REFUND PROCESSING ============
function processRefund() {
    setTimeout(() => {
        const refundAmount = '₹' + Math.floor(Math.random() * 500 + 100);
        const refundId = 'REF-' + Math.floor(Math.random() * 1000000);

        document.getElementById('refundAmount').textContent = refundAmount;
        document.getElementById('refundId').textContent = refundId;
        document.getElementById('refundDate').textContent = '3-5 business days';

        // Auto-show modal after 1 second
        setTimeout(() => {
            document.getElementById('refundModal').classList.add('show');
        }, 1000);

        // Add bot message about refund
        addMessage(
            `✅ I've processed your refund immediately! Amount: ${refundAmount} | Refund ID: ${refundId}. You'll receive it within 3-5 business days.`,
            'bot'
        );
    }, 500);
}

function closeRefundModal() {
    document.getElementById('refundModal').classList.remove('show');
}

// ============ HUMAN ESCALATION ============
function escalateToHuman() {
    // Generate summary
    const issue = chatHistory.length > 0 ? chatHistory[0].text : 'General Support';
    const messages = chatHistory.length;

    document.getElementById('issueType').textContent = categorizeMessage(issue).toUpperCase();
    document.getElementById('severity').textContent = userSentiment === 'frustrated' ? 'High' : 'Medium';
    document.getElementById('sentimentLevel').textContent = userSentiment.charAt(0).toUpperCase() + userSentiment.slice(1);

    document.getElementById('handoffModal').classList.add('show');
}

function confirmHandoff() {
    addMessage('Connecting you to a support agent...', 'bot');
    
    setTimeout(() => {
        addMessage(
            '✅ You\'re now connected to Agent Sarah! She has access to your complete chat history and account information. How can she help you today?',
            'bot'
        );
        closeHandoffModal();
    }, 2000);
}

function closeHandoffModal() {
    document.getElementById('handoffModal').classList.remove('show');
}

// ============ UI UTILITIES ============
function addTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div style="display: flex; gap: 4px;">
                <span style="animation: bounce 0.6s infinite;">•</span>
                <span style="animation: bounce 0.6s infinite 0.1s;">•</span>
                <span style="animation: bounce 0.6s infinite 0.2s;">•</span>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    if (!document.getElementById('bounceStyle')) {
        style.id = 'bounceStyle';
        style.innerHTML = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function toggleSentiment() {
    const sentiments = ['positive', 'neutral', 'frustrated'];
    const current = sentiments.indexOf(userSentiment);
    userSentiment = sentiments[(current + 1) % sentiments.length];
    updateSentimentIndicator();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    // Auto-send initial greeting
    setTimeout(() => {
        updateSentimentIndicator();
    }, 100);
});

// Prevent default file drag behavior
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files) {
        document.getElementById('imageInput').files = e.dataTransfer.files;
        handleImageUpload({ target: { files: e.dataTransfer.files } });
    }
});
