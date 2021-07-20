import React from 'react'
import { NoteDto } from '../note'

export default function Card({ noteList }: { noteList: NoteDto }) {
    return (
        <>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{noteList.title}</p>
                    <p style={{ margin: 10 }}>
                        {noteList &&
                            noteList.tags.map((row) => (
                                <small>
                                    <a href={`#${row.tag}`}>#{row.tag}</a>&nbsp;
                                </small>
                            ))}
                    </p>
                    <br />
                    <p style={{ margin: 10 }}>
                        {noteList.modifiedAt.slice(0, 10)}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">{noteList.content}</div>
                </div>
            </div>
        </>
    )
}
