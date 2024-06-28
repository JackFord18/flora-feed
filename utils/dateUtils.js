const parseDateTimeNumber = (number) => {
    return (number).toString().padStart(2, '0');
}
const parseDateString = (date) => {
  return `${date.getFullYear()}-${parseDateTimeNumber(date.getMonth()+1)}-${parseDateTimeNumber(date.getDate())}T${parseDateTimeNumber(date.getHours())}:${parseDateTimeNumber(date.getMinutes())}`
}
const parseDateStringAsISO = (date) => {
    return date.toISOString().slice(0, 16);
  }

export { parseDateString, parseDateStringAsISO };