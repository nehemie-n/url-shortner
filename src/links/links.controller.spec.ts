import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMemoryMongodConnection,
  MemoryMongooseTestModule,
} from '../test';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './entities/link.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
describe('LinksController', () => {
  let controller: LinksController;
  let linkService: LinksService;
  let linksModule: TestingModule;

  beforeEach(async () => {
    /**
     * Module init
     */
    const linksModule: TestingModule = await Test.createTestingModule({
      imports: [
        MemoryMongooseTestModule(),
        MongooseModule.forFeature([
          // Declare the link schema (collection)
          {
            schema: LinkSchema,
            name: Link.name,
          },
        ]),
        ConfigModule.forRoot({
          envFilePath:
            process.env.NODE_ENV.trim().toLowerCase() == 'dev'
              ? 'dev.env'
              : 'prod.env',
        }),
      ],
      controllers: [LinksController],
      providers: [LinksService],
    }).compile();

    /**
     * Assigning test files
     */
    controller = linksModule.get<LinksController>(LinksController);
    linkService = linksModule.get<LinksService>(LinksService);
  });

  /**
   * Close all mongo in-memory connections
   */
  afterAll(async () => {
    closeInMemoryMongodConnection();
  });

  /**
   * Service and controller be defined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(linkService).toBeDefined();
  });

  /**
   * Shoud Generate
   */
  describe('generate', () => {
    it('should generate', async () => {
      let str = await linkService.generate();
      expect(str).toBeDefined();
      expect(str.length).toBeGreaterThan(0);
    });
    it('should regenerate when link exists', async () => {}); // How do we test this? @todo @improve
  });
  /**
   * Shoud create
   */
  describe('create', () => {
    const createDto = {
      code: 'FB',
      link: 'https://facebook.com',
    };
    it('should create', async () => {
      const saved = await linkService.create(createDto);
      expect(createDto.code).toBe(saved.code);
      expect(createDto.link).toBe(saved.link);
      // Error on duplicate
    });
    it('should throw error when duplicate', async () => {
      const createDto = {
        code: 'FBA',
        link: 'https://facebook.com',
      };
      await linkService.create(createDto);
      await expect(linkService.create(createDto)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });
  /**
   * Shoud fetch
   */
  describe('fetch', () => {
    it('should findone', async () => {
      const createDto = {
        code: 'GOO',
        link: 'https://google.com',
      };
      const saved = await linkService.create(createDto);
      const fetched = await linkService.findOne(saved.code);
      expect(createDto.code).toBe(fetched.code);
      expect(createDto.link).toBe(fetched.link);
    });
    it('should throw error when not found', async () => {
      await expect(linkService.findOne('NEW_CODE_')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
