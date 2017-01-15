
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');


var app = module.exports = express.createServer();

// Configuration


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  //app.engine('html', engines.mustache);
  //app.set('view engine', 'html');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


//NEW App configurations to integrate with https://www.npmjs.com/package/node-sspi (SSO for user recognition & management)

app.use(function (req, res, next) {
    var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: true
    });
    nodeSSPIObj.authenticate(req, res, function(err){
        res.finished || next();
    });
});

/*
app.use(function (req, res, next) {
    var out = 'Hello ' + req.connection.user + ' ! Let\'s check if you are good to go...';
    console.log(out);
    // CHECK req.connection.user  AGAINST USER DB (MONGO) WITH GROUP, MARKET OWNER, etc -> creates personalized main dashboard with saved queries and templates

    if(req.connection.user === 'VF-ROOT\\FERREPD1') {
      console.log('Valid user!')
    }
    else
    {
      console.log('Wrong user and/or password. Try again if you must.')
    }

    //if (req.connection.userGroups) {
    //    for (var i in req.connection.userGroups) {
    //       out += '<li>'+ req.connection.userGroups[i] + '</li><br/>\n';
    //    }

    //out += '</ul>';
    //res.send(out);

});
*/



// **********************************************************


// Routes

app.get('/', routes.index);
app.get('/flot', routes.flot);
app.get('/flotr2', routes.flotr2);
app.get('/google', routes.google);
app.get('/dygraphs', routes.dygraphs);
app.get('/rickshaw', routes.rickshaw);
app.get('/nvd3', routes.nvd3);
app.get('/mockup', routes.mockup);



// ADDED THIS
app.get('/red_dygraphs',routes.red_dygraphs);
app.get('/public/4CO00871-RRC_Estab_200days.csv', routes.csv_export);

console.log('    chegou ao listen');
app.listen(3000);
console.log('    novo pedido');
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
