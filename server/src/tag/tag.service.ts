import { Inject, Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject('TAG_REPOSITORY')
    private TagsRepository: typeof Tag,
  ) {}
  async create(createTagInput: CreateTagInput): Promise<Tag> {
    return await this.TagsRepository.create({
      ...createTagInput,
    });
  }

  async findAll(): Promise<Tag[]> {
    return await this.TagsRepository.findAll<Tag>({ raw: true });
  }

  async filterBy(search: any): Promise<Tag[]> {
    return await this.TagsRepository.findAll({
      where: search,
      raw: true,
    });
  }

  async findOne(search: any): Promise<Tag> {
    const tag = await this.TagsRepository.findOne<Tag>({
      where: { id: search },
    });
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  }

  async findEmail(email: string): Promise<Tag> {
    const tag = await this.TagsRepository.findOne<Tag>({
      where: { email: email },
    });
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  }

  async update(id: string, data: UpdateTagInput): Promise<Tag> {
    const Tag = await this.TagsRepository.findOne({
      where: { id: id },
    });
    if (!Tag) {
      throw new Error('Tag not found');
    }
    await Tag.update({ ...data });
    await Tag.save();
    return Tag;
  }

  async remove(id: string): Promise<Tag> {
    const Tag = await this.TagsRepository.findOne<Tag>({
      where: { id: id },
    });
    if (!Tag) {
      throw new Error('Tag not found');
    }
    await Tag.destroy();
    return Tag;
  }
}
