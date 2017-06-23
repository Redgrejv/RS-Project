
var os = require('os');
var osName = require('os-name');


var value = os.type();
// if (value = 'Windows_NT') {
//    console.log('Windows');
// }
// else if (value = 'Linux') {
//    console.log('Linux');
// }

var exec = require('child_process').exec;
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
   executive('mkdir ~/data/db & mongod --dbpath ~/data/db' );
   executive('node server.js');
   break;
}

function executive(strings) {
   exec(strings);
}
























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

