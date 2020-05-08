function asyncController(genFunction) {
  var genResult = genFunction();

  iterator();
  function iterator(arg) {

    var yieldResult = genResult.next(arg);
    var promiseObject = yieldResult.value;
    promiseObject.then(function (data) {
      // genResult.next(data);
      iterator(data);
    });

  }

}
