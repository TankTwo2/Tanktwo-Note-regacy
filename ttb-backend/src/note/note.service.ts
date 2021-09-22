import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entity/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  getNote(id: number): Promise<Note> {
    return this.noteRepository.findOne({ postNumber: id });
  }

  getNotes(): Promise<Note[]> {
    return this.noteRepository.find({ relations: ['tags'] });
  }

  getLastNote(): Promise<Note> {
    return this.noteRepository.query(
      'select max(postNumber) from ttb_note_data',
    );
  }

  async writeNote(writeData) {
    await this.noteRepository.save(writeData);
  }

  async editNote(editData) {
    await this.noteRepository.save(editData);
  }

  async delNote(postNumber) {
    await this.noteRepository.remove(postNumber);
  }
}
