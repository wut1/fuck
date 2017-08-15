var shell = require('shelljs');

var src = process.argv[1];
if (src == 'dist') {
    shell.rm('-rf', 'dist');
} else {
    shell.rm('-rf', 'dist/public/');
}