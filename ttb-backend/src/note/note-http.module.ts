import { Module } from '@nestjs/common';
import { NoteModule } from './ note.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [NoteModule],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteHttpModule {}
