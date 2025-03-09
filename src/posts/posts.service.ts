import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOneBy({ id });
  }

  async update(id: number, title: string, body: string) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) return null;
    post.title = title;
    post.body = body;
    return this.postsRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) return null;
    return this.postsRepository.remove(post);
  }
}

export { PostsService };
