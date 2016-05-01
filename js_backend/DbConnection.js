var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'chinnnoo.xyz',
  port: 3366,
  user: 'articlex',
  password: 'dbproject',
  database: 'articlex'
});


module.exports = function(){
  return pool;
};
