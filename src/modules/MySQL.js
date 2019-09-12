const mysqldump = require('mysqldump');
const mysqlImport = require('mysql-import');
const BaseModule = require('./BaseModule');


/**
 * @param {Object} config
 * @param {string} data
 * @return {Promise<*>}
 */
const restoreFromData = async (config, data) => {
  const buffer = Buffer.from(data, 'utf8');

  const importer = mysqlImport.config(config);

  return importer.import(buffer);
};

/**
 * config = {
 *   host: '',
 *   port: '',
 *   user: '',
 *   password: '',
 *   database: '',
 * }
 */
class MySQL extends BaseModule {
  constructor(fromConfig, toConfigs = []) {
    super(fromConfig, toConfigs);
  }

  sync() {
    return MySQL.sync(this.fromConfig, this.toConfigs);
  }

  static async sync(fromConfig, toConfigs) {
    const result = await mysqldump({ connection: fromConfig });

    const restorePromises = toConfigs.map((config) => restoreFromData(config, result.dump.data));

    return Promise.all(restorePromises);
  }
}

module.exports = MySQL;
