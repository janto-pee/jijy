import { Inject, Injectable } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private ImagesRepository: typeof Image,
  ) {}
  async create(createImageInput: CreateImageInput): Promise<Image> {
    return await this.ImagesRepository.create({
      ...createImageInput,
    });
  }

  async findAll(): Promise<Image[]> {
    const images = await this.ImagesRepository.findAll<Image>({ raw: true });
    return images;
  }

  async findOne(search: any): Promise<Image> {
    const image = await this.ImagesRepository.findOne<Image>({
      where: search,
    });
    if (!image) {
      throw new Error();
    }
    return image;
  }

  async filterBy(search: any): Promise<Image[]> {
    return await this.ImagesRepository.findAll({
      where: search,
      raw: true,
    });
  }

  async findEmail(email: string): Promise<Image> {
    const image = await this.ImagesRepository.findOne<Image>({
      where: { email: email },
    });
    if (!image) {
      throw new Error();
    }
    return image;
  }

  async update(id: string, data: UpdateImageInput): Promise<Image> {
    const Image = await this.ImagesRepository.findOne({
      where: { id: id },
    });
    if (!Image) {
      throw new Error('Image not found');
    }
    await Image.update({ ...data });
    await Image.save();
    return Image;
  }

  async remove(id: string): Promise<Image> {
    const image = await this.ImagesRepository.findOne<Image>({
      where: { id: id },
    });
    if (!image) {
      throw new Error();
    }
    await image.destroy();
    return image;
  }
}
