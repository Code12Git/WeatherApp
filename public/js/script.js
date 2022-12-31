// console.log("This is starting of creating a web-application")





// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const para1=document.getElementById('message-1')
const para2=document.getElementById('message-2')

para1.textContent='From Javascript'
weatherform.addEventListener('submit',(e)=>{
   
    
    e.preventDefault();
   
    const location=search.value
    para1.textContent='loading'
    para2.textContent=''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                para1.textContent=data.error
                console.log(data.error)
            
            } else {
                para1.textContent=data.location
                console.log(data.location)
                para2.textContent=data.forecast
                console.log(data.forecast)
            }
        })
    })
})