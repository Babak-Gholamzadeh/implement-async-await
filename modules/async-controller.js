function asyncController(genFunction) {
  var genResult = genFunction();

  return new Promise(function (resolve, reject) {

    iterator('next');
    function iterator(method, value) {

      try {
        var yieldResult = genResult[method](value);
      } catch (err) {
        reject(err);
        return;
      }

      if (yieldResult.done) return resolve(yieldResult.value);

      var promiseObject = Promise.resolve(yieldResult.value);
      promiseObject
        .then(function (data) {
          iterator('next', data);
        })
        .catch(function (err) {
          iterator('throw', err);
        });
    }

  });
}
