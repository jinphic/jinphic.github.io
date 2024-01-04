class MyPromise {
    status = 'pending';
    data = undefined;
    callbacks = [];
    constructor(excutor) {
  
      const resolve = (value) => {
        if (this.status !== 'pending') {
          return;
        }
        this.status = 'resolved';
        this.data = value;
        if (this.callbacks.length) {
          this.callbacks.forEach(cb => {
            cb.onResolved(value);
          })
        }
      }
  
      const reject = (reason) => {
        if (this.status !== 'pending') {
          return;
        }
        this.status = 'rejected';
        this.data = reason;
        if (this.callbacks.length) {
          this.callbacks.forEach(cb => {
            cb.onRejected(reason);
          })
        }
      }
  
  
      try {
        excutor(resolve, reject)
      } catch (error) {// 如果执行器抛出异常将失败
        console.error('🙅 error', error);
        reject(error)
      }
    }
  
  
    then(onResolved, onRejected) {
      return new MyPromise((resolve, reject) => {
        if (this.status === 'pending') {
          this.callbacks.push({ onResolved, onRejected });
        } else if (this.status === 'resolved') {
          try {
            const res = onResolved(this.data);
            if (res instanceof MyPromise) {
              res.then(
                value => resolve(value),
                reason => reject(reason),
              );
            } else {
              resolve(res);
            }
          } catch (reason) {
            reject(resolve);
          }
        } else {
          onRejected(this.data)
        }
      })
    }
  }
  
  
  
  var p = new MyPromise(function (resolve, reject) { resolve(1) });
  p.then(
    res => console.log(res),
    reason => console.error(reason)
  )