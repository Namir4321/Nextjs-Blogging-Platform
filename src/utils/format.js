export const formatDate=(date,year)=>{
const options={
    year:"2-digit",
    month:"short"
}
if(!year){
    year="short"
}
return new Intl.DateTimeFormat("en-US",options).format(date)
}