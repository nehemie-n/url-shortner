import { Module } from '@nestjs/common';
import { LinksModule } from './links/./mongoose.exception.filter
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Environment variables load
    // Root mongoDb
    MongooseModule.forRoot(process.env.MONGO_DB),
    LinksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
