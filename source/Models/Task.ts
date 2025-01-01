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
        private _title : string;
        private _uid: number;
        private _level: number;
        private _until?: Date;
        private _repeatDays?: string;
        private _type?: ETaskType; // Cambiado a ETaskType
        private _exp: number;
        private _subtasks?: string;
        private _difficulty: string;
        private _setsNumber?: number;
        private _repsPerSet?: number;
        private _time?: number;
    
        constructor(
            id: number = 0,
            uid: number,
            title : string,
            level: number,
            exp: number,
            difficulty: string,
            until?: Date,
            repeatDays?: string,
            type?: string, // Cambiado a ETaskType
            subtasks?: string,
            setsNumber?: number,
            repsPerSet?: number,
            time?: number
        ) {
            this._id = id;
            this._title = title
            this._uid = uid;
            this._level = level;
            this._until = until;
            this._repeatDays = repeatDays;
            this._type = parseETaskType(type);
            if (type && !this._type) {
                throw new Error(`Invalid task type: ${type}. Valid types are ${Object.values(ETaskType).join(", ")}`);
            }
            this._exp = exp;
            this._subtasks = subtasks;
            this._difficulty = difficulty;
            this._setsNumber = setsNumber;
            this._repsPerSet = repsPerSet;
            this._time = time;
        }
    
        // Getters
        get type(): ETaskType | undefined {
            return this._type;
        }
    
        // Setter
        set type(newType: ETaskType | undefined) {
            this._type = newType;
        }
    // Getters
    get id(): number {
        return this._id;
    }
    get title(): string{
        return this._title
    }
    get uid(): number {
        return this._uid;
    }

    get level(): number {
        return this._level;
    }

    get until(): Date | undefined {
        return this._until;
    }

    get repeatDays(): string | undefined {
        return this._repeatDays;
    }
    get exp(): number {
        return this._exp;
    }

    get subtasks(): string | undefined {
        return this._subtasks;
    }

    get difficulty(): string {
        return this._difficulty;
    }

    get setsNumber(): number | undefined {
        return this._setsNumber;
    }

    get repsPerSet(): number | undefined {
        return this._repsPerSet;
    }

    get time(): number | undefined {
        return this._time;
    }
}
