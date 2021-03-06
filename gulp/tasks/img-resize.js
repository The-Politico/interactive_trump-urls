const gulp = require('gulp');
const changed = require('gulp-changed');
const fs = require('fs');
const path = require('path');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');
const merge = require('merge-stream');
const gutil = require('gulp-util');

module.exports = () => {
  const resize = (size) => {
    /**
     * From gulp-changed source:
     * https://github.com/sindresorhus/gulp-changed/blob/master/index.js#L9
     */
    function fsOperationFailed(stream, sourceFile, err) {
      if (err) {
        if (err.code !== 'ENOENT') {
          stream.emit('error', new gutil.PluginError('gulp-changed', err, {
            fileName: sourceFile.path,
          }));
        }
        stream.push(sourceFile);
      }
      return err;
    }

    /**
     * Custom comparator that takes into account filename changes.
     */
    function cacheCompare(stream, cb, sourceFile, targetPath) {
      const ext = path.extname(targetPath);
      const dir = path.dirname(targetPath);
      const base = path.basename(targetPath, ext);
      const resizeTargetPath = path.join(dir, (base + ('-' + size.toString()) + ext.toLowerCase()));

      fs.stat(resizeTargetPath, (err, targetStat) => {
        if (!fsOperationFailed(stream, sourceFile, err)) {
          if (sourceFile.stat.mtime > targetStat.mtime) {
            stream.push(sourceFile);
          }
        }
        cb();
      });
    }

    return gulp.src([
      './src/images/opt/**/*.{png,jpg,JPG}',
      '!./src/images/opt/**/_*.{png,jpg,JPG}',
    ])
      .pipe(changed('./dist/images', { hasChanged: cacheCompare }))
      .pipe(imageResize({ width: size, upscale: false, imageMagick: true }))
      .pipe(rename((renamePath) => {
        renamePath.basename += ('-' + size.toString());
        renamePath.extname = renamePath.extname.toLowerCase();
        return renamePath;
      }))
      .pipe(gulp.dest('./dist/images'));
  };

  // Create and copy resized pngs
  const s1 = resize(3000);
  const s2 = resize(2400);
  const s3 = resize(1800);
  const s4 = resize(1200);
  const s5 = resize(600);

  return merge(s1, s2, s3, s4, s5);
};
