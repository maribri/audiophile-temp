import gulpPkg from 'gulp';
const { src, dest, series, parallel, watch } = gulpPkg;

import del from 'del';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import fileinclude from 'gulp-file-include';
import groupMedia from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import dartSass from 'sass';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import discardComments from 'postcss-discard-comments';
import csso from 'postcss-csso';
import svgSprite from 'gulp-svg-sprite';
import svgo from 'gulp-svgo';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

// Initialize BrowserSync
const server = browserSync.create();
const sassCompiler = sass(dartSass);

// Paths configuration
const config = {
  html: { src: 'src/views/*.html', dist: 'dist/' },
  styles: { src: 'src/styles/**/*.scss', dist: 'dist/styles/' },
  images: { src: 'src/media/**/*.*', dist: 'dist/media/' },//empty
  assets: { src: 'src/assets/**/*.*', dist: 'dist/assets/' },
  svg: { src: 'src/assets/icons/*.svg', dist: 'dist/assets/' },
  fonts: { src: 'src/fonts/**/*.*', dist: 'dist/fonts/' },
  scripts: { src: 'src/js/**/*.js', dist: 'dist/js/' },
  plugins: { src: 'src/plugins/**/*.*', dist: 'dist/plugins/' }
};

// HTML processing
const html = () => {
  return src(config.html.src)
    .pipe(fileinclude())
    .pipe(dest(config.html.dist))
    .pipe(server.stream());
};

// Styles processing
const styles = () => {
  return src(config.styles.src)
    .pipe(
      sassCompiler({ outputStyle: 'expanded' }).on('error', sassCompiler.logError)
    )
    .pipe(groupMedia())
    .pipe(postcss([autoprefixer(), discardComments(), csso()]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(config.styles.dist))
    .pipe(server.stream());
};

// JavaScript processing
const scripts = () => {
  return src(config.scripts.src)
    .pipe(concat('main.js')) // Concatenate all JS files
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser()) // Minify JavaScript
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(config.scripts.dist))
    .pipe(server.stream());
};

// Plugins copying
const pluginsTask = () => src(config.plugins.src).pipe(dest(config.plugins.dist));

// Image processing
const images = () => src(config.images.src).pipe(dest(config.images.dist));

// Asset copying
const assets = () => src(config.assets.src).pipe(dest(config.assets.dist));

// Font copying
const fonts = () => src(config.fonts.src).pipe(dest(config.fonts.dist));

// SVG sprite generation
const svg = () => {
  return src(config.svg.src)
    .pipe(svgo({ plugins: [{ removeAttrs: { attrs: ['fill', 'stroke'] } }] }))
    .pipe(svgSprite({ mode: { symbol: { dest: '.', sprite: 'sprite.svg' } } }))
    .pipe(dest(config.svg.dist));
};

// Convert JPG to WebP
const convertJpgToWebp = () => {
  return src('src/assets/**/*.jpg')
    .pipe(webp({ quality: 85 })) // High-quality WebP conversion
    .pipe(rename({ extname: '.webp' }))
    .pipe(dest('src/assets/'));
};

// Convert JPG to AVIF
const convertJpgToAvif = () => {
  return src('src/assets/**/*.jpg')
    .pipe(avif({ quality: 70, chromaSubsampling: '4:4:4' })) // AVIF compression
    .pipe(rename({ extname: '.avif' }))
    .pipe(dest('src/assets/'));
};

// Clean dist folder
const clean = () => del('dist/');

// Start local dev server
const load = () => {
  server.init({
    port: 3009,
    notify: false,
    server: { baseDir: 'dist' }
  });
};

// Watch file changes
const watchFiles = () => {
  watch('src/views/**/*.html', series(html));
  watch('src/styles/**/*.scss', series(styles));
  watch('src/js/**/*.js', series(scripts));
};

// Gulp tasks
const convertJpgs = series(convertJpgToWebp, convertJpgToAvif);
const build = series(clean, parallel(html, styles, scripts, images, assets, svg, fonts, pluginsTask));
const dev = series(build, parallel(watchFiles, load));

// Export tasks
export { load, clean, convertJpgs, build, dev };
export default dev;
