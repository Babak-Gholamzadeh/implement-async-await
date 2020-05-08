function asyncController(genFunction) {
  var genObject = genFunction();
  return new Promise((resolve, reject) => {
    (function iterator(method, value) {
      try {
        var nextObject = genObject[method](value);
      }
      catch(err) {
        reject(err);
        return;
      }
      if(nextObject.done) return resolve(nextObject.value);
      const promiseObject = Promise.resolve(nextObject.value);
      promiseObject
        .then(iterator.bind(null, 'next'))
        .catch(iterator.bind(null, 'throw'));
    })('next', undefined);
  });
}