export default class Task {
    private _id: number;
    private _idTaskType: number;
    private _t: number;
    private _completed: boolean;
    private _date: number;
    private _tCompleted: number;  // tCompleted como number

    constructor(id: number, idTaskType: number, t: number, completed: boolean, date: number, tCompleted: number) {
        this._id = id;
        this._idTaskType = idTaskType;
        this._t = t;
        this._completed = completed;
        this._date = date;
        this._tCompleted = tCompleted;  // Asignar tCompleted como number
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get idTaskType(): number {
        return this._idTaskType;
    }

    set idTaskType(value: number) {
        this._idTaskType = value;
    }

    get t(): number {
        return this._t;
    }

    set t(value: number) {
        this._t = value;
    }

    get completed(): boolean {
        return this._completed;
    }

    set completed(value: boolean) {
        this._completed = value;
    }

    get date(): number {
        return this._date;
    }

    set date(value: number) {
        this._date = value;
    }

    get tCompleted(): number {
        return this._tCompleted;
    }

    set tCompleted(value: number) {
        this._tCompleted = value;
    }



    static fromJSON(json: string): Task {
        console.log(json)
        const data = JSON.parse(json);
        return new Task(data.id, data.idTaskType, Number(data.t), data.completed, data.date, Number(data.tCompleted));  // Asegurar que tCompleted sea un número
    }
}
