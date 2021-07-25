import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { NoteDto } from '../note'

export default function NoteContent(
    props: RouteComponentProps<{}, {}, NoteDto>
) {
    useEffect(() => {
        document.getElementsByClassName('inner-html')[0].innerHTML =
            props.location.state.content
    }, [props])

    return (
        <div>
            <div className="header">{props.location.state.title}</div>
            <div className="inner-html">1</div>
        </div>
    )
}
