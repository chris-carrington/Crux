// Node plugins that are accessed via npm install 
// and are listed in the config/package.json file
var npm = 
{
   gulp: require('gulp'),
   path: require('path'),
   express: require('express'),
   gulpLess: require('gulp-less'),
   gulpJade: require('gulp-jade'),
   gulpKarma: require('gulp-karma'),
   gulpJshint: require('gulp-jshint'),
   gulpConcat: require('gulp-concat'),
   tinyLiveReload: require('tiny-lr'),
   mergeStream: require('merge-stream'),
   gulpConcatCss: require('gulp-concat-css'),
   gulpMinifyCss: require('gulp-minify-css'),
   gulpLiveReload: require('gulp-livereload'),
   connectLiveReload: require('connect-livereload'),
   gulpAngularTemplateCache: require('gulp-angular-templatecache')
};




// Commonly used directories & files 
var dir = require('./gulpfile.json').dir;




// Options to quickly and easily change gulp parameters
var options = require('./gulpfile.json').options;




// gulp-jshint
// https://www.npmjs.com/package/gulp-jshint/
// Helps to detect errors and potential problems in code.
npm.gulp.task('js-hint', ['tpl-compile', 'js-compile'], function() 
{
   return npm.gulp.src(dir.appJsList)
      .pipe(npm.gulpJshint())
      .pipe(npm.gulpJshint.reporter('default'));
});




// gulp-karma
// http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/
// Setup for the Karma/Jasmine unit tests
npm.gulp.task('unit-tests', ['tpl-compile', 'js-compile', 'js-hint'], function() 
{
   var options = {
      action: 'run',
      configFile: 'karma.conf.js'
   };

   return npm.gulp.src('./dummy') // files are grabed via karam.conf.js so use a dummy
      .pipe(npm.gulpKarma(options))
      .on('error', function() { this.emit('end'); });
});




// gulp-jade & gulp-angular-templatecache
// https://www.npmjs.com/package/gulp-jade
// https://www.npmjs.com/package/gulp-angular-templatecache/
// Compile all jade templates into the temp folder
npm.gulp.task('tpl-compile', function() 
{
   var options = {
      standalone: true,
      module: 'templates-main'
   };

   return npm.gulp.src(dir.appAndCommonJadeList)
      .pipe(npm.gulpJade(true))
      .pipe(npm.gulpAngularTemplateCache(options))
      .pipe(npm.gulp.dest(dir.tempDirectory));  
});




// gulp-concat
// https://github.com/wearefractal/gulp-concat
// Compile all vendor and application js into one js file
npm.gulp.task('js-compile', ['tpl-compile'], function() 
{
   var array = [];

   array = array.concat(dir.vendorJsList); // vendor files
   array = array.concat([dir.tempDirectory +'/'+ dir.tplFile]); // template cache file
   array = array.concat(dir.appJsList); // app files
   array = array.concat(dir.testingJsList); // exclude testing files

   return npm.gulp.src(array)
      .pipe(npm.gulpConcat(options.jsFileName))
      .pipe(npm.gulp.dest(dir.jsBuildDirectory));  
});




// gulp-less & gulp-minify-css & gulp-concat
// https://github.com/plus3network/gulp-less
// https://github.com/murphydanger/gulp-minify-css
// https://github.com/wearefractal/gulp-concat
// Compile & minify all vendor css and application less into one css file
npm.gulp.task('css-compile', function() 
{
   return npm.gulp.src(dir.allLessAndCssList)
      .pipe(npm.gulpLess())
      .pipe(npm.gulpConcat(options.cssFileName))
      .pipe(npm.gulpMinifyCss())
      .pipe(npm.gulp.dest(dir.cssBuildDirectory));
});




// gulp-jade
// https://www.npmjs.com/package/gulp-jade
// Compile index.jade -> index.html
npm.gulp.task('index', ['tpl-compile', 'js-compile'], function() 
{
   return npm.gulp.src(dir.indexJadeFile)
      .pipe(npm.gulpJade(true))
      .pipe(npm.gulp.dest(dir.buildDirectory));
});




// gulp-copy & merge-stream
// http://stackoverflow.com/a/27433579
// https://www.npmjs.com/package/merge-stream
// Recursively copy directories from dev -> build
npm.gulp.task('copy-assets', function()
{
   var imgStream = npm.gulp.src(dir.imgSrcDirectory)
      .pipe(npm.gulp.dest(dir.imgBuildDirectory));

   var fontStream = npm.gulp.src(dir.vedorFontList)
      .pipe(npm.gulp.dest(dir.fontBuildDirectory));

   var jsonStream = npm.gulp.src(dir.jsonSrcDirectory)
      .pipe(npm.gulp.dest(dir.jsonBuildDirectory));

   return npm.mergeStream(imgStream, fontStream).add(jsonStream);
});




// Server variables that will be utilized in the gulp server task
// and the gulp default task. Because they need access to
// multiple callbacks they need to be declared outside both of them
var server = 
{
   instance: npm.express(),
   liveReload: npm.tinyLiveReload()
};




// Initializes an express server and live reload listener. Must wait for
// all default tasks to complete before the server can be built.
npm.gulp.task('server', ['unit-tests', 'css-compile', 'copy-assets', 'index'], function()
{
   server.instance.use(npm.connectLiveReload());
   server.instance.use(npm.express.static(dir.buildDirectory));
   server.instance.listen(options.expressPort);
   server.liveReload.listen(options.liveReloadPort);
});




// gulp-watch
// http://rhumaric.com/2014/01/livereload-magic-gulp-style/
// Initialize watches for all assets and notify the live reload server when one changes
npm.gulp.task('default', ['unit-tests', 'css-compile', 'copy-assets', 'index', 'server'], function()
{
   function initializeWatch(stream, todo)
   {
      npm.gulp.watch(stream, function(vinyl)
      {
         npm.gulp.run(todo, function()
         {
            var fileName = npm.path.relative(dir.buildDirectory, vinyl.path);
            server.liveReload.changed({ body: {files: [fileName]} });
         });
      });
   }

   initializeWatch(dir.appAndCommonJsList, 'unit-tests');
   initializeWatch(dir.appAndCommonLessList, 'css-compile');
   initializeWatch(dir.appAndCommonJadeList, 'index');
   initializeWatch(dir.imgSrcDirectory, 'copy-assets');
   initializeWatch(dir.jsonSrcDirectory, 'copy-assets');
});
