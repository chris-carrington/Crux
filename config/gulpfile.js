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
npm.gulp.task('js-hint', function() 
{
   npm.gulp.src(dir.appJsList)
      .pipe(npm.gulpJshint())
      .pipe(npm.gulpJshint.reporter('default'));
});




// gulp-karma
// http://jbavari.github.io/blog/2014/06/11/unit-testing-angularjs-services/
// Setup for the Karma/Jasmine unit tests
npm.gulp.task('unit-tests', function() 
{
   var options = {
      action: 'run',
      configFile: 'karma.conf.js'
   };

   npm.gulp.src('./dummy') // files are grabed via karam.conf.js so use a dummy
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

   npm.gulp.src(dir.appAndCommonJadeList)
      .pipe(npm.gulpJade(true))
      .pipe(npm.gulpAngularTemplateCache(options))
      .pipe(npm.gulp.dest(dir.tempDirectory));  
});




// gulp-concat
// https://github.com/wearefractal/gulp-concat
// Compile all vendor and application js into one js file
npm.gulp.task('js-compile', function() 
{
   var array = [];

   array = array.concat(dir.vendorJsList); // vendor files
   array = array.concat([dir.tempDirectory +'/'+ dir.tplFile]); // template cache file
   array = array.concat(dir.appJsList); // app files
   array = array.concat(dir.testingJsList); // exclude testing files

   npm.gulp.src(array)
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
   npm.gulp.src(dir.allLessAndCssList)
      .pipe(npm.gulpLess())
      .pipe(npm.gulpConcat(options.cssFileName))
      .pipe(npm.gulpMinifyCss())
      .pipe(npm.gulp.dest(dir.cssBuildDirectory));
});




// gulp-jade
// https://www.npmjs.com/package/gulp-jade
// Compile index.jade -> index.html
npm.gulp.task('index', function() 
{
   npm.gulp.src(dir.indexJadeFile)
      .pipe(npm.gulpJade(true))
      .pipe(npm.gulp.dest(dir.buildDirectory));
});




// gulp-copy
// http://stackoverflow.com/a/27433579
// Recursively copy directories from dev -> build
npm.gulp.task('copy-assets', function()
{
   npm.gulp.src(dir.imgSrcDirectory)
      .pipe(npm.gulp.dest(dir.imgBuildDirectory));

   npm.gulp.src(dir.vedorFontList)
      .pipe(npm.gulp.dest(dir.fontBuildDirectory));

   npm.gulp.src(dir.jsonSrcDirectory)
      .pipe(npm.gulp.dest(dir.jsonBuildDirectory));
});




// connect-livereload & express & tiny-lr
// http://rhumaric.com/2014/01/livereload-magic-gulp-style/
// Setup for the express and live reload server
// Watch the less js and jade files and run tasks when they're saved
npm.gulp.task('default', ['js-hint', 'unit-tests', 'tpl-compile', 'js-compile', 'css-compile', 'copy-assets', 'index'], function()
{
   var app = npm.express();
   app.use(npm.connectLiveReload());
   app.use(npm.express.static(dir.buildDirectory));
   app.listen(options.expressPort);
   
   var liveReload = npm.tinyLiveReload();
   liveReload.listen(options.liveReloadPort);

   function notifyLiveReload(vinyl) 
   {
      var fileName = npm.path.relative(dir.buildDirectory, vinyl.path);
      liveReload.changed({ body: {files: [fileName]} });
   }

   npm.gulp.watch(dir.appAndCommonLessList, ['css-compile']);
   npm.gulp.watch(dir.appAndCommonJsList, ['js-hint', 'unit-tests', 'js-compile']);
   npm.gulp.watch(dir.appAndCommonJadeList, ['tpl-compile', 'js-compile', 'index']);  
   npm.gulp.watch(dir.imgSrcDirectory, ['copy-assets']);  
   npm.gulp.watch(dir.jsonSrcDirectory, ['copy-assets']);  

   npm.gulp.watch(dir.appAndCommonJsList, notifyLiveReload);
   npm.gulp.watch(dir.appAndCommonLessList, notifyLiveReload);
   npm.gulp.watch(dir.appAndCommonJadeList, notifyLiveReload);
});

