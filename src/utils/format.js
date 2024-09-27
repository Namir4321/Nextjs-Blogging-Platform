export const formatDate=(date,onlyMonth)=>{
const options={
    year:"2-digit",
    month:"short"
}
if(!onlyMonth){
    year="short"
}
return new Intl.DateTimeFormat("en-US",options).format(date)
}