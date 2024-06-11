const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

async function connect() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { dbName: "userTest" });
    console.log(`MongoDb successful connected to ${mongoUri}`);
  }

  module.exports = connect