import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { readFileSync, writeFileSync } from 'fs';
import { Comment, Data } from './interfaces/comment.interface';
import { join } from 'path';

@Injectable()
export class CommentsService {

  public pc = process.cwd(); // necessary to can read and write with fs
  public url: string = join( this.pc, '/src/comments/database/comments.json');

  public comments: Comment[] = [];

  create(createCommentDto: CreateCommentDto): Comment[] {
    this.comments = this.findAll();
    this.comments.unshift(createCommentDto);
    const payload = { comments: this.comments  };
    writeFileSync(this.url, JSON.stringify(payload));
    return this.findAll();
  }

  findAll(): Comment[] {
    const test = readFileSync( this.url, { encoding: 'utf-8'});
    const data: Data = JSON.parse(test);
    return data.comments;
  }
}
