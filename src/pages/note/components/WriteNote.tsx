import React, { Dispatch, SetStateAction, useState } from 'react'

interface NoteDataInterFace {
    title: string
    tag: string
    content: string
}

export default function WriteNote({
    isActive,
    setIsActive,
}: {
    isActive: boolean
    setIsActive: Dispatch<SetStateAction<boolean>>
}) {
    const [password, setPassword] = useState<string>('')
    const [noteData, setNoteData] = useState<NoteDataInterFace>(
        {} as NoteDataInterFace
    )

    function onActiveControl() {
        setIsActive(!isActive)
    }

    function onHandleNoteData(dataType: string, value: string) {
        setNoteData({
            ...noteData,
            [dataType]: value,
        })
    }

    async function onSubmitNoteData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const res = await fetch(
            'https://tanktwo.synology.me:5001/ttb/note/write',
            {
                method: 'POST',
                body: JSON.stringify(noteData),
            }
        )
        if (res.status >= 400) {
            alert(`error : ${res.status}`)
        } else {
            alert(`succcess`)
        }
    }

    return (
        <>
            <form
                className={`modal ${isActive && 'is-active'}`}
                onSubmit={onSubmitNoteData}
            >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            <input
                                className="input"
                                placeholder="Modal title"
                                style={{ width: '95%' }}
                                value={noteData.title}
                                onChange={(e) =>
                                    onHandleNoteData('title', e.target.value)
                                }
                            />
                        </p>
                        <button
                            className="delete"
                            aria-label="close"
                            type="button"
                            onClick={onActiveControl}
                        ></button>
                    </header>
                    <section className="modal-card-body">Content</section>
                    <footer className="modal-card-foot">
                        <input
                            className="input is-warning mr-3"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="button is-success"
                            disabled={password !== 'notepw'}
                            type="submit"
                        >
                            Save
                        </button>
                        <button
                            className="button"
                            type="button"
                            onClick={onActiveControl}
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </form>
        </>
    )
}
