import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentObj, Data } from './interfaces/comment.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Data> {

    const { text, author } = createCommentDto;

    try {
      
      const createdComment = this.commentRepository.create({
        comment: text,
        user: author
      })
      await this.commentRepository.save(createdComment);
      return await this.findAll();

    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Data> { 

    try {

      const comments = await this.commentRepository.createQueryBuilder('c')
        .where({})
        .orderBy('c.id', 'DESC')
        .getMany();

      let arrComments: CommentObj[] = [];

      comments.forEach( comment => {
        arrComments.push({
          text: comment.comment,
          author: comment.user
        })
      });

      return {
        comments: arrComments
      }
      
    } catch (error) {
      console.log(error);
    }
    

  }
}
