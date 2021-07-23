import React from 'react'
import { NoteDto } from '../note'

export default function Card({
    note,
    setIsContent,
}: {
    note: NoteDto
    setIsContent: React.Dispatch<React.SetStateAction<NoteDto | null>>
}) {
    return (
        <>
            <div
                className="card"
                onClick={() => setIsContent(note)}
                style={{ cursor: 'pointer' }}
            >
                <header className="card-header">
                    <p className="card-header-title">{note.title}</p>
                    <p style={{ margin: 10 }}>
                        {note &&
                            note.tags.map((row) => (
                                <small>
                                    <a href={`#${row.tag}`}>#{row.tag}</a>&nbsp;
                                </small>
                            ))}
                    </p>
                    <br />
                    <p style={{ margin: 10 }}>{note.modifiedAt.slice(0, 10)}</p>
                </header>
            </div>
        </>
    )
}
