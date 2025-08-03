import {
  Controller,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import * as multer from 'multer';

@Controller('candidates')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  processCandidate(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
    @Body('surname') surname: string,
  ) {
    return this.appService.processCandidate(name, surname, file.buffer);
  }
}
