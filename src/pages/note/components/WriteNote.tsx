import React, { Dispatch, SetStateAction, useState } from 'react'
import ReactQuill from 'react-quill'
import TagInput from '../../../components/tag-input'
import { baseUrl } from '../../../shared/App'
import 'react-quill/dist/quill.snow.css'

interface Tags {
    [index: string]: boolean
}

interface NoteDataInterFace {
    title: string
    tag: string[]
    content: string
}

const modules = {
    toolbar: {
        container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
        ],
        // container:  [['bold', 'italic', 'underline', 'blockquote'],
        // [{'list': 'ordered'}, {'list': 'bullet'}],
        // ['formula','link', 'image'],
        // ['clean']],
        // handlers: { 'image' : this.handleImage }
    },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
    // imageDrop: true, // imageDrop 등록
    // imageResize: {} // imageResize 등록
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

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
    const [tagInputValue, setTagInputValue] = useState<Tags>({} as Tags)
    const [chagneEditor, setChangeEditor] = useState<string>('')

    function onActiveControl() {
        setIsActive(!isActive)
        setTagInputValue({})
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
            body: JSON.stringify({
                title: noteData.title,
                content: chagneEditor,
                tag: Object.keys(tagInputValue),
            }),
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
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
                <div className="modal-background" onClick={onActiveControl} />
                <div className="modal-card" style={{ width: 1000 }}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            <input
                                className="input"
                                placeholder="Modal title"
                                style={{ width: '95%' }}
                                value={noteData.title || ''}
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
                            <span className="span mt-1">Tags : &nbsp;</span>
                            <div className="field-body">
                                <div className="field">
                                    <TagInput
                                        required={true}
                                        tags={tagInputValue}
                                        setTags={setTagInputValue}
                                        maxTags={5}
                                    />
                                </div>
                            </div>
                        </div>
                        <ReactQuill
                            // ref={(el) => (quillRef = el)}
                            value={chagneEditor} // state 값
                            theme="snow" // 테마값 이미 snow.css를 로드해서 제거해도 무망
                            onChange={(e) => setChangeEditor(e)}
                            modules={modules}
                            formats={formats}
                            placeholder={'아무거나 입력해 주세요'}
                        />
                        '
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
