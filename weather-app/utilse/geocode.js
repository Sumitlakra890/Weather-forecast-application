
const request=require('request')


const geocode=(address,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1Ijoic3VtaXRsYWtyYTYyIiwiYSI6ImNsNTd4aGEwYzBoa24zZWxmMzFzZHQ0MWwifQ._cKG8NHf5Vu1hCOfhSyF7w&limit=1';
    
    request({url:geourl,json:true},(error,response)=>{
        
      if(error)
      {
        callback('network is  unavailable ',undefined)
        
      }
      else if(response.body.features.length==0)
      {
        callback('address is not matched ',undefined)
      }
      else{
        const data={
            lat:response.body.features[0].center[1],
            logi:response.body.features[0].center[0],
            placename:response.body.features[0].place_name
        }
        callback(undefined,data)  
        }
      })
    }

    module.exports={
        geocode:geocode
    }