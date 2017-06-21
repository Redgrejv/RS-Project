
var os = require('os');
var osName = require('os-name');

//test commit

var value = os.type();
// if (value = 'Windows_NT') {
//    console.log('Windows');
// }
// else if (value = 'Linux') {
//    console.log('Linux');
// }

// import exec from 'executive';

var cp = require('child_process');
console.log('OS - ' + value.toString());
// break;

switch(value) {
   case 'Windows_NT': 
   console.log('Hey, Geyts');
   // break;
   executive('mkdir C:/data/db & start mongod --dbpath c:/data/db');
   executive('start node server.js');
   break;
   case 'Linux':
   console.log('Hey, Torwald');
   cp.fork({cwd: 'mkdir ~/data/db'});
   cp.fork({cwd: 'mongod --dbpath ~/data/db' });
   // cp.spawn('mongod', ['--dbpath ~/data/db']);
   // cp.spawn('node', ['server.js'])
   // exec(['echo 123','echo stop']);
   // exec(['mkdir ~/data/db & mongod --dbpath ~/data/db','node server.js',]);
   // exec('gnome-terminal -e "echo 1234321 "');
   // exec('gnome-terminal --command="mkdir ~/data/db & mongod --dbpath ~/data/db"');
   // exec('gnome-terminal -e "mongod --dbpath ~/data/db " & getch(); ');
   // exec('gnome-terminal ('mkdir ~/data/db') & mongod --dbpath ~/data/db' );
   // console.log('123');
   // executive('node server.js');
   break;
}
//important
function executive(strings) {
   exec(strings);
}
//
//water
// function os() {
//    var os = 0;
// if (navigator.userAgent.indexOf ('Windows') != -1) os = 1;
// if (navigator.userAgent.indexOf ('Linux')!= -1) os = 2;
// if (navigator.userAgent.indexOf ('Mac')!= -1) os = 3;
// if (navigator.userAgent.indexOf ('FreeBSD')!= -1) os = 4;
// // console.log(navigator.userAgent);
// switch (os) {
//    case 1:
//       console.log('Windows');
//       break;
//    case 2:
//       console.log('Linux');
//       break;
//    case 3:
//       console.log('Mac OS');
//       break;
//    case 4:
//       console.log('FreeBSD');
//       break;
//    default:
//       console.log('Не удалось определить ОС!');
//       break;
// }
// };


// os();

