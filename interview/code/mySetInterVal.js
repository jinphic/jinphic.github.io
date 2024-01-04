function mySetInterVal(fn, a, b) {
    this.a = a;
    this.b = b;
    this.count = 0;
    this.timer = null;
    this.start = () => {
      this.timer = setTimeout(() => {
        fn();
        this.count++;
        this.start();
      }, this.a + this.b * this.count);
    }
    this.stop = () => {
      clearTimeout(this.timer);
      this.count = 0;
    }
  }
  
  