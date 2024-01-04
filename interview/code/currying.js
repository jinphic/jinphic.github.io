function add() {
    return arguments.reduce((prev, cur) => prev + cur, 0);
  }
  
  
  function currying(fn) {
    let args = [];
    return function temp() {
      const context = this;
      if (!arguments.length) {
        let ans = fn.apply(context, args);
        args = [];
        return ans;
      } else {
        args = [
          ...args,
          ...arguments,
        ];
        return temp;
      }
    }
  }