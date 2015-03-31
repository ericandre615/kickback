var kickback = require('./kickback');

kickback.request({
    url: 'http://localhost:8080/tests/data.php',
    method: 'GET'
}).then(function(response) {
    console.log('Browserify Response: ',response);
}).then(null, function(error) {
    throw new Error(error);
});
