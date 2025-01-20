const gulp = require('gulp');
const { src, dest } = require('gulp');
const del = require("del");
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const fileinclude = require("gulp-file-include");
const group_media = require("gulp-group-css-media-queries");
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const server = require('browser-sync').create();
const postcss = require('gulp-postcss');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');

// path
const config = {
    html: {
        src: 'src/views/*.html',
        dist: 'dist/'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dist: 'dist/styles/'
    },
    images: {
      src: 'src/media/**/*.*',
      dist: 'dist/media/'
    },
    assets: {
        src: 'src/assets/**/*.*',
        dist: 'dist/assets/'
    },
    svg: {
        src: 'src/assets/icons/*.svg',
        dist: 'dist/assets/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dist: 'dist/fonts/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dist: 'dist/js/'
    },
    plugins: {
      src: 'src/plugins/**/*.*',
      dist: 'dist/plugins/'
    }
};

// html
const html = () => {
  return src(config.html.src)
    .pipe(fileinclude())
    .pipe(dest(config.html.dist))
    .pipe(server.stream());
}

// styles
const styles = () => {
    return src(config.styles.src)
      .pipe(
        sass({
            outputStyle: "expanded"
        }).on('error', sass.logError)
      )
      .pipe(
        group_media()
      )
      .pipe(postcss([
          require('autoprefixer'),
          require('postcss-discard-comments'),
          require('postcss-csso')
      ]))
      .pipe(
        rename({
            extname: ".min.css"
        })
      )
      .pipe(dest(config.styles.dist))
      .pipe(server.stream());
}

const scripts = () => {
  return src(config.scripts.src)
    .pipe(concat('main.js')) // Concatenate all JS files into one
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(terser()) // Minify the JavaScript
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(dest(config.scripts.dist))
    .pipe(server.stream());
}

const plugins = () => {
  return src(config.plugins.src)
    .pipe(dest(config.plugins.dist))
    .pipe(server.stream());
}

const images = () => {
    return src(config.images.src)
      .pipe(dest(config.images.dist))
      .pipe(server.stream());
}

const assets = () => {
  return src(config.assets.src)
    .pipe(dest(config.assets.dist))
    .pipe(server.stream());
}

const fonts = () => {
    return src(config.fonts.src)
      .pipe(dest(config.fonts.dist))
      .pipe(server.stream());
}

const svg = () => {
  return src(config.svg.src)
    .pipe(svgo({
        plugins: [
          { removeAttrs: { attrs: ['fill', 'stroke'] } }
        ]
      }
    ))
    .pipe(svgSprite(
      {
        dest: config.svg.dist,
        mode: {
          symbol: {
            dest: '.',
            sprite: 'sprite.svg'
          }
        }
      }
    ))
    .pipe(dest(config.svg.dist))
    .pipe(server.stream());
}

const clean = (params) => {
  return del('dist/');
}

const load = () => {
  server.init({
    port: 3009,
    notify: false,
    server: {
      baseDir: "dist", //dist
    }
  });
}

const watchFiles = () => {
  gulp.watch('src/views/**/*.html', gulp.series(html));
  gulp.watch('src/styles/**/*.scss', gulp.series(styles));
  gulp.watch('src/js/**/*.js', gulp.series(scripts));
};

let build = gulp.series(clean, gulp.parallel(html, styles, scripts, images, assets, svg, fonts, plugins));
let watch = gulp.series(build, gulp.parallel(watchFiles, load));

exports.load = load;
exports.clean = clean;
//exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;
