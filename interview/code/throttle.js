function throttle(fn, wait) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        fn.apply(context, args);
        clearTimeout(timer);
      }, wait);
    }
  }
  
  