import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Resolver('Tag')
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation('createTag')
  async create(@Args('createTagInput') createTagInput: CreateTagInput) {
    return await this.tagsService.create(createTagInput);
  }

  @Query('tags')
  async findAll() {
    return await this.tagsService.findAll();
  }

  @Query('tag')
  async findOne(@Args('id') id: number) {
    return await this.tagsService.findOne(id);
  }

  @Mutation('updateTag')
  async update(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return await this.tagsService.update(updateTagInput.id, updateTagInput);
  }

  @Mutation('removeTag')
  async remove(@Args('id') id: number) {
    return await this.tagsService.remove(id);
  }
}
