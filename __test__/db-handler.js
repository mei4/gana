const mongoose = require('mongoose');
const Product = require('../src/product/product-model')
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
    const uri = await mongod.getConnectionString();

    await mongoose.connect(uri, {
        "useNewUrlParser": true,
        "useUnifiedTopology": true
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

module.exports.addData = async (...products) => {
    // const apple = new Product( { name: 'test-apple' } );
    // const cheese = new Product( { name: 'test-cheese' } );

    // await apple.save()
    // await cheese.save()

    for (const product of products) {
        await product.save()
    }
}