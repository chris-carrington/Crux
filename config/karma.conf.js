module.exports = function(config) 
{
   var dir = require('./gulpfile.json').dir;
   var options = require('./gulpfile.json').options;

   var files = [];
   files.push(dir.jsBuildDirectory + '/' + options.jsFileName);
   files.push('vendor/angular-mocks/angular-mocks.js');
   files = files.concat(dir.appJsList);

   config.set(
   {
      basePath: '',
      frameworks: ['jasmine'],
      files: files,
      exclude: [],
      preprocessors: {},
      reporters: ['dots'],
      port: 9877,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: [options.testingBrowser],
      singleRun: false
   });
}