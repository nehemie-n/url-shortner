import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { customAlphabet } from 'nanoid';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link, LinkDocument, LinkModel } from './entities/link.entity';
const nanoid = customAlphabet(
  'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-',
);
@Injectable()
export class LinksService {
  /**
   *
   * @param linkModel
   */
  constructor(@InjectModel(Link.name) private linkModel: LinkModel) {}

  /**
   *
   * @param createLinkDto
   * @returns
   */
  create(createLinkDto: CreateLinkDto) {
    return this.linkModel.create(createLinkDto);
  }

  /**
   *
   * @returns
   */
  async generate(): Promise<string> {
    let length = 4;
    let code;
    // We start by 4 chars
    while (true) {
      code = nanoid(length);
      let found = await this.fetchCode(code);
      if (found !== undefined && found !== null) {
        length++; // Increase length to increase the odds of generating a code that doesn't exist
      } else {
        break; // if not found just break the loop;
      }
      return code;
    }
  }

  /**
   * Can serve verfication purpose or fetch purpose
   * @param code
   * @returns
   */
  findOne(code: string): Promise<LinkDocument> {
    return this.fetchCode(code).then((rep) => {
      if (!rep) {
        throw new NotFoundException("Code doesn't exist.");
      }
      return rep;
    });
  }

  /**
   *
   * @param code
   * @returns
   */
  private fetchCode(code: string) {
    if (!code || code.trim().length === 0) {
      throw new ForbiddenException("Code can't be 0 length");
    }
    return this.linkModel
      .findOne({
        code: code,
      })
      .exec();
  }
}
