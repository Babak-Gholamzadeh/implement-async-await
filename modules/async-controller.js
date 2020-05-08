function asyncController(genFunction) {
  var genResult = genFunction();

  iterator('next');
  function iterator(method, value) {
    var yieldResult = genResult[method](value);

    if (yieldResult.done) return;

    var promiseObject = yieldResult.value;
    promiseObject
      .then(function (data) {
        iterator('next', data);
      })
      .catch(function (err) {
        iterator('throw', err);
      });
  }
}
