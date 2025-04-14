var url = require( 'url' );
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse( adr, true );
const  util = require('util');

console.log(q.host); //return 'localhost:8080'
console.log(q.pathname);
console.log(q.search);

var qdata = q.query;
console.log(qdata.month);