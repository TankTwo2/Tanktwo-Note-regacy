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
    const [currentTag, setCurrentTag] = useState<string>('TOTAL')

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

    function handleCurrentChange(type: string) {
        setCurrentTag(type)
    }

    return (
        <div>
            <WriteNote isActive={openWrite} setIsActive={setOpenWrite} />

            {/* <div className="columns">
                <div className="column">
                    <nav
                        className="breadcrumb is-medium ml-4"
                        aria-label="breadcrumbs"
                    >
                        <ul>
                            <li key="total">
                                <span
                                    style={{
                                        color:
                                            currentTag === 'TOTAL'
                                                ? '#00d2b4'
                                                : 'black',
                                        cursor: 'pointer',
                                        padding: '0px 15px 0px 15px',
                                    }}
                                    onClick={() => handleCurrentChange('TOTAL')}
                                >
                                    TOTAL
                                </span>
                            </li>
                            {tagList.map((tag, i) => (
                                <li key={i}>
                                    <span
                                        style={{
                                            color:
                                                currentTag === tag
                                                    ? '#00d2b4'
                                                    : 'black',
                                            cursor: 'pointer',
                                            padding: '0px 15px 0px 15px',
                                        }}
                                        onClick={() => handleCurrentChange(tag)}
                                    >
                                        {tag}
                                    </span>
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
            </div> */}
            <div className="container">
                <div className="columns">
                    <div className="column is-2">
                        <aside className="menu">
                            <p className="menu-label">Tag</p>
                            <ul className="menu-list">
                                <li>
                                    <a
                                        href={`#TOTAL`}
                                        style={{
                                            color:
                                                currentTag === 'TOTAL'
                                                    ? '#00d2b4'
                                                    : 'black',
                                            cursor: 'pointer',
                                            padding: '2px 15px 2px 15px',
                                        }}
                                        onClick={() =>
                                            handleCurrentChange('TOTAL')
                                        }
                                    >
                                        TOTAL
                                    </a>
                                </li>
                                {tagList.map((tag, i) => (
                                    <li key={i}>
                                        <a
                                            href={`#${tag}`}
                                            style={{
                                                color:
                                                    currentTag === tag
                                                        ? '#00d2b4'
                                                        : 'black',
                                                cursor: 'pointer',
                                                padding: '2px 15px 2px 15px',
                                            }}
                                            onClick={() =>
                                                handleCurrentChange(tag)
                                            }
                                        >
                                            {tag}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                    <div className="column">
                        {(currentTag === 'TOTAL'
                            ? noteList
                            : noteList.filter(
                                  (row) =>
                                      row.tags.filter(
                                          (r) => r.tag === currentTag
                                      ).length > 0
                              )
                        ).map((row) => (
                            <div
                                style={{
                                    margin: '20px auto',
                                    width: '70%',
                                }}
                            >
                                <Card noteList={row} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
