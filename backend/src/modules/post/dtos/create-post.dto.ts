import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { File } from 'multer';

export class CreatePostDto {
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    @IsDate()
    // transform the string to a date
    @Transform(({ value }) => new Date(value))
    createdAt: string;
    // list of images and videos as files 
    data: File[];

}