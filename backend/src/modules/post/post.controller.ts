import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post as PostEntity } from 'src/entities/post.entity';
import { LikePostDto } from './dtos/like-post.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.gurd';

@Controller('post')

export class PostController {
    constructor(private postService: PostService) {}

    @UseInterceptors(
        FilesInterceptor('data', 20, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
            const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        }),
    )

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    async uploadFiles(@UploadedFiles() files,@Query() postDto: CreatePostDto){
        const fileUrls = files.map(file => `${file.path}`);
        const post = await this.postService.createPost({
          userId: postDto.userId,
          createdAt: postDto.createdAt,
          data: fileUrls,
        });

        return { post };
    }

    @Get()
    findAll(): Promise<PostEntity[]> {
        return this.postService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/like')
    addLike(@Param('id') id: string, @Body() user: LikePostDto): Promise<PostEntity> {
        return this.postService.addLike(parseInt(id), user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/unlike')
    removeLike(@Param('id') id: string, @Body() user: LikePostDto): Promise<PostEntity> {
        return this.postService.removeLike(parseInt(id), user.userId);
    }
}
