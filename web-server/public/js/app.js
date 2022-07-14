console.log('client side javascript')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
       console.log(data)
    })
})


//select the element from html 
const weatherForm=document.querySelector('form');
const searchData=document.querySelector('input');
const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location1=searchData.value;
    messageOne.textContent='loading message......';
     messagetwo.textContent='';

    //send the respone using fetch to paragraph the output of forecast
   
    fetch('http://localhost:3000/weather?address='+location1).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error;
        }else
        {
            messageOne.textContent=data.location;
            messagetwo.textContent=data.temperature;
            messagetwo.textContent=data.weather_descrption;
        }
    }
    )
})

})