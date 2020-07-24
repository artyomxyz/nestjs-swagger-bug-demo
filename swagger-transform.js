const swaggerPlugin = require('@nestjs/swagger/plugin');
module.exports = (prog, config) => swaggerPlugin.before(config, prog);
