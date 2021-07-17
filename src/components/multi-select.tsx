import React, { useState, useRef, useEffect } from 'react'

export default function MultiSelect({
    optionList,
    value,
    onChange,
}: {
    optionList: string[]
    value: string[]
    onChange: (e: string[]) => void
}) {
    const [viewSelect, setViewSelect] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (viewSelect && selectRef) selectRef.current?.focus()
    }, [viewSelect])

    const onStatusSelect = (e: string) => () => {
        if (value && !value.includes(e)) {
            onChange([...value, e])
        } else if (value) onChange(value.filter((row: string) => row !== e))
    }

    const onCloseAttachment = (e: string) => (f: any) => {
        f.stopPropagation()
        if (value) onChange(value.filter((row: string) => row !== e))
    }

    const el = document.getElementById('statusDiv')

    return (
        <>
            <div
                id="statusDiv"
                className="column is-fullwidth"
                style={{
                    border: '1px solid transparent',
                    borderColor: '#dbdbdb',
                    borderRadius: 4,
                    minHeight: 40,
                    cursor: 'pointer',
                    padding: 2,
                    zIndex: 1,
                    maxHeight: 100,
                    overflowY: 'auto',
                }}
                onClick={() => setViewSelect(true)}
                onKeyDown={() => setViewSelect(true)}
                role="presentation"
            >
                {value &&
                    value.length > 0 &&
                    value.map((row, i) => (
                        <span
                            key={`${row}:${i.toString()}`}
                            className="tag is-small"
                            style={{ margin: 5, fontSize: 10 }}
                        >
                            {row}
                            <span
                                className="icon is-small"
                                id={row}
                                key={i.toString()}
                                onClick={onCloseAttachment(row)}
                                onKeyDown={onCloseAttachment(row)}
                                style={{
                                    zIndex: 3,
                                    marginLeft: 5,
                                    fontSize: 10,
                                }}
                                role="none"
                            >
                                <i className="fas fa-times" />
                            </span>
                        </span>
                    ))}
            </div>
            {viewSelect && (
                <div
                    className="select is-multiple"
                    style={{
                        zIndex: 2,
                        backgroundColor: 'white',
                        width: el ? el.offsetWidth - 5 : '',
                        position: 'absolute',
                        maxHeight: 200,
                        overflowY: 'auto',
                    }}
                    ref={selectRef}
                    tabIndex={0}
                    onBlur={() => setViewSelect(false)}
                    role="button"
                >
                    <ul className="menu-list">
                        {optionList.map((row: string) => (
                            <li key={row}>
                                <a
                                    id={row}
                                    onClick={onStatusSelect(row)}
                                    onKeyDown={onStatusSelect(row)}
                                    role="none"
                                >
                                    {row}
                                    {value && value.includes(row) ? (
                                        <span
                                            className="icon is-small"
                                            style={{ float: 'right' }}
                                        >
                                            <i className="fas fa-check" />
                                        </span>
                                    ) : null}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
