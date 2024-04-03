import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
// import { Like } from "./like-post.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    createdAt: Date;
    
    @Column()
    userName: string;
    @Column()
    userId: number;

    @Column()
    @Column('json')
    // list of images and videos uploaded by the user(just the URL)
    data: string[];

    @ManyToOne(() => User, user => user.posts)
    user: User;
  
    @ManyToMany(() => User, user => user.likedPosts)
    likedBy: User[];

    @BeforeInsert()
    initLikedBy() {
        if (!this.likedBy) {
            this.likedBy = [];
        }
    }

}