const express = require('express'),
      app = express(),
      path = require('path'),
      environment = 'dev';

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('pages/index');
})

// Static Content and node modules
const modules = path.join(__dirname, 'node_modules');
const jsExt = environment === 'dev' ? '.js' : '.min.js';
const cssExt = environment === 'dev' ? '.css' : '.min.css';
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app'));
app.use('/js/tether', express.static(path.join(modules, 'tether', 'dist', 'js', 'tether' + jsExt)));
app.use('/js/jquery', express.static(path.join(modules, 'jquery', 'dist', 'jquery' + jsExt)));
app.use('/js/bootstrap', express.static(path.join(modules, 'bootstrap', 'dist', 'js', 'bootstrap' + jsExt)));
app.use('/js/knockout', express.static(path.join(modules, 'knockout', 'build', 'output', 'knockout' + jsExt)));
app.use('/css/tether', express.static(path.join(modules, 'tether', 'dist', 'css', 'tether' + cssExt)));
app.use('/css/bootstrap', express.static(path.join(modules, 'bootstrap', 'dist', 'css', 'bootstrap' + cssExt)));
app.use('/css', express.static(path.join(modules, './bootstrap/dist/css')));

app.listen(3000, '0.0.0.0', () => {
  console.log('GA app listening on port 3000!');
})
