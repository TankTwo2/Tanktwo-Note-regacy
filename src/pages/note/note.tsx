import React, { useCallback, useEffect, useState } from 'react'
import cFetch from '../../shared/fetch'
import Card from './components/Card'
import WriteNote from './components/WriteNote'

export interface NoteDto {
    content: string
    createdAt: string
    modifiedAt: string
    postNumber: number
    tags: { id: string; tag: string }[]
    title: string
}

export default function Note() {
    const [tagList, setTagList] = useState<string[]>([])
    const [noteList, setNoteList] = useState<NoteDto[]>([])
    const [openWrite, setOpenWrite] = useState<boolean>(false)

    const getNoteListCB = useCallback(getNoteList, [])
    const getTagListCB = useCallback(getTagList, [])

    async function getNoteList() {
        setNoteList(await cFetch('GET', 'note', undefined, false))
    }

    async function getTagList() {
        setTagList(
            (await cFetch('GET', 'note/tagList', undefined, false)).slice(
                undefined,
                5
            )
        )
    }

    useEffect(() => {
        getNoteListCB()
        getTagListCB()
    }, [getNoteListCB, getTagListCB])

    return (
        <div>
            <WriteNote isActive={openWrite} setIsActive={setOpenWrite} />
            <div className="columns">
                <div className="column">
                    <nav
                        className="breadcrumb is-medium ml-4"
                        aria-label="breadcrumbs"
                    >
                        <ul>
                            <li key="total">
                                <a href="#total">TOTAL</a>
                            </li>
                            {tagList.map((tag, i) => (
                                <li key={i}>
                                    <a href={`#${tag}`}>{tag}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="column is-1">
                    <button
                        className="button is-primary is-rounded"
                        onClick={() => setOpenWrite(!openWrite)}
                    >
                        WRITE
                    </button>
                </div>
            </div>
            <div className="container">
                {noteList.map((row) => (
                    <div style={{ margin: '20px auto', width: '50%' }}>
                        <Card noteList={row} />
                    </div>
                ))}
            </div>
        </div>
    )
}
