import React, { useState, useCallback, useEffect } from 'react'
import cFetch from '../../../shared/fetch'
import WriteNote from './WriteNote'
import { NoteDto } from '../note'

interface TagDto {
    tag: string
    count: string
}

export default function NoteMenu({
    children,
    currentTag,
    setCurrentTag,
}: {
    children: any
    currentTag: string
    setCurrentTag: React.Dispatch<React.SetStateAction<string>>
}) {
    const [tagList, setTagList] = useState<TagDto[]>([])
    const [openWrite, setOpenWrite] = useState<boolean>(false)

    const getTagListCB = useCallback(getTagList, [])

    async function getTagList() {
        const tist = (
            await cFetch('GET', 'note/tagList', undefined, false)
        ).slice(undefined, 5)
        setTagList(tist)
    }

    useEffect(() => {
        getTagListCB()
    }, [getTagListCB])

    function handleCurrentChange(type: string) {
        setCurrentTag(type)
    }

    return (
        <div>
            <WriteNote isActive={openWrite} setIsActive={setOpenWrite} />
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
                                        onClick={() => {
                                            handleCurrentChange('TOTAL')
                                        }}
                                    >
                                        TOTAL
                                    </a>
                                </li>
                                {tagList.map((tag, i) => (
                                    <li key={i}>
                                        <a
                                            href={`#${tag.tag}`}
                                            style={{
                                                color:
                                                    currentTag === tag.tag
                                                        ? '#00d2b4'
                                                        : 'black',
                                                cursor: 'pointer',
                                                padding: '2px 15px 2px 15px',
                                            }}
                                            onClick={() => {
                                                handleCurrentChange(tag.tag)
                                            }}
                                        >
                                            {`${tag.tag} (${tag.count})`}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <p className="menu-label">Administration</p>
                            <ul className="menu-list">
                                <li>
                                    <a
                                        href={'#write'}
                                        onClick={() => setOpenWrite(true)}
                                    >
                                        Write Note
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column">{children}</div>
                </div>
            </div>
        </div>
    )
}
