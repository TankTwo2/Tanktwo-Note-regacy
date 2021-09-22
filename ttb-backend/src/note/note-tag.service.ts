import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteTag } from 'src/entity/note-tag.entity';

@Injectable()
export class NoteTagService {
  constructor(
    @InjectRepository(NoteTag)
    private noteTagRepository: Repository<NoteTag>,
  ) {}

  getNotes(): Promise<NoteTag[]> {
    return this.noteTagRepository.find();
  }

  getTagList(): Promise<{ tag: string }[]> {
    return this.noteTagRepository
      .createQueryBuilder()
      .select('tag')
      .addSelect('COUNT(tag) as count')
      .groupBy('tag')
      .getRawMany();
  }

  async writeNoteTag(writeTagData) {
    writeTagData.tag.forEach((element) =>
      this.noteTagRepository.save({
        seq: writeTagData.postNumber,
        tag: element,
      }),
    );
  }

  async editNoteTag(editTagData) {
    const findData = await this.noteTagRepository.find({
      seq: editTagData.postNumber,
    });
    this.noteTagRepository.remove(findData);
    editTagData.tag.forEach((element) =>
      this.noteTagRepository.save({
        seq: editTagData.postNumber,
        tag: element,
      }),
    );
  }
}
