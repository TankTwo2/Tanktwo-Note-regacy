import React from 'react'
import { Link } from 'react-router-dom'
import { NoteDto } from '../note'

export default function Card({
    note,
    currentTag,
    setCurrentTag,
}: {
    note: NoteDto
    currentTag: string
    setCurrentTag: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <>
            <Link
                className="card"
                to={{
                    pathname: `/ttb_frontend/noteContent/${note.postNumber}`,
                    state: note,
                }}
                style={{ cursor: 'pointer' }}
            >
                <header className="card-header">
                    <p className="card-header-title">{note.title}</p>
                    <p style={{ margin: 10 }}>
                        {note &&
                            note.tags.map((row) => (
                                <small key={row.id}>
                                    <a href={`#${row.tag}`}>#{row.tag}</a>&nbsp;
                                </small>
                            ))}
                    </p>
                    <br />
                    <p style={{ margin: 10 }}>{note.modifiedAt.slice(0, 10)}</p>
                </header>
            </Link>
        </>
    )
}
