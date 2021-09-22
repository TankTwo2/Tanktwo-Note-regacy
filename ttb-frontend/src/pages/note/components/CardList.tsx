import React, { useCallback, useEffect, useState } from 'react'
import cFetch from '../../../shared/fetch'
import { NoteDto } from '../note'
import Card from './Card'

export default function CardList({
    currentTag,
    setCurrentTag,
}: {
    currentTag: string
    setCurrentTag: React.Dispatch<React.SetStateAction<string>>
}) {
    const [noteList, setNoteList] = useState<NoteDto[]>([])

    const getNoteListCB = useCallback(getNoteList, [])
    async function getNoteList() {
        setNoteList(await cFetch('GET', 'note', undefined, false))
    }

    useEffect(() => {
        getNoteListCB()
    }, [getNoteListCB])

    if (!noteList || noteList.length === 0) <div />

    return (
        <>
            {(currentTag === 'TOTAL'
                ? noteList
                : noteList.filter(
                      (row) =>
                          row.tags.filter((r) => r.tag === currentTag).length >
                          0
                  )
            ).map((row) => (
                <div
                    style={{
                        margin: '20px auto',
                        width: '70%',
                    }}
                    key={row.postNumber}
                >
                    <Card
                        note={row}
                        currentTag={currentTag}
                        setCurrentTag={setCurrentTag}
                    />
                </div>
            ))}
        </>
    )
}
