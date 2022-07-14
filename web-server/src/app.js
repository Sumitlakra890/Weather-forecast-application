//here we're going to load in, express configure it to serve something up
const path=require('path')
const geocode=require('./utilse/geocode')
const forecast=require('./utilse/forecast')
const express=require('express')
const hbs=require('hbs')
const { forcast } = require('./utilse/forecast')
const app=express();

//path of all directories ,path for express config
const viewspath=path.join(__dirname,'../templates/views')
const publicpath=path.join(__dirname,'../public')
const partialpath=path.join(__dirname,'../templates/partials')


//setup the static directory to serve
//app.use use send the html ,json file back to the browser screen
app.use(express.static(publicpath))

//setup handlebar engine
//to use the handlebars we use the set method key value pair
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)



//we can set up the route
app.get('/index',(req,res)=>{
  res.render('index',{
    title:'weather',
    name:'sumit lakra'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'hepl desk',
    name:'sumit lakra',
    message:'am here for ur service and any help  just content me'
  })
})


app.get('/',(req,res)=>{
  
    ///send used to diplay the function in browser and send back the response
    res.send('HEllo world')

})



///use of query selector and the browser is sending the address

app.get('/product',(req,res)=>{
 
  if(!req.query.search)
  {
    return res.send('seacrh value is empty')
  }
  else{
    
    res.send({
      product:[]
    })
  }
  

})

app.get('/weather',(req,res)=>{
  if(!req.query.address)
  {
    return res.send({
      error:'u maust provide address term'
    })
  }else
  {

    geocode.geocode(req.query.address,(error,{lat,logi,placename}={})=>
    {
      if(error)
      return res.send({error})
      

       forecast.forecast(lat,logi,(error,forecastdata)=>
        {
          if(error)
        return res.send({error})
         else
          {
          res.send({
               forecast:forecastdata,
              location:placename,
               address:req.query.address
             })
         }


        }
      )
    })

  


    // console.log(req.query.address)
    // res.send({
    //   address:req.query.address
    // })

  }

})




//handlebar to handle 404 page
// app.get('*',(req,res)=>
// {
//   res.send('404 page')

// })

// app.get('/help/*',(req,res)=>{
//   res.render('404page',{
//     title:'404',
//     name:'sumit',
//     errormessage:'article not found'
    
//   }
//   )
// })

// app.get('*',(req,res)=>{
//   res.render('404page',{
//     errormessage:'page not found'
//   })
// })
//if server is not work until we use
app.listen(3000,'localhost',()=>{
    console.log('server is start working')
})

///if we save the file ,the result will not so in server until we restart the server again
//instead of node we can use nodemon

