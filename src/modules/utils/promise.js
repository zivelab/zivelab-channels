export function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("promise timeout"));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
// const cancelablePromise = makeCancelable(
//  new Promise(r => component.setState({...}))
//  );
//
//  cancelablePromise
//    .promise
//    .then(() => console.log('resolved'))
//    .catch((reason) => console.log('isCanceled', reason.isCanceled));
//
//  cancelablePromise.cancel(); // Cancel the promise

export function makeCancelable(promise) {
  let hasCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    }
  };
}
