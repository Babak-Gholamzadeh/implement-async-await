function asyncController(genFunction) {
  var genResult = genFunction();
  var yieldResult = genResult.next();
  var promiseObject = yieldResult.value;
  promiseObject.then(function(data) {
    genResult.next(data);
  });
}
