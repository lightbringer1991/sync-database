class BaseModule {
  /**
   * @param {Object} fromConfig configuration of the database to sync data from
   * @param toConfigs configurations of the databases to receive data, they all need to be in the same database type
   */
  constructor(fromConfig, toConfigs = []) {
    if (new.target === BaseModule) {
      throw new Error("Cannot construct BaseModule instances directly");
    }

    this.fromConfig = fromConfig;
    this.toConfigs = toConfigs;
  }

  async testConnection() {
    throw new Error('This function is not implemented.');
  }
}

module.exports = BaseModule;
