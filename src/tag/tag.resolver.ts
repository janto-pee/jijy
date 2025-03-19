import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly TagService: TagService) {}

  @Mutation(() => Tag)
  async createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return (await this.TagService.create(createTagInput)).dataValues;
  }

  @Query(() => [Tag], { name: 'Tags' })
  async findAll() {
    return await this.TagService.findAll();
  }

  @Query(() => Tag, { name: 'Tag' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return (await this.TagService.findOne(id)).dataValues;
  }

  @Mutation(() => Tag)
  async updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return (await this.TagService.update(updateTagInput.id, updateTagInput))
      .dataValues;
  }

  @Mutation(() => Tag)
  async removeTag(@Args('id', { type: () => String }) id: string) {
    return (await this.TagService.remove(id)).dataValues;
  }
}
