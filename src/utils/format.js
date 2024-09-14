export const formatDate=(date,onlyMonth)=>{
const options={
    // year:"numeric",
    month:"long"
}
if(!onlyMonth){
    options.day="numeric"
}
return new Intl.DateTimeFormat("en-US",options).format(date)
}