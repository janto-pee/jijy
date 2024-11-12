import { Inject, Injectable } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGES_REPOSITORY')
    private ImagesRepository: typeof Image,
  ) {}
  async create(createImageInput: CreateImageInput): Promise<Image> {
    return await this.ImagesRepository.create({
      ...createImageInput,
    });
  }

  async findAll(): Promise<Image[]> {
    return await this.ImagesRepository.findAll<Image>();
  }

  async findOne(id: number): Promise<Image> {
    return await this.ImagesRepository.findOne<Image>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Image> {
    return await this.ImagesRepository.findOne<Image>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdateImageInput): Promise<Image> {
    const Image = await this.ImagesRepository.findOne({
      where: { ...where },
    });
    await Image.update({ ...data });
    await Image.save();
    return Image;
  }

  async remove(id: number): Promise<Image> {
    return await this.ImagesRepository.findOne<Image>({
      where: { id: id },
    });
  }
}
