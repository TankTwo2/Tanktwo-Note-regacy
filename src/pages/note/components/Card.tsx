import React from 'react'
import { NoteDto } from '../note'

export default function Card({ noteList }: { noteList: NoteDto }) {
    return (
        <>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{noteList.title}</p>
                </header>
                <div className="card-content">
                    <div className="content">{noteList.content}</div>
                </div>
            </div>
        </>
    )
}
