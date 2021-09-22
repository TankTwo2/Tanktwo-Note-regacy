import {
  Column,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NoteTag } from './note-tag.entity';

@Entity({ name: 'ttb_note_data' })
export class Note {
  @PrimaryGeneratedColumn()
  postNumber: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => NoteTag, (noteTag) => noteTag.seq, { cascade: true })
  tags: NoteTag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
