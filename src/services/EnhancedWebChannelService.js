// EnhancedWebChannelService.js - Advanced WebChannel management with performance monitoring

class EnhancedWebChannelService {
  constructor() {
    this.backend = null;
    this.isConnected = false;
    this.connectionPromise = null;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
    this.connectionTimeout = 10000; // 10 seconds
    this.performanceMetrics = {};
    this.errorLog = [];
    this.successLog = [];
    
    // Connection state
    this.connectionState = 'disconnected'; // disconnected, connecting, connected, failed
    this.lastConnectionAttempt = 0;
    this.connectionAttempts = 0;
    
    // Performance monitoring
    this.startPerformanceMonitoring();
  }

  // === Connection Management ===

  async initialize() {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      this.connectionState = 'connecting';
      this.lastConnectionAttempt = Date.now();
      this.connectionAttempts++;

      // Check if QWebChannel is available
      if (typeof qt === 'undefined' || !qt.webChannelTransport) {
        const error = new Error('QWebChannel not available');
        this.logError('initialize', error);
        this.connectionState = 'failed';
        reject(error);
        return;
      }

      // Setup connection timeout
      const timeoutId = setTimeout(() => {
        const error = new Error('QWebChannel connection timeout');
        this.logError('initialize', error);
        this.connectionState = 'failed';
        reject(error);
      }, this.connectionTimeout);

      // Create QWebChannel connection
      try {
        new QWebChannel(qt.webChannelTransport, (channel) => {
          clearTimeout(timeoutId);
          
          this.backend = channel.objects.backend;
          this.isConnected = true;
          this.connectionState = 'connected';
          this.retryCount = 0;
          
          console.log('✅ Enhanced QWebChannel connected successfully');
          this.logSuccess('initialize', { connectionTime: Date.now() - this.lastConnectionAttempt });
          
          // Setup connection monitoring
          this.setupConnectionMonitoring();
          
          resolve(this.backend);
        });
      } catch (error) {
        clearTimeout(timeoutId);
        this.logError('initialize', error);
        this.connectionState = 'failed';
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  setupConnectionMonitoring() {
    // Monitor connection health
    setInterval(() => {
      this.checkConnectionHealth();
    }, 5000); // Check every 5 seconds
  }

  async checkConnectionHealth() {
    try {
      if (!this.isConnected || !this.backend) {
        console.warn('⚠️ Connection health check failed - attempting reconnection');
        await this.reconnect();
        return;
      }

      // Test connection with a simple method call
      const testResult = await this.callSlot('logAction', 'health_check', 'Connection health check');
      console.log('✅ Connection health check passed');
      
    } catch (error) {
      console.error('❌ Connection health check failed:', error);
      await this.reconnect();
    }
  }

  async reconnect() {
    if (this.retryCount >= this.maxRetries) {
      console.error('❌ Max retry attempts reached');
      this.connectionState = 'failed';
      return;
    }

    console.log(`🔄 Attempting reconnection (${this.retryCount + 1}/${this.maxRetries})`);
    
    this.reset();
    this.retryCount++;
    
    // Exponential backoff
    const delay = this.retryDelay * Math.pow(2, this.retryCount - 1);
    
    setTimeout(async () => {
      try {
        await this.initialize();
      } catch (error) {
        console.error('❌ Reconnection failed:', error);
        await this.reconnect();
      }
    }, delay);
  }

  // === Enhanced Slot Calling ===

  async callSlot(slotName, ...args) {
    const startTime = Date.now();
    
    try {
      await this.ensureConnection();

      if (!this.backend[slotName]) {
        throw new Error(`Slot '${slotName}' not found`);
      }

      console.log(`📡 Calling slot: ${slotName}`, args);
      
      // Wrap the slot call in a Promise with timeout
      const result = await this.executeWithTimeout(
        () => this.backend[slotName](...args),
        this.connectionTimeout
      );
      
      const executionTime = Date.now() - startTime;
      this.logSuccess(slotName, { executionTime, args });
      
      return result;
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      this.logError(slotName, error, { executionTime, args });
      
      // Reset connection on error
      this.reset();
      throw error;
    }
  }

  async executeWithTimeout(operation, timeout) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeout}ms`));
      }, timeout);

      try {
        const result = operation();
        
        if (result && typeof result.then === 'function') {
          // If it's a Promise
          result.then((res) => {
            clearTimeout(timeoutId);
            resolve(res);
          }).catch((err) => {
            clearTimeout(timeoutId);
            reject(err);
          });
        } else {
          // If it's not a Promise
          clearTimeout(timeoutId);
          resolve(result);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  // === Connection State Management ===

  isReady() {
    return this.isConnected && this.backend !== null && this.connectionState === 'connected';
  }

  getConnectionState() {
    return {
      state: this.connectionState,
      isConnected: this.isConnected,
      retryCount: this.retryCount,
      connectionAttempts: this.connectionAttempts,
      lastConnectionAttempt: this.lastConnectionAttempt
    };
  }

  reset() {
    this.backend = null;
    this.isConnected = false;
    this.connectionState = 'disconnected';
    this.connectionPromise = null;
    console.log('🔄 Enhanced WebChannel connection reset');
  }

  async ensureConnection() {
    if (!this.isReady()) {
      console.log('🔄 Ensuring WebChannel connection...');
      await this.initialize();
    }
  }

  // === Performance Monitoring ===

  startPerformanceMonitoring() {
    // Monitor performance every 10 seconds
    setInterval(() => {
      this.generatePerformanceReport();
    }, 10000);
  }

  logSuccess(methodName, data = {}) {
    const logEntry = {
      method: methodName,
      timestamp: Date.now(),
      type: 'success',
      ...data
    };
    
    this.successLog.push(logEntry);
    
    // Keep only last 100 entries
    if (this.successLog.length > 100) {
      this.successLog.shift();
    }
    
    // Update performance metrics
    this.updatePerformanceMetrics(methodName, data.executionTime || 0, true);
  }

  logError(methodName, error, data = {}) {
    const logEntry = {
      method: methodName,
      timestamp: Date.now(),
      type: 'error',
      error: error.message,
      stack: error.stack,
      ...data
    };
    
    this.errorLog.push(logEntry);
    
    // Keep only last 100 entries
    if (this.errorLog.length > 100) {
      this.errorLog.shift();
    }
    
    // Update performance metrics
    this.updatePerformanceMetrics(methodName, data.executionTime || 0, false);
  }

  updatePerformanceMetrics(methodName, executionTime, success) {
    if (!this.performanceMetrics[methodName]) {
      this.performanceMetrics[methodName] = {
        totalCalls: 0,
        successfulCalls: 0,
        failedCalls: 0,
        totalTime: 0,
        avgTime: 0,
        minTime: Infinity,
        maxTime: 0,
        lastCallTime: 0
      };
    }
    
    const metrics = this.performanceMetrics[methodName];
    metrics.totalCalls++;
    metrics.totalTime += executionTime;
    metrics.avgTime = metrics.totalTime / metrics.totalCalls;
    metrics.minTime = Math.min(metrics.minTime, executionTime);
    metrics.maxTime = Math.max(metrics.maxTime, executionTime);
    metrics.lastCallTime = Date.now();
    
    if (success) {
      metrics.successfulCalls++;
    } else {
      metrics.failedCalls++;
    }
  }

  generatePerformanceReport() {
    const report = {
      connectionState: this.getConnectionState(),
      performanceMetrics: this.performanceMetrics,
      errorCount: this.errorLog.length,
      successCount: this.successLog.length,
      timestamp: Date.now()
    };
    
    // Log performance issues
    Object.entries(this.performanceMetrics).forEach(([method, metrics]) => {
      if (metrics.avgTime > 1000) { // More than 1 second average
        console.warn(`⚠️ Performance issue detected for ${method}: avg ${metrics.avgTime.toFixed(2)}ms`);
      }
      
      if (metrics.failedCalls > metrics.successfulCalls) {
        console.warn(`⚠️ High failure rate for ${method}: ${metrics.failedCalls}/${metrics.totalCalls} failed`);
      }
    });
    
    return report;
  }

  // === Navigation Methods ===

  async goBack() {
    return this.callSlot('goBack');
  }

  async navigateToHome() {
    return this.callSlot('navigateToHome');
  }

  async openMenu() {
    return this.callSlot('openMenu');
  }

  // === Feature Methods ===

  async openArchives() {
    return this.callSlot('openArchives');
  }

  async openTelephone() {
    return this.callSlot('openTelephone');
  }

  async openReunions() {
    return this.callSlot('openReunions');
  }

  async openAccueil() {
    return this.callSlot('openAccueil');
  }

  async openCommandes() {
    return this.callSlot('openCommandes');
  }

  async openEmails() {
    return this.callSlot('openEmails');
  }

  async openAgenda() {
    return this.callSlot('openAgenda');
  }

  async openColis() {
    return this.callSlot('openColis');
  }

  // === System Methods ===

  async changeTheme(theme) {
    return this.callSlot('changeTheme', theme);
  }

  async changeMode(mode) {
    return this.callSlot('changeMode', mode);
  }

  async updateProgress(value) {
    return this.callSlot('updateProgress', value);
  }

  async shutdown() {
    return this.callSlot('shutdown');
  }

  async sendNotification(message) {
    return this.callSlot('sendNotification', message);
  }

  async logAction(action, details = {}) {
    return this.callSlot('logAction', action, JSON.stringify(details));
  }

  // === Utility Methods ===

  getPerformanceReport() {
    return this.generatePerformanceReport();
  }

  getErrorLog() {
    return this.errorLog;
  }

  getSuccessLog() {
    return this.successLog;
  }

  clearLogs() {
    this.errorLog = [];
    this.successLog = [];
    this.performanceMetrics = {};
    console.log('🔄 Logs cleared');
  }

  // === Test Methods ===

  async testConnection() {
    try {
      const result = await this.callSlot('logAction', 'test_connection', 'Connection test');
      console.log('✅ Connection test successful:', result);
      return true;
    } catch (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
  }

  async testCloseWindow() {
    return this.callSlot('testCloseWindow');
  }
}

// Create singleton instance
const enhancedWebChannelService = new EnhancedWebChannelService();

export default enhancedWebChannelService;
