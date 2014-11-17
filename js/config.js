/*!
 * RequireJS Config
 */
require.config({
  // set to assets/js so that all paths inside app are relative
  //baseUrl: '/assets/js/',

  paths: {
    // Plugins
    'jquery': '../bower_components/jquery/dist/jquery.min',
    //'underscore': '../bower_components/underscore/underscore-min',
    //'moment': '../bower_components/moment/moment',
    //'pikaday': '../bower_components/pikaday/pikaday',
    //'jquery.validate.min': '../bower_components/jquery-validate/dist/jquery.validate.min',
    //'jquery.validate': '../bower_components/jquery-validate/dist/additional-methods.min',
    //'handlebars': '../bower_components/handlebars/handlebars.amd.min',
    //'hbs': '../bower_components/hbs/hbs',
    //'autolinker': '../bower_components/Autolinker.js/dist/Autolinker.min',
  },
  shim: {
    //'jquery.validate' : {
    //  deps: ['jquery']
    //}
  }
});
