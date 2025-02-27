export enum ETaskType {
    CHECK = "CHECK",
    TIME = "TIME",
    SETS_AND_REPS = "SETS_AND_REPS",
}

export function parseETaskType(taskType: string | undefined): ETaskType | undefined {
    return ETaskType[taskType as keyof typeof ETaskType];
}

export default class TaskType {
    private _id: number;
    private _uid: number;
    private _title: string;
    private _type: ETaskType | undefined;
    private _exp: number;
    private _mainTaskType: number | null;
    private _maxT: number;
    private _minT: number;
    private _creationDate: Date;

    constructor(
        id: number = 0,
        uid: number,
        title: string,
        type: string | undefined,  // Recibe como string para luego convertir
        exp: number,
        mainTaskType: number | null,
        maxT: number,
        minT: number,
        creationDate: Date
    ) {
        this._id = id;
        this._uid = uid;
        this._title = title;
        this._type = parseETaskType(type);  // Se convierte la cadena en el enum
        this._exp = exp;
        this._mainTaskType = mainTaskType;
        this._maxT = maxT;
        this._minT = minT;
        this._creationDate = creationDate;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get uid(): number {
        return this._uid;
    }

    set uid(value: number) {
        this._uid = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get type(): ETaskType | undefined {
        return this._type;
    }

    set type(value: ETaskType | undefined) {
        this._type = value;
    }

    get exp(): number {
        return this._exp;
    }

    set exp(value: number) {
        this._exp = value;
    }

    get mainTaskType(): number | null {
        return this._mainTaskType;
    }

    set mainTaskType(value: number | null) {
        this._mainTaskType = value;
    }

    get maxT(): number {
        return this._maxT;
    }

    set maxT(value: number) {
        this._maxT = value;
    }

    get minT(): number {
        return this._minT;
    }

    set minT(value: number) {
        this._minT = value;
    }

    get creationDate(): Date {
        return this._creationDate;
    }

    set creationDate(value: Date) {
        this._creationDate = value;
    }

    toJSON(): object {
        return {
            id: this._id,
            uid: this._uid,
            title: this._title,
            type: this._type,
            exp: this._exp,
            mainTaskType: this._mainTaskType,
            maxT: this._maxT,
            minT: this._minT,
            creationDate: this._creationDate.toISOString(),
        };
    }

    static fromJSON(json: string): TaskType {
        const data = JSON.parse(json);
        return new TaskType(
            data.id,
            data.uid,
            data.title,
            data.type,  // Se pasa directamente, luego se parsea en el constructor
            data.exp,
            data.mainTaskType,
            data.maxT,
            data.minT,
            new Date(data.creationDate)
        );
    }
}
