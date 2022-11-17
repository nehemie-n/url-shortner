import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';
/**
 * connection
 */
let mongo: MongoMemoryServer;
/**
 * Memory connection
 * Good for inserting and auto deleting
 * @param options
 * @returns
 */
export const MemoryMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongo = await MongoMemoryServer.create();
      const mongoUri = mongo.getUri();
      return {
        uri: mongoUri,
        // useCreateIndex: true,
        ...options,
      };
    },
  });
export const closeInMemoryMongodConnection = async () => {
  await disconnect();
  if (mongo) await mongo.stop();
};
