var shell = require('shelljs');
var src = process.argv[2];
shell.rm('-rf', src);
//shell.rm('-rf', 'side_client/**/*.js');