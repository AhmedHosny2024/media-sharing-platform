import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
// import { Like } from 'src/entities/like-post.entity';
// import { Post } from 'src/entities/post.entity';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

  async create(createUserDto: CreateUserDTO) {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    const existingPhone = await this.userRepository.findOne({
      where: { phone: createUserDto.phone },
    });

    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    if (existingPhone) {
      throw new BadRequestException('phone already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    if(!newUser){
      throw new BadRequestException('User not created');
    }
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return this.userRepository.find({});
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
  async findByEmail(email: string, includePassword = false) {
    let query = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (includePassword) {
      query = query.addSelect('user.password');
    }

    return query.getOne();
  }
  async findByPhone(phone: string, includePassword = false) {
    let query = this.userRepository
      .createQueryBuilder('user')
      .where('user.phone = :phone', { phone });

    if (includePassword) {
      query = query.addSelect('user.password');
    }

    return query.getOne();
  }
    
  async update(id: number, updateUserDto: CreateUserDTO) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  // async likePost(userId: number, postId: number): Promise<Like> {
  //   const user = await this.userRepository.findOne({ where: { id:userId } });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   const post = await this.postRepository.findOne({ where: { id:postId } });
  //   if (!post) {
  //     throw new Error('Post not found');
  //   }

  //   const existingLike = await this.likeRepository.findOne({
  //     where: { user: { id: userId }, post: { id: postId } },
  //   });
  //   if (existingLike) {
  //     throw new Error('User already liked this post');
  //   }

  //   const like = new Like();
  //   like.user = user;
  //   like.post = post;
    
  //   return this.likeRepository.save(like);
  // }

  // async unlikePost(userId: number, postId: number): Promise<void> {
  //   const like = await this.likeRepository.findOne({
  //     where: { user: { id: userId }, post: { id: postId } },
  //   });

  //   if (!like) {
  //     throw new Error('Like not found');
  //   }

  //   await this.likeRepository.remove(like);
  // }
}
