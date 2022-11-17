import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LinksModule } from './links/links.module';

@Module({
  imports: [
    // Environment variables load
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV.trim().toLowerCase() == 'dev'
          ? 'dev.env'
          : 'prod.env',
    }),
    // Root mongoDb
    MongooseModule.forRoot(process.env.MONGO_DB),
    LinksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
