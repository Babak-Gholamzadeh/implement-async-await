function asyncController(genFunction) {
  var genResult = genFunction();

  iterator();
  function iterator(arg) {
    var yieldResult = genResult.next(arg);

    if(yieldResult.done) return;

    var promiseObject = yieldResult.value;
    promiseObject.then(function (data) {
      iterator(data);
    });
  }

}
