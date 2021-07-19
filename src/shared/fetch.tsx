import { baseUrl } from '../shared/App'

export default async function cFetch(
    type: 'GET' | 'POST' | 'PUT' | 'DELETE',
    api: string,
    body: { [index: string]: any }
) {
    let res: any
    if (type === 'GET') {
        res = await fetch(baseUrl + api)
    } else {
        fetch(baseUrl + api, {
            method: type,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    if (res.status >= 400) {
        alert(`error : ${res.status}`)
    } else {
        alert(`succcess`)
    }

    return res.json()
}
