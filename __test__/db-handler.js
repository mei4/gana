const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
    const uri = await mongod.getConnectionString();

    await mongoose.connect(uri, {
        'useNewUrlParser': true,
        'useUnifiedTopology': true,
        'useFindAndModify': false,
        'useCreateIndex': true
    }); 
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports.addData = async (...items) => {
    for (const item of items) {
        await item.save()
    }
}