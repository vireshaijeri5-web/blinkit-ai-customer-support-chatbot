// ============ ADVANCED REACTIVE & RESPONSIVE JAVASCRIPT ============
// Creative interactions, animations, and responsive handling for Blinkit Chatbot

// ============ REACTIVE SYSTEM ============
class ReactiveState {
    constructor() {
        this.state = {};
        this.watchers = {};
        this.subscribers = new Map();
    }

    set(key, value) {
        const oldValue = this.state[key];
        if (oldValue !== value) {
            this.state[key] = value;
            this.triggerWatchers(key, value, oldValue);
            this.notifySubscribers(key, value);
        }
    }

    get(key) {
        return this.state[key];
    }

    watch(key, callback) {
        if (!this.watchers[key]) {
            this.watchers[key] = [];
        }
        this.watchers[key].push(callback);
    }

    triggerWatchers(key, newValue, oldValue) {
        if (this.watchers[key]) {
            this.watchers[key].forEach(callback => {
                callback(newValue, oldValue);
            });
        }
    }

    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, []);
        }
        this.subscribers.get(key).push(callback);
    }

    notifySubscribers(key, value) {
        if (this.subscribers.has(key)) {
            this.subscribers.get(key).forEach(callback => {
                callback(value);
            });
        }
    }
}

// Global reactive state
const appState = new ReactiveState();

// Watch for state changes
appState.watch('userSentiment', (newVal, oldVal) => {
    console.log(`Sentiment changed: ${oldVal} → ${newVal}`);
    updateSentimentIndicator(newVal);
});

// ============ RESPONSIVE SYSTEM ============
class ResponsiveManager {
    constructor() {
        this.currentBreakpoint = this.detectBreakpoint();
        this.breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            wide: 1440
        };
        this.handlers = {};
        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('orientationchange', () => this.handleOrientationChange());
    }

    detectBreakpoint() {
        const width = window.innerWidth;
        if (width < this.breakpoints.mobile) return 'mobile';
        if (width < this.breakpoints.tablet) return 'mobile';
        if (width < this.breakpoints.desktop) return 'tablet';
        if (width < this.breakpoints.wide) return 'desktop';
        return 'wide';
    }

    handleResize() {
        const newBreakpoint = this.detectBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.triggerBreakpointChange();
            this.optimizeUIForBreakpoint();
        }
    }

    handleOrientationChange() {
        setTimeout(() => {
            this.handleResize();
        }, 500);
    }

    triggerBreakpointChange() {
        console.log(`Breakpoint changed to: ${this.currentBreakpoint}`);
        if (this.handlers[this.currentBreakpoint]) {
            this.handlers[this.currentBreakpoint]();
        }
        window.dispatchEvent(new CustomEvent('breakpointChange', {
            detail: { breakpoint: this.currentBreakpoint }
        }));
    }

    onBreakpoint(breakpoint, callback) {
        this.handlers[breakpoint] = callback;
    }

    optimizeUIForBreakpoint() {
        const container = document.querySelector('.container');
        if (!container) return;

        switch (this.currentBreakpoint) {
            case 'mobile':
                container.style.flexDirection = 'column';
                adjustSidebarForMobile();
                break;
            case 'tablet':
                container.style.flexDirection = 'column';
                adjustSidebarForTablet();
                break;
            case 'desktop':
            case 'wide':
                container.style.flexDirection = 'row';
                adjustSidebarForDesktop();
                break;
        }
    }

    getBreakpoint() {
        return this.currentBreakpoint;
    }
}

const responsiveManager = new ResponsiveManager();

// Breakpoint-specific optimizations
function adjustSidebarForMobile() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.maxHeight = '30vh';
        sidebar.style.overflowX = 'auto';
        sidebar.style.display = 'flex';
        sidebar.style.flexDirection = 'row';
    }
}

function adjustSidebarForTablet() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.maxHeight = '35vh';
        sidebar.style.flexDirection = 'column';
    }
}

function adjustSidebarForDesktop() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.maxHeight = '100vh';
        sidebar.style.width = '320px';
        sidebar.style.flexDirection = 'column';
    }
}

// ============ CREATIVE ANIMATIONS ============
class AnimationEngine {
    constructor() {
        this.animations = [];
    }

    // Fade in animation
    fadeIn(element, duration = 300) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease-in`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            }, 10);
        });
    }

    // Fade out animation
    fadeOut(element, duration = 300) {
        return new Promise(resolve => {
            element.style.opacity = '1';
            element.style.transition = `opacity ${duration}ms ease-out`;
            element.style.opacity = '0';
            setTimeout(resolve, duration);
        });
    }

    // Slide in from left
    slideInLeft(element, duration = 400) {
        return new Promise(resolve => {
            element.style.transform = 'translateX(-100%)';
            element.style.opacity = '0';
            element.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
            
            setTimeout(() => {
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            }, 10);
        });
    }

    // Slide in from right
    slideInRight(element, duration = 400) {
        return new Promise(resolve => {
            element.style.transform = 'translateX(100%)';
            element.style.opacity = '0';
            element.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
            
            setTimeout(() => {
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            }, 10);
        });
    }

    // Bounce animation
    bounce(element, times = 3) {
        return new Promise(resolve => {
            let bounces = 0;
            const bounce = () => {
                element.style.animation = 'bounce 0.6s';
                bounces++;
                
                if (bounces < times) {
                    setTimeout(bounce, 600);
                } else {
                    resolve();
                }
            };
            bounce();
        });
    }

    // Scale pop animation
    pop(element, duration = 300) {
        return new Promise(resolve => {
            element.style.transform = 'scale(0)';
            element.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                setTimeout(resolve, duration);
            }, 10);
        });
    }

    // Pulse animation
    pulse(element, duration = 500) {
        return new Promise(resolve => {
            element.style.animation = `pulse ${duration}ms ease-in-out`;
            setTimeout(resolve, duration);
        });
    }

    // Shake animation
    shake(element, intensity = 5, duration = 300) {
        return new Promise(resolve => {
            let start = Date.now();
            const animate = () => {
                const elapsed = Date.now() - start;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    const shake = Math.sin(progress * Math.PI * 8) * intensity * (1 - progress);
                    element.style.transform = `translateX(${shake}px)`;
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = '';
                    resolve();
                }
            };
            animate();
        });
    }
}

const animationEngine = new AnimationEngine();

// Add bounce animation to styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(-5px); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// ============ INTERACTIVE ELEMENTS ============
class InteractiveUI {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupKeyboardShortcuts();
        this.setupTouchGestures();
    }

    setupHoverEffects() {
        const buttons = document.querySelectorAll('button, .quick-btn, .table-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRipple(e);
            });
        });
    }

    setupClickEffects() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('button') || e.target.matches('.quick-btn')) {
                this.createClickFeedback(e.target);
            }
        });
    }

    createRipple(event) {
        const button = event.target;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.position = 'absolute';
        ripple.style.left = event.offsetX + 'px';
        ripple.style.top = event.offsetY + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    createClickFeedback(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 100);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Focus message input
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const input = document.getElementById('messageInput');
                if (input) input.focus();
            }

            // Ctrl/Cmd + Enter: Send message
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }

            // Escape: Close modals
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });
    }

    setupTouchGestures() {
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            const diff = touchStartX - touchEndX;
            
            // Swipe left on sidebar - hide it
            if (diff > 50 && responsiveManager.getBreakpoint() === 'mobile') {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.style.transform = 'translateX(-100%)';
                }
            }
            
            // Swipe right on sidebar - show it
            if (diff < -50 && responsiveManager.getBreakpoint() === 'mobile') {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.style.transform = '';
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

const interactiveUI = new InteractiveUI();

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => modal.classList.remove('show'));
}

// ============ DYNAMIC FORM VALIDATION ============
class FormValidator {
    constructor() {
        this.rules = {};
        this.setupValidators();
    }

    setupValidators() {
        // Real-time validation on input
        document.addEventListener('change', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                this.validateField(e.target);
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let errorMsg = '';

        // Email validation
        if (field.type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            errorMsg = 'Invalid email address';
        }

        // Required field
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMsg = 'This field is required';
        }

        // Min length
        if (field.hasAttribute('minlength')) {
            const minLen = parseInt(field.getAttribute('minlength'));
            if (value.length < minLen) {
                isValid = false;
                errorMsg = `Minimum ${minLen} characters required`;
            }
        }

        // Show validation feedback
        this.showValidationFeedback(field, isValid, errorMsg);
        return isValid;
    }

    showValidationFeedback(field, isValid, errorMsg) {
        let feedbackEl = field.nextElementSibling;
        
        if (!feedbackEl || !feedbackEl.classList.contains('validation-feedback')) {
            feedbackEl = document.createElement('div');
            feedbackEl.className = 'validation-feedback';
            feedbackEl.style.fontSize = '12px';
            feedbackEl.style.marginTop = '4px';
            feedbackEl.style.transition = 'all 0.3s';
            field.parentNode.insertBefore(feedbackEl, field.nextSibling);
        }

        if (isValid) {
            field.style.borderColor = 'var(--success)';
            feedbackEl.style.color = 'var(--success)';
            feedbackEl.textContent = '✓ Valid';
            feedbackEl.style.opacity = '0.7';
        } else {
            field.style.borderColor = 'var(--danger)';
            feedbackEl.style.color = 'var(--danger)';
            feedbackEl.textContent = '✗ ' + errorMsg;
            feedbackEl.style.opacity = '1';
        }
    }
}

const formValidator = new FormValidator();

// ============ SMOOTH SCROLLING ============
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.hash) {
                e.preventDefault();
                const target = document.querySelector(e.target.hash);
                if (target) {
                    this.smoothScroll(target);
                }
            }
        });
    }

    smoothScroll(element, duration = 500) {
        const start = window.pageYOffset;
        const target = element.offsetTop;
        const distance = target - start;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-in-out)
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            window.scrollTo(0, start + distance * easeProgress);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    scrollToBottom(element, smooth = true) {
        if (smooth) {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            element.scrollTop = element.scrollHeight;
        }
    }
}

const smoothScroller = new SmoothScroller();

// ============ LOADING STATES ============
class LoadingManager {
    constructor() {
        this.loadingCount = 0;
    }

    showLoading(element, message = 'Loading...') {
        this.loadingCount++;
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            gap: 10px;
        `;

