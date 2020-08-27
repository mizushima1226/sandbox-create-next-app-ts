import moment from 'moment-timezone'

export class Task {
    private _id: number
    private _title: string
    private _description: string
    private _createdAt: moment.Moment
    private _updatedAt: moment.Moment

    get id(): number{
        return this._id
    }
    set id(id: number) {
        this._id = id
    }

    get title(): string {
        return this._title
    }
    set title(title: string) {
        this._title = title
    }

    get description():string {
        return this._description
    }
    set description(description: string){
        this._description = description
    }

    get createdAt():moment.Moment {
        return this._createdAt
    }
    set createdAt(t: moment.Moment) {
        this._createdAt = t
    }

    get updatedAt(): moment.Moment {
        return this._updatedAt
    }
    set updatedAt(t: moment.Moment) {
        this._updatedAt = t
    }

    getUTCCreatedAt(): string {
        if(this._createdAt){
            return this._createdAt.utc().format('YYYY-MM-DD HH:mm:ss')
        }
        return ""
    }

    getUTCUpdatedAt(): string {
        if(this._updatedAt){
            return this._updatedAt.utc().format('YYYY-MM-DD HH:mm:ss')
        }
        return ""
    }

    constructor(title?: string, description?: string, createdAt?: moment.Moment) {
        this._title = title || ""
        this._description = description || ""
        
        if(createdAt){
            this._createdAt = createdAt
        }
    }


}