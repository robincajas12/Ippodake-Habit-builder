type timeType = { days : number, hours : number, minutes : number, seconds : number}

export const ms : Readonly<timeType> = Object.freeze({
    seconds : 1000,
    minutes : 1000 * 60,
    hours : 1000 * 60 * 60,
    days : 1000 * 60 * 60 * 24 
});
export default function getTimeDifference(day: Date, day2: Date)  : number{
    const datediff = Math.abs(day.getTime() - day2.getTime());

    const totalSeconds = Math.abs(Math.floor(datediff / 1000));
    const days = Math.floor(totalSeconds / 86400); // 86400 segundos en un día
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const newTime : timeType= { days, hours, minutes, seconds } 
    const msTime = converTimeToMiliseconds(newTime);
    return msTime;
}
function converTimeToMiliseconds(time : timeType) : number
{
    let timeInMs : number = 0
    timeInMs = ms.seconds * time.seconds + ms.minutes * time.minutes + ms.hours* time.hours + ms.days * time.days
    return timeInMs
}
export function addTime(date: Date, miliseconds: number)
{
    return new Date(date.getTime() + miliseconds)
}
