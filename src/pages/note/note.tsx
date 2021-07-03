import React, { useEffect, useState } from 'react'
import Card from './components/Card'

const tempTagList = ['JAVASCRIPT', 'JAVA', 'REACT']

export default function Note() {
    const [tagList, setTagList] = useState<string[]>([])

    useEffect(() => {
        setTagList(tempTagList)
    }, [])

    return (
        <div>
            <div className="columns">
                <div className="column">
                    <nav
                        className="breadcrumb is-medium ml-4"
                        aria-label="breadcrumbs"
                    >
                        <ul>
                            <li>
                                <a href="#total">TOTAL &nbsp;</a>
                            </li>
                            {tagList.map((tag) => (
                                <li>
                                    <a href={`#${tag}`}>{tag} &nbsp;</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="column is-1">
                    <button className="button is-primary is-rounded">
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
