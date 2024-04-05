import { encryptPassword } from '../shared/encryption.util';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;
  
  @Column({ unique: true })
  phone: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @ManyToMany(() => Post, post => post.likedBy)
  @JoinTable()
  likedPosts: Post[];

  // @OneToMany(() => Like, like => like.user)
  // likes: Like[];

  @BeforeInsert()
  initPosts() {
    if (!this.posts) {
      this.posts = [];
    }
  }
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await encryptPassword(this.password);
    }
  }
}