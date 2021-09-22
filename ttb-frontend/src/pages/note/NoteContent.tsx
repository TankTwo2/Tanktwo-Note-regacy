import React, { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { NoteDto } from './note'
import cFetch from '../../shared/fetch'

export default function NoteContent(
    props: RouteComponentProps<{ id?: string }>
) {
    const [noteData, setNoteData] = useState<NoteDto>({} as NoteDto)

    const getNoteListCB = useCallback(getNoteList, [props.match.params.id])
    async function getNoteList() {
        setNoteData(
            await cFetch(
                'GET',
                `note/number?id=${props.match.params.id}`,
                undefined,
                false
            )
        )
    }

    useEffect(() => {
        getNoteListCB()
    }, [getNoteListCB])

    useEffect(() => {
        document.getElementsByClassName('inner-html')[0].innerHTML =
            noteData.content
    }, [noteData])

    return (
        // <NoteMenu>
        <div>
            <div className="header">{noteData.title}</div>
            <div className="inner-html" />
        </div>
        // </NoteMenu>
    )
}
