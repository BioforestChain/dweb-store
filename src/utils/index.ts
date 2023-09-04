import * as fs from 'fs'

export const ensureExists = (path: string) => {
    if (!fs.existsSync(path)) {
        const data = '[]'
        fs.writeFileSync(path, data, 'utf8')
    }
}

export const save = (data: Object, path: string) => {
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

export const load = (path: string) => {
    ensureExists(path)
    const s = fs.readFileSync(path, 'utf-8')
    const data = JSON.parse(s)
    return data
}

export const delay = (time: number) => new Promise((res) => setTimeout(res, time));