        const spinner = document.createElement('div');
        spinner.style.cssText = `
            border: 3px solid var(--border);
            border-top-color: var(--primary);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 0.8s linear infinite;
        `;

        const text = document.createElement('p');
        text.textContent = message;
        text.style.color = 'var(--text-secondary)';

        loader.appendChild(spinner);
        loader.appendChild(text);
        element.appendChild(loader);

        // Add spin animation
        if (!document.getElementById('spin-style')) {
            const style = document.createElement('style');
            style.id = 'spin-style';
            style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }

        return () => this.hideLoading(element, loader);
    }

    hideLoading(element, loader) {
        this.loadingCount--;
        if (loader && loader.parentNode === element) {
            element.removeChild(loader);
        }
    }
}

const loadingManager = new LoadingManager();

// ============ LOCAL STORAGE MANAGER ============
class StorageManager {
    constructor(prefix = 'blinkit_') {
        this.prefix = prefix;
    }

    set(key, value) {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, data);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(this.prefix + key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    clear() {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    // Restore chat history
    saveChatHistory(messages) {
        return this.set('chatHistory', messages);
    }

    loadChatHistory() {
        return this.get('chatHistory', []);
    }
}

const storageManager = new StorageManager();

// ============ THEME MANAGER ============
class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme() || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
    }

    applyTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.style.setProperty('--primary', '#FFD60A');
            root.style.setProperty('--bg-dark', '#0F1419');
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            root.style.setProperty('--primary', '#FFD60A');
            root.style.setProperty('--bg-dark', '#FFFFFF');
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }

        this.currentTheme = theme;
        storageManager.set('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    setupThemeToggle() {
        // Listen for system preference changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (storageManager.get('theme') === null) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    loadTheme() {
        return storageManager.get('theme');
    }
}

const themeManager = new ThemeManager();

