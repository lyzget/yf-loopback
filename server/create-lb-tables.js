'use strict';

var server = require('./server');
var ds = server.dataSources.mysql;
var lbTables = [];
// var lbTables = ['user', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
lbTables = ['shop', 'lease', 'sublease'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
