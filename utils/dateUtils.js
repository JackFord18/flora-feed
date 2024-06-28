const parseDateTimeNumber = (number) => {
    return (number).toString().padStart(2, '0');
}
const parseDateTimeString = (date) => {
  return `${date.getFullYear()}-${parseDateTimeNumber(date.getMonth()+1)}-${parseDateTimeNumber(date.getDate())}T${parseDateTimeNumber(date.getHours())}:${parseDateTimeNumber(date.getMinutes())}`
}
const parseDateTimeStringAsISO = (date) => {
    return date.toISOString().slice(0, 16);
}
const getRepairedDateTimeString = (dateTimeString) => {
    if(!dateTimeString?.includes("T")){
          return dateTimeString + "T00:00";
    }
    return dateTimeString;
}
const isValidDateTime = (date) => {
    return !isNaN(Date.parse(date));
}
export { parseDateTimeString, parseDateTimeStringAsISO, getRepairedDateTimeString, isValidDateTime };