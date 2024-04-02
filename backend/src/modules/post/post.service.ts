import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private userService: UserService,
      ) {}

    async createPost(postDto:CreatePostDto): Promise<Post> {
        const user = await this.userService.findOne(postDto.userId);
        if (!user) {
          throw new Error('User not found');
        }
        const post:Post = this.postRepository.create(postDto);
        post.user = user; 
        return this.postRepository.save(post);
    }

    async findOne(id: number): Promise<Post> {
        const post= await this.postRepository.findOne({ where: {id}} );
        return post;
    }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find({
            relations:{
                user: true,
                likedBy: true
            },
            order: { createdAt: 'DESC' },
        });
    }


    async addLike(postId: number, userId: number): Promise<Post> {
      const post = await this.postRepository.findOne({ where: { id: postId },relations: ['user', 'likedBy']});
      const user = await this.userService.findOne(userId);

      if (!post || !user) {
        throw new Error('Post or user not found');
      }

      if (post.likedBy.some(u => u.id === user.id)) {
        throw new Error('User has already liked this post');
      }
      
      // await this.userService.update(user.id, user);
      // await this.postRepository.save(post);
      await this.postRepository.manager.transaction(async transactionalEntityManager => {
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(Post, 'likedBy')
          .of(post)
          .add(user);
      });

      return post;
    }
    
    async removeLike(postId: number, userId: number): Promise<Post> {
      const post = await this.postRepository.findOne({ where: { id: postId },relations: ['user', 'likedBy']});
      const user = await this.userService.findOne(userId);
  
      if (!post || !user) {
        throw new Error('Post or user not found');
      }
  
      if (!post.likedBy.some(u => u.id === user.id)) {
        throw new Error('User has not liked this post');
      }

      await this.postRepository.manager.transaction(async transactionalEntityManager => {
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(Post, 'likedBy')
          .of(post)
          .remove(user);
      });
      return post;
    }


}
