const path=require('path')
const express=require('express')
const hbs=require('hbs')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express();
const port=process.env.PORT || 3000
//Define paths for Express config
const publicDirectorypath=path.join(__dirname,'../public')
const viewsdir=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location.
app.set('view engine','hbs')
app.set('views',viewsdir)
hbs.registerPartials(partialpath)
//Setup static directories to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Saksham"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Saksham"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        Message:"This is a help message",
        title:"Help",
        name:"saksham"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })

        })

        
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide an searchterm'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    }

    )
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Saksham',
        errormessage:'Page found'
    })
})
app.get('/help')

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Andrew',
        errormessage:'Page not found'
    })
})



app.listen(port,()=>{
    console.log('Server is running on port '+ port)
})