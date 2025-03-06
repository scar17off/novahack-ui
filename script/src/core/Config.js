class Config {
  constructor(windowName) {
    this.windowName = windowName;
    this.loadConfig();
  }

  loadConfig() {
    const savedConfig = localStorage.getItem(this.windowName);
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
    } else {
      this.config = {
        settings: {},
        configs: []
      };
      this.saveConfig();
    }
  }

  saveConfig() {
    localStorage.setItem(this.windowName, JSON.stringify(this.config));
  }

  setSetting(name, value) {
    this.config.settings[name] = value;
    this.saveConfig();
  }

  getSetting(name, defaultValue = null) {
    return this.config.settings[name] ?? defaultValue;
  }

  saveAsConfig(name) {
    const newConfig = {
      name,
      settings: { ...this.config.settings },
      timestamp: Date.now()
    };
    
    this.config.configs.push(newConfig);
    this.saveConfig();
  }

  loadSavedConfig(name) {
    const config = this.config.configs.find(c => c.name === name);
    if (config) {
      this.config.settings = { ...config.settings };
      this.saveConfig();
      return true;
    }
    return false;
  }

  deleteConfig(name) {
    this.config.configs = this.config.configs.filter(c => c.name !== name);
    this.saveConfig();
  }

  getAllConfigs() {
    return this.config.configs;
  }
}

export default Config; 