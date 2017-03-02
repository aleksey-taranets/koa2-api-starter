const package = require('../package.json');

module.exports = {
    "Api": {
        "name": package.name,
        "version": "v1",
        "port": process.env.PORT || 3000
    }
}