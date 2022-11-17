import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinkDocument } from './entities/link.entity';
import { LinksService } from './links.service';
import { nanoid } from 'nanoid';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  /**
   * This saves a certain link with a certain shortcode
   * @param createLinkDto
   * @returns
   */
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  /**
   * This generates a shortcode just like that
   * @param id
   * @returns
   */
  @Get()
  generate(): Promise<string> {
    return this.linksService.generate();
  }

  /**
   * Retrieves a link based on a certain shortcode and fires error if not any
   * @param id
   * @returns
   */
  @Get(':code')
  findOne(@Param('code') code: string): Promise<LinkDocument> {
    return this.linksService.findOne(code);
  }
}
