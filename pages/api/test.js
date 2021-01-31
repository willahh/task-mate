const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.MYSQL_HOST,
    database : process.env.MYSQL_DATABASE,
    user     : process.env.MYSQL_USER,
    password : process.env.PASSWORD
  }
})
 
// Main handler function
exports.handler = async (event, context) => {
  // Run your query
  let results = await mysql.query('SELECT * FROM table')
 
  // Run clean up function
  await mysql.end()
 
  // Return the results
  return results
}

import mysql from 'serverless-mysql'

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
  }
});

const results = await context.db.query('SELECT "HELLO WORLD" as hello_world');
      await db.end();
      console.log('results', results);