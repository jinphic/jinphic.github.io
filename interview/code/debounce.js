function debounce(fn, wait) {
    let timer;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  }
  
  function debounce_immediate(fn, wait, immediate) {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
  
      if (timer) {
        clearTimeout(timer);
      }
  
      if (!immediate) {
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, wait);
      } else {
        const callNow = !timer;
        timer = setTimeout(() => {
          clearTimeout(timer);
        }, wait);
        if (callNow) {
          fn.apply(context, args);
        }
      }
    }
  }