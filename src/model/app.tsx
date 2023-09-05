import * as path from 'path';
import { appInfo } from '~/type/app'
import { load, save } from '~/utils/index'
import { fileURLToPath } from 'url';

class Model {
    static dbPath() {
        const classname = this.name.toLowerCase()
        const filename = `${classname}.txt`
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const p = path.join(__dirname, '../db', filename)
        return p
    }
}


class App extends Model {
    name: string;
    url: string;
    image: string;
    description: string;

    constructor(form: appInfo) {
        super()
        this.name = form.name
        this.url = form.url
        this.image = form.image
        this.description = form.description
    }

    save() {
        const cls = this.constructor as typeof App
        const apps = cls.all()
        apps.push(this)
        // console.log('save apps', apps)
        const path = cls.dbPath()
        save(apps, path)
    }

    static findOne(key: keyof appInfo, value: string) {
        const apps = this.all()
        let app = apps.find((item: appInfo) => {
            return item[key] === value
        })

        // console.log('findOne', app)
        return app === undefined ? null : app
    }

    static remove(name: string) {
        const apps = this.all()
        const index = apps.findIndex((item: appInfo) => {
            return item.name === name
        })

        if(index > -1) {
            apps.splice(index, 1)
            const path = this.dbPath()
            save(apps, path)
            return true
        } else {
            return false
        }
    }


    static create(form: appInfo) {
        const uniqueApp = App.findOne('name', form.name) === null
        if(uniqueApp) {
            const app = new App(form)
            return app
        } else {
            return null
        }
    }

    static edit(form: appInfo) {
        const apps = this.all()
        const app = apps.find((item: appInfo) => {
            return item.name === form.name
        })
        if(app) {
            app.url = form.url
            app.image = form.image
            app.description = form.description
            const path = this.dbPath()
            save(apps, path)
            return app
        } else {
            return null
        }
    }

    static all() {
        const path = this.dbPath()
        const data = load(path)
        return data as appInfo[]
    }
}

export default App