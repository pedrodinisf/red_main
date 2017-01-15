
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/*
 * GET other pages.
 */
 
exports.flot = function(req, res){
  console.log('    rendering flot page on server side and sending it to client');
  res.render('flot', { title: 'Flot' })
};

exports.flotr2 = function(req, res){
    console.log('    rendering Flotr2 page on server side and sending it to client');
  res.render('flotr2', { title: 'Flotr2' })
};

exports.google = function(req, res){
    console.log('    rendering google chart tools page on server side and sending it to client');
    res.render('google', { title: 'Google Chart Tools' })
};

exports.dygraphs = function(req, res){
  res.render('dygraphs', { title: 'Dygraphs' })
};

exports.rickshaw = function(req, res){
  res.render('rickshaw', { title: 'Rickshaw D3' })
};

exports.nvd3 = function(req, res){
  res.render('nvd3', { title: 'NVD3' })
};

exports.mockup = function(req, res){
  res.render('mockup', { title: 'Mockup' })
};

// ADDED THIS
exports.red_dygraphs = function(req, res){
    console.log('    rendering red_dygraphs page on server side and sending it to client');
    res.render('red_dygraphs', {title: 'red_dygraphs'})
    //HOW TO: render .html? (cross with app.js app configuration)
    // Define static?
};

// ADDED THIS
exports.csv_export = function(req, res){
    console.log('Request for /public/4CO00871-RRC_Estab_200days.csv!  Sending file....')
    var filepath = __dirname + '\\4CO00871-RRC_Estab_200days.csv'
    console.log('File Path: ' + filepath)
    res.sendFile("4CO00871-RRC_Estab_200days.csv")
};