import React, { useState } from 'react'
import NoteMenu from './components/NoteMenu'
import CardList from './components/CardList'

export interface NoteDto {
    content: string
    createdAt: string
    modifiedAt: string
    postNumber: number
    tags: { id: string; tag: string }[]
    title: string
}

const NoteContext = React.createContext({})

export default function Note() {
    const [currentTag, setCurrentTag] = useState<string>('TOTAL')

    return (
        <NoteContext.Provider value={{ currentTag, setCurrentTag }}>
            <NoteMenu currentTag={currentTag} setCurrentTag={setCurrentTag}>
                <CardList
                    currentTag={currentTag}
                    setCurrentTag={setCurrentTag}
                />
            </NoteMenu>
        </NoteContext.Provider>
    )
}
