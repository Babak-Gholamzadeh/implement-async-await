var asyncController = require('./modules/async-controller');

asyncController(function* gen() {

  try {
    var fetchedResult = yield fetchData();
    var resultObject = yield fetchedResult.json();
    var savedResult = yield saveData(resultObject);
    var report = yield saveReport(savedResult);
    var responseResult = yield response(report);
    console.log(responseResult);
  } catch (err) {
    console.log('The error is handled here:', err);
  }

  return "finish";

})
.then(function(result) {
  console.log('end message:', result);
})
.catch(function(err) {
  console.log('handle the uncaught errors:', err);
});

