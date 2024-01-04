class EventBus {
    static listener = new Map();
  
    static on = (name, cb) => {
      if (this.listener.has(name)) {
        this.listener.get(name).push({ once: false, fn: cb });
      } else {
        this.listener.set(name, [{ once: false, fn: cb }]);
      }
    }
  
    static once = (name, cb) => {
      if (this.listener.has(name)) {
        this.listener.get(name).push({ once: true, fn: cb });
      } else {
        this.listener.set(name, [{ once: true, fn: cb }]);
      }
    }
  
    static off = (name, cb) => {
      if (this.listener.has(name)) {
        const cbs = this.listener.get(name).filter(item => item.fn !== cb);
        this.listener.set(name, cbs);
      }
    }
  
    static removeAllListener = (name) => {
      if (name) {
        this.listener.delete(name);
      } else {
        this.listener.clear();
      }
    }
  
    static emit = (name, ...rest) => {
      if (this.listener.has(name)) {
        const cache = this.listener.get(name);
        cache.forEach(item => {
          item.fn.call(this, rest);
        });
        const newCache = cache.filter(item => !item.once);
        this.listener.set(name, newCache);
      }
    }
  
  
  }