const path = require('path');

module.exports = {
    entry: './dev/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};