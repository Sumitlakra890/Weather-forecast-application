const request = require('request')
const chalk = require('chalk')
const geocode2 = require('./utilse/geocode.js');
const forecasts = require('./utilse/forecast.js');
const validator = require('validator');
const yargs = require('yargs')

const url = 'http://api.weatherstack.com/current?access_key=6fab0338c5c47124c949c2fb41e05136&query=37.8267,-122.4233&units=f'
/*request({url:url,json:true},(error,response)=>{
 if(err){
   console.log('unable to connect to network')
 }
 else if(response.data.err)
 {
   console.log("unable to find the location")
 }else{
   const data=JSON.parse(response.body) //units =f,m,s feranite,celciuse,kelvin //documentaion weatherstack
   console.log(data.current)            //object which have property current
 console.log(response.body.current) //wether description is array
 console.log("temperature:"+chalk.red.bold(response.body.current.weather_descriptions[1]) +" "+ "feelslike:" + chalk.green.bold(response.body.current.feelslike))
}
})*/
//geocoding services
//address -lat,long -forecast

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ .json?access_token=pk.eyJ1Ijoic3VtaXRsYWtyYTYyIiwiYSI6ImNsNTd4aGEwYzBoa24zZWxmMzFzZHQ0MWwifQ._cKG8NHf5Vu1hCOfhSyF7w&limit=1';
// request({url:geocodeURL,json:true},(err,response)=>{

//  if(err)
//  {
//   console.log ('error is found')
//  }
//  else if(response.body.features.length===0)
//  {
//   console.log("unable to find the location")

//  else
//  {
//   const lat=response.body.features[0].center[1];
//   const longi=response.body.features[0].center[0];
//   console.log(lat+longi)
//  }
// })

// //handling the error
// /*request({url:url,json:true},(error,response)=>{
//units =f,m,s feranite,celciuse,kelvin //documentaion weatherstack
//   console.log(data.current)            //object which have property current
// console.log(response.body.current) //wether description is array
// console.log("temperature:"+chalk.red.bold(response.body.current.weather_descriptions[1]) +" "+ "feelslike:" + chalk.green.bold(response.body.current.feelslike))

//   console.log(error);
// })*/

let city = '';

yargs.command(
  {
    command: 'input',
    builder: {
      title: {
        describe: "input the address",
        demandoption: true,
        type: 'string'
      },
      handler: (argv) => {
        city = argv.title;

      }
    }
  }
)
///process.argv used to take the input from the command line argument and argv is a string vector used to save the input of cmd
console.log(process.argv);
const address = process.argv[2];

if(!address)
{
  console.log("please provide a address")
}else
{
  geocode2.geocode(address, (error, data) => {
    if (error)
      return console.log(error);
  
    console.log(data);
  
    forecasts.forcast(data.lat, data.logi, (error, foredata) => {
  
      if (error)
        return console.log(error)
  
      console.log(foredata);
    }
    )
  
  })
  
  
}


