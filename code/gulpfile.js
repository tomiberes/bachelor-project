'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const envify = require('envify/custom');
const watchify = require('watchify');
const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');
const conf = {
  name: 'bp',
  src: {
    root: './src/',
    app: './src/index.js',
    style: './src/styles/index.css',
    templates: './src/templates/',
    server: './src/server.js'
  },
  dest: './build/'
};

function logMessage(message) {
  gutil.log(message);
  browserSync.notify(message);
}

function logError(err) {
  gutil.log(err.message);
  browserSync.notify(err.message);
}

function scripts(watch) {
  // TODO: add rollupify before babelify
  const bundler = browserify(conf.src.app, {
    basedir: __dirname,
    debug: watch,
    extensions: ['.js', '.jsx'],
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  }).transform(babelify.configure({
    sourceMapRelative: conf.root
  })).transform(envify({
    NODE_ENV: watch ? 'development' : 'production'
  }));

  if (watch) {
    watchify(bundler)
      .on('update', bundle)
      .on('time', time => {
        logMessage('Build time: ' + time / 1000 + ' s');
      });
  } else {
    bundler.transform({
      global: true
    }, 'uglifyify');
  }

  function bundle() {
    logMessage('Building Scripts...');
    return bundler.bundle()
      .on('error', logError)
      .pipe(source(conf.name + '.js'))
      .pipe(gulp.dest(conf.dest + 'js'));
  }

  return bundle();
}

function startBrowserSync() {
  browserSync.init({
    server: {
      baseDir: conf.dest,
      middleware: historyApiFallback()
    },
    files: [
      conf.dest + '*.html',
      conf.dest + 'js/*.js',
      conf.dest + 'css/*.css'
    ]
  });
}

gulp.task('scripts', () => scripts(false));

gulp.task('scripts:watch', () => scripts(true));

gulp.task('styles', () => {
  return gulp.src(conf.src.style)
    .on('error', logError)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-mixins'),
      require('postcss-nested'),
      require('postcss-simple-vars')]
    ))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(conf.dest + 'css'));
});

gulp.task('copy', () => {
  return gulp.src(conf.src.templates + 'index.html')
    .pipe(gulp.dest(conf.dest));
});

gulp.task('build', ['scripts', 'styles', 'copy'], () => {});

gulp.task('watch', ['scripts:watch', 'styles', 'copy'], () => {
  startBrowserSync();
  gulp.watch(conf.src.root + '**/*.css', ['styles']);
  gulp.watch(conf.src.templates + '**/*.html', ['copy']);
});

gulp.task('default', () => gutil.log('Not defined, use specific tasks.'));
