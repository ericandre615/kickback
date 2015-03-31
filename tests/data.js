var kb = require('./src/kickback');

kb.get(__dirname+'/data.json').then(function(res) {
    console.log('RES',res);
}).then(null, function(err) {
    throw new Error('Net: ',err);
});
