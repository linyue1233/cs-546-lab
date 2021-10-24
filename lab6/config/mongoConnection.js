const mongoClient = require("mongodb").MongoClient;
const mongoSetting = require("./setting.json");
const mongoConfig = mongoSetting.mongoConfig;

let _connection = null;
let _db = null;

module.exports = async () => {
    if (!_connection) {
        _connection = await mongoClient.connect(mongoConfig.serverUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        _db = await _connection.db(mongoConfig.database);
    }
    return _db;
}