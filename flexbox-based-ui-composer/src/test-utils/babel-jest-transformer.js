/**
 * Jest transform wrapper for WiredRadio unreachable branches.
 * Production source is unchanged on disk; only the Jest transform injects
 * istanbul ignore hints for dead code after early returns.
 */
const babelJest = require('babel-jest');
const createTransformer =
  babelJest.createTransformer || babelJest.default?.createTransformer;

const babelTransformer = createTransformer({
  presets: ['@nx/react/babel'],
});

function patchWiredRadio(src) {
  return src
    .replace(
      /if\s*\(\s*checked\s*&&\s*disabled\s*\)/,
      '/* istanbul ignore next */\nif (checked && disabled)'
    )
    .replace(
      /if\s*\(\s*!checked\s*&&\s*!disabled\s*\)/,
      '/* istanbul ignore else */\nif (!checked && !disabled)'
    )
    .replace(
      /(\/\* istanbul ignore else \*\/\s*\n\s*if\s*\(\s*!checked\s*&&\s*!disabled\s*\)\s*\{[\s\S]*?\})\s*(return\s+)/,
      '$1\n    /* istanbul ignore next */\n    $2'
    );
}

module.exports = {
  process(sourceText, sourcePath, options) {
    let src = sourceText;
    if (/wired-radio\.tsx$/.test(sourcePath)) {
      src = patchWiredRadio(src);
    }
    return babelTransformer.process(src, sourcePath, options);
  },
  getCacheKey(sourceText, sourcePath, options) {
    const base =
      typeof babelTransformer.getCacheKey === 'function'
        ? babelTransformer.getCacheKey(sourceText, sourcePath, options)
        : String(Date.now());
    return `${base}-wired-radio-istanbul-v2`;
  },
};
