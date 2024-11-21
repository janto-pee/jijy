import { Inject, Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAGS_REPOSITORY')
    private TagsRepository: typeof Tag,
  ) {}
  async create(createTagInput: CreateTagInput): Promise<Tag> {
    return await this.TagsRepository.create({
      ...createTagInput,
    });
  }

  async findAll(): Promise<Tag[]> {
    return await this.TagsRepository.findAll<Tag>();
  }

  async findOne(id: number): Promise<Tag> {
    return await this.TagsRepository.findOne<Tag>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Tag> {
    return await this.TagsRepository.findOne<Tag>({
      where: { email: email },
    });
  }

  async update(id: number, data: UpdateTagInput): Promise<Tag> {
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

  async remove(id: number): Promise<Tag> {
    const Tag = await this.TagsRepository.findOne<Tag>({
      where: { id: id },
    });
    await Tag.destroy();
    return Tag;
  }
}
