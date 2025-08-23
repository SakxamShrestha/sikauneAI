class PerformanceMonitor {
  constructor() {
    this.metrics = {
      totalRequests: 0,
      averageResponseTime: 0,
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0,
      startTime: Date.now()
    };
    this.requestTimes = [];
  }

  // Start timing a request
  startTimer() {
    return Date.now();
  }

  // End timing and record metrics
  endTimer(startTime, success = true) {
    const duration = Date.now() - startTime;
    this.requestTimes.push(duration);
    this.totalRequests++;
    
    if (!success) {
      this.errors++;
    }

    // Keep only last 100 request times for average calculation
    if (this.requestTimes.length > 100) {
      this.requestTimes.shift();
    }

    // Calculate running average
    this.averageResponseTime = this.requestTimes.reduce((a, b) => a + b, 0) / this.requestTimes.length;

    return duration;
  }

  // Record cache hit/miss
  recordCacheHit() {
    this.cacheHits++;
  }

  recordCacheMiss() {
    this.cacheMisses++;
  }

  // Get performance summary
  getSummary() {
    const uptime = Date.now() - this.metrics.startTime;
    const cacheHitRate = this.totalRequests > 0 ? (this.cacheHits / (this.cacheHits + this.cacheMisses)) * 100 : 0;
    
    return {
      uptime: Math.floor(uptime / 1000), // seconds
      totalRequests: this.totalRequests,
      averageResponseTime: Math.round(this.averageResponseTime),
      cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      errors: this.errors,
      errorRate: this.totalRequests > 0 ? Math.round((this.errors / this.totalRequests) * 100 * 100) / 100 : 0
    };
  }

  // Reset metrics
  reset() {
    this.metrics = {
      totalRequests: 0,
      averageResponseTime: 0,
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0,
      startTime: Date.now()
    };
    this.requestTimes = [];
  }
}

module.exports = new PerformanceMonitor();
