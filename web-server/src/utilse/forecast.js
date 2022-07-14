const request=require('request')


const forecast=(lat,longi,callback)=>{
  
    const forecastURL='https://api.weatherstack.com/current?access_key=a0c85b5b725670563f9fd1a0001f5629&query='+lat+','+longi;
    request({url:forecastURL,json:true},(error,Response)=>{
    if(error)
    {
        callback("unable to connet server",undefined)
    }
    else if(Response.body.error)
    {
        callback("unable to find the location",undefined)
    }
    else
    {
        callback(undefined,data={
            temperature:Response.body.current.temperature,
            location:Response.body.location.country,
            feelslike:Response.body.current.feelslike,
            wether_description:Response.body.current.wether_description[0]

           
        })
    }
}
    )


}
module.exports={
    forecast:forecast
}