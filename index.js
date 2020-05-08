var asyncController = require('./modules/async-controller');

asyncController(function* gen() {
  var fetchedResult = yield fetchData();
  console.log(fetchedResult);
});
