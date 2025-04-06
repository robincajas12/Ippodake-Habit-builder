
type PropsForInput = {action:(txt:string, propertyToChange: string)=> void, txtTitle: string, initialText: string,propertyToChange: string}
type PropsForSlider = { min:number,max:number, action:(value:number, propertyToChange: string)=> void, txtTitle: string, initialValue: number,propertyToChange: string}