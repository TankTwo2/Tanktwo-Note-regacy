import React, { useEffect } from 'react'
import { NoteDto } from '../note'

export default function NoteContent({ note }: { note: NoteDto }) {
    useEffect(() => {
        document.getElementsByClassName('inner-html')[0].innerHTML =
            note.content
    }, [note])

    return (
        <div>
            <div className="header">{note.title}</div>
            <div className="inner-html">1</div>
        </div>
    )
}
