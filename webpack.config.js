const path = require('path');

module.exports = {
  entry: ['./for-e4e/scripts/confetti.js', './for-e4e/scripts/script.js'],
  output: {
    filename: 'for-e4e/scripts/bundled.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
};