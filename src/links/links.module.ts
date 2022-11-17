import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './entities/link.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      // Declare the link schema (collection)
      {
        schema: LinkSchema,
        name: Link.name,
      },
    ]),
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
