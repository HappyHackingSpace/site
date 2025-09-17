/**
 * Advanced API Caching System
 * Implements TTL caching, timeout handling, and stale-while-revalidate
 */

class APICache {
  static cache = new Map()
  static backgroundUpdates = new Map()

  static async get(key, fetcher, options = {}) {
    const {
      ttl = 300000, // 5 minutes default
      timeout = 8000, // 8 second timeout
      staleWhileRevalidate = true,
      fallback = null
    } = options

    const cached = this.cache.get(key)
    const now = Date.now()

    // Return fresh cache if available
    if (cached && (now - cached.timestamp) < ttl) {
      return cached.data
    }

    // Stale-while-revalidate: return stale data and update in background
    if (cached && staleWhileRevalidate && !this.backgroundUpdates.has(key)) {
      this.backgroundUpdates.set(key, true)

      // Background update (non-blocking)
      this.fetchWithTimeout(fetcher, timeout)
        .then(data => {
          this.cache.set(key, { data, timestamp: now })
          this.backgroundUpdates.delete(key)
        })
        .catch(() => {
          this.backgroundUpdates.delete(key)
        })

      return cached.data
    }

    // No cache available - fetch with timeout
    try {
      const data = await this.fetchWithTimeout(fetcher, timeout)
      this.cache.set(key, { data, timestamp: now })
      return data
    } catch (error) {
      console.warn(`API fetch failed for ${key}:`, error.message)

      // Return stale data if available, otherwise fallback
      if (cached) {
        console.info(`Using stale data for ${key}`)
        return cached.data
      }

      if (fallback !== null) {
        console.info(`Using fallback data for ${key}`)
        return fallback
      }

      throw error
    }
  }

  static async fetchWithTimeout(fetcher, timeout) {
    return Promise.race([
      fetcher(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      )
    ])
  }

  static clear(key) {
    if (key) {
      this.cache.delete(key)
      this.backgroundUpdates.delete(key)
    } else {
      this.cache.clear()
      this.backgroundUpdates.clear()
    }
  }

  static getStats() {
    return {
      cacheSize: this.cache.size,
      backgroundUpdates: this.backgroundUpdates.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

export default APICache