var gulp = require('gulp');
var browserify = require('browserify');
var path = require('path');

var vinylPaths = require('vinyl-paths');
var source = require('vinyl-source-stream');
var del = require('del');
var serve = require('browser-sync');
var runSequence = require('run-sequence');
var glob = require('glob');
var rename = require('gulp-rename');
var ngAnnotatify = require('browserify-ngannotate');
var ngHtml2js = require('browserify-ng-html2js');

var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var htmlReplace = require('gulp-html-replace');
var html2js = require('gulp-ng-html2js');
var minifyCss = require('gulp-minify-css');

var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

var argv = require('yargs').argv;

var ESLINT_FILE = '.eslintrc';
var root = 'src';
var dist = 'dist';
var tmp  = 'tmp';

var patterns = {
  js: '**/*.js',
  css: '**/*.css',
  html: '**/*.html',
  spec: '**/*.spec.js',
  tpls: '**/*.tpl.html'
}

var paths = {
  js: path.join(root, '**/*.js'),
  ts: path.join(root, '**/*.ts'),
  css: path.join(root, '**/*.css'),
  html: path.join(root, '**/*.html'),
  spec: path.join(root, '**/*.spec.js'),
  tpls: path.join(root, '**/*.tpl.html'),
  vendor: {
    css: [],
    js: ['node_modules/angular-ui-router/release/angular-ui-router.js']
  }
};

var reload = serve.reload;

function resolveGlob(pattern) {
  return glob.sync(pattern).map(function (filename) {
    return filename.replace('dist/', '');
  });
}

var order = paths.vendor.css
              .concat(['app.js'])
              .concat(paths.vendor.js)
              .map(function (file) {
                return path.basename(file);
              });

function comparer(file1, file2) {

  var idx1 = order.indexOf(file1);
  var idx2 = order.indexOf(file2);

  if (idx1 > -1 && idx2 > -1) {
    return idx1 < idx2 ? -1 : 1;
  }

  if (idx1 > -1 && idx2 == -1) {
    return -1;
  }

  if (idx1 === -1 && idx2 > -1) {
    return 1;
  }

  return 0;
}

var configTask = argv.production ? 'config:production' :
                 argv.staging ? 'config:staging' : 'config:local';

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    'clean:tmp',
    'tpls',
    'typescript',
    [configTask, 'data', 'eslint', 'scripts', 'images', 'scripts:vendor', 'styles', 'styles:vendor'],
    'html',
    'clean:tmp',
    cb
  );
});

gulp.task('build:prod', function (cb) {
  runSequence(
    'build',
    'scripts:prod',
    'styles:prod',
    'clean:dist:app',
    'html',
    cb
  );
});

gulp.task('clean', function () {
  return gulp.src(dist)
    .pipe(vinylPaths(del));
});

gulp.task('clean:tmp', function () {
  return gulp.src(tmp)
    .pipe(vinylPaths(del));
});

gulp.task('clean:dist:app', function () {
  return gulp.src(['dist/app.js', 'dist/app'].concat(order.map(function (file) {
    return path.join('dist', file);
  })))
    .pipe(vinylPaths(del));
});

gulp.task('eslint', function () {
  return gulp.src([paths.js])
    .pipe(eslint({
      configFile: path.join(__dirname, ESLINT_FILE)
    }))
    .pipe(eslint.formatEach('stylish'))
})

gulp.task('typescript', function () {
  return gulp.src(['src/**/*.ts'])
  .pipe(tsc(tsProject))
  .pipe(gulp.dest('./' + tmp));
});

gulp.task('scripts', function () {
  return browserify({
    entries: './' + tmp + '/app/app.js',
    debug: true
  })
  .transform(ngHtml2js({
    module: 'templates',
    extension: 'html',
    requireAngular: true
  }))
  .transform(ngAnnotatify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('scripts:vendor', function () {
  return gulp.src(paths.vendor.js)
    .pipe(gulp.dest(dist));
});

gulp.task('scripts:prod', function () {
  return gulp.src(path.join(dist, patterns.js))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist));
});

gulp.task('styles', function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest(dist));
});

gulp.task('data', function () {
  return gulp.src('./src/app/data/data.json')
    .pipe(gulp.dest(dist));
});

gulp.task('images', function () {
  return gulp.src('./src/**/*.png')
    .pipe(gulp.dest(dist));
});

gulp.task('config:local', function () {
  return gulp.src(tmp + '/app/common/config_local.js')
    .pipe(rename('config.js'))
    .pipe(gulp.dest(tmp + '/app/common/'));
});

gulp.task('config:staging', function () {
  return gulp.src(tmp + '/app/common/config_staging.js')
    .pipe(rename('config.js'))
    .pipe(gulp.dest(tmp + '/app/common/'));
});

gulp.task('config:production', function () {
  return gulp.src(tmp + '/app/common/config_production.js')
    .pipe(rename('config.js'))
    .pipe(gulp.dest(tmp + '/app/common/'));
});

gulp.task('tpls', function () {
  return gulp.src(paths.tpls)
    .pipe(gulp.dest(tmp));
});

gulp.task('styles:vendor', function () {
  return gulp.src(paths.vendor.css)
    .pipe(gulp.dest(dist));
});

gulp.task('styles:prod', function () {
  return gulp.src(path.join(dist, patterns.css))
    .pipe(concat('app.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(dist))
});

gulp.task('html', function () {
  return gulp.src(path.join(root, 'index.html'))
    .pipe(htmlReplace({
      js: resolveGlob(path.join(dist, patterns.js)).sort(comparer),
      css: resolveGlob(path.join(dist, patterns.css)).sort(comparer)
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('serve', ['build'], function () {
  serve({
    port: process.env.PORT || 3000,
    open: false,
    files: [].concat(
      paths.js,
      paths.css,
      paths.html
    ),
    server: {
      baseDir: dist
    },
  });

  gulp.watch(paths.html, ['html', reload]);
  gulp.watch(paths.tpls, ['html2js', reload]);
  gulp.watch(paths.css, ['styles', reload]);
  gulp.watch(paths.ts, ['build', reload]);
});
