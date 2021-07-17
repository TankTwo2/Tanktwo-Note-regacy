import React, { Dispatch, SetStateAction, useState } from 'react'
import MultiSelect from '../../../components/multi-select'
import { baseUrl } from '../../../shared/App'

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
    const [tagInputValue, setTagInputValue] = useState<string>('')

    function onActiveControl() {
        setIsActive(!isActive)
    }

    function onHandleNoteData(dataType: string, value: string) {
        setNoteData({
            ...noteData,
            [dataType]: value,
        })
    }

    async function onSubmitNoteData() {
        const res = await fetch(baseUrl + 'note', {
            method: 'POST',
            body: JSON.stringify(noteData),
        })
        if (res.status >= 400) {
            alert(`error : ${res.status}`)
        } else {
            alert(`succcess`)
        }
    }

    return (
        <>
            <div className={`modal ${isActive && 'is-active'}`}>
                <div
                    className="modal-background"
                    onClick={onActiveControl}
                ></div>
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
                    <section className="modal-card-body">
                        <div className="field is-horizontal">
                            Tags : &nbsp;
                            <div className="field-body">
                                <div className="field">
                                    <input
                                        className="input is-small"
                                        type="tags"
                                        placeholder="Add Tag"
                                        value={tagInputValue}
                                        onChange={(e) =>
                                            setTagInputValue(e.target.value)
                                        }
                                    />
                                    <MultiSelect
                                        optionList={['test1', 'test2']}
                                        value={['value1', 'value2']}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                        Content
                    </section>
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
                            type="button"
                            onClick={onSubmitNoteData}
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
            </div>
        </>
    )
}
