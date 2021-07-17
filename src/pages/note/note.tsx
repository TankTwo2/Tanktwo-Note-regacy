import React, { useCallback, useEffect, useState } from 'react'
import { baseUrl } from '../../shared/App'
import Card from './components/Card'
import WriteNote from './components/WriteNote'

const tempTagList = ['JAVASCRIPT', 'JAVA', 'REACT']

export default function Note() {
    const [tagList, setTagList] = useState<string[]>([])
    const [openWrite, setOpenWrite] = useState<boolean>(false)

    

    const getNoteListCB = useCallback(getNoteList, [])

    async function getNoteList() {
        fetch(baseUrl + 'note')
    }

    useEffect(() => {
        setTagList(tempTagList)
        getNoteListCB()
    }, [getNoteListCB])

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
                            <li>
                                <a href="#total">TOTAL</a>
                            </li>
                            {tagList.map((tag) => (
                                <li>
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
                <div className="columns">
                    <div className="column">
                        <Card />
                    </div>
                    <div className="column">
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    )
}