// ============ NOTIFICATION SYSTEM ============
class NotificationManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 2000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            padding: 16px;
            background-color: ${this.getBackgroundColor(type)};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease-out;
            display: flex;
            gap: 10px;
            align-items: center;
        `;

        const icon = document.createElement('span');
        icon.textContent = this.getIcon(type);
        icon.style.fontSize = '20px';

        const text = document.createElement('span');
        text.textContent = message;
        text.style.flex = '1';

        notification.appendChild(icon);
        notification.appendChild(text);
        this.container.appendChild(notification);

        if (duration > 0) {
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }

        return notification;
    }

    getBackgroundColor(type) {
        const colors = {
            success: 'var(--success)',
            error: 'var(--danger)',
            warning: 'var(--warning)',
            info: 'var(--secondary)'
        };
        return colors[type] || colors.info;
    }

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
}

const notificationManager = new NotificationManager();

// ============ PERFORMANCE MONITORING ============
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    startMeasure(name) {
        this.metrics[name] = Date.now();
    }

    endMeasure(name) {
        if (this.metrics[name]) {
            const duration = Date.now() - this.metrics[name];
            console.log(`[Performance] ${name}: ${duration}ms`);
            return duration;
        }
    }

    measureTask(name, fn) {
        this.startMeasure(name);
        const result = fn();
        this.endMeasure(name);
        return result;
    }

    async measureAsync(name, fn) {
        this.startMeasure(name);
        const result = await fn();
        this.endMeasure(name);
        return result;
    }
}

const performanceMonitor = new PerformanceMonitor();

// ============ ANALYTICS TRACKING ============
class AnalyticsTracker {
    constructor() {
        this.events = [];
        this.sessionStart = Date.now();
    }

    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            timestamp: Date.now(),
            data: data,
            sessionAge: Date.now() - this.sessionStart
        };
        this.events.push(event);
        console.log(`[Analytics] Event: ${eventName}`, data);
    }

    trackPageView(pageName) {
        this.trackEvent('pageView', { page: pageName });
    }

    trackUserAction(action, details = {}) {
        this.trackEvent('userAction', { action, ...details });
    }

    getSessionDuration() {
        return Date.now() - this.sessionStart;
    }

    getEventCount() {
        return this.events.length;
    }

    exportAnalytics() {
        return {
            events: this.events,
            sessionDuration: this.getSessionDuration(),
            eventCount: this.getEventCount()
        };
    }
}

const analyticsTracker = new AnalyticsTracker();

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Advanced Reactive & Responsive System Initialized');
    
    // Initialize state
    appState.set('userSentiment', 'neutral');
    appState.set('currentPage', 'chat');
    appState.set('isLoading', false);

    // Restore chat history
    const savedHistory = storageManager.loadChatHistory();
    if (savedHistory.length > 0) {
        console.log(`Restored ${savedHistory.length} messages from cache`);
    }

    // Log analytics
    analyticsTracker.trackPageView('chatbot');

    // Setup responsive optimization
    responsiveManager.onBreakpoint('mobile', () => {
        notificationManager.show('Mobile view optimized', 'info', 2000);
    });

    // Show initial notification
    notificationManager.show('Welcome to Blinkit Support!', 'success', 2000);
});

// ============ HELPER FUNCTIONS ============
function updateUIReactively(selector, content, animation = 'fadeIn') {
    const element = document.querySelector(selector);
    if (!element) return;

    animationEngine.fadeOut(element, 200).then(() => {
        element.innerHTML = content;
        animationEngine.fadeIn(element, 200);
    });
}

function createDynamicElement(tag, content, className, styles = {}) {
    const element = document.createElement(tag);
    if (content) element.innerHTML = content;
    if (className) element.className = className;
    
    Object.keys(styles).forEach(key => {
        element.style[key] = styles[key];
    });

    return element;
}

// Enhanced message sending with analytics
const originalSendMessage = sendMessage;
function sendMessageEnhanced(quickMsg = null) {
    const input = document.getElementById('messageInput');
    const message = quickMsg || input.value.trim();

    if (!message && uploadedImages.length === 0) return;

    // Track analytics
    analyticsTracker.trackUserAction('messageSent', {
        hasImages: uploadedImages.length > 0,
        messageLength: message.length
    });

    // Performance monitoring
    performanceMonitor.startMeasure('messageProcessing');
    
    originalSendMessage(quickMsg);
    
    performanceMonitor.endMeasure('messageProcessing');
}

// Save chat history periodically
setInterval(() => {
    if (typeof chatHistory !== 'undefined' && chatHistory.length > 0) {
        storageManager.saveChatHistory(chatHistory.slice(-50)); // Save last 50 messages
    }
}, 5000);

// ============ EXPORT FOR EXTERNAL USE ============
window.AppEngine = {
    appState,
    responsiveManager,
    animationEngine,
    formValidator,
    smoothScroller,
    loadingManager,
    storageManager,
    themeManager,
    notificationManager,
    performanceMonitor,
    analyticsTracker,
    updateUIReactively,
    createDynamicElement,
    closeAllModals
};

console.log('✅ Advanced Features Ready! Access via window.AppEngine');
