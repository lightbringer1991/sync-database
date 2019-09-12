/**
 * takes in a connection string and return the connection configuration
 * e.g. mysql://<username>:<password>@<host>:<port>/<database>
 *
 * @param {string} connStr
 */
const connectionStringToConfig = (connStr) => {
  const result = connStr.match(/^(\S+):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.*)$/);
  if (result) {
    return {
      host: result[4],
      port: result[5],
      user: result[2],
      password: result[3],
      database: result[6],
    };
  }

  throw new Error('Invalid connection string');
};

module.exports = { connectionStringToConfig };
