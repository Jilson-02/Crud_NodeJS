const express=require('express')
const app=express()
const path=require('path')

const expressLayouts=require('express-ejs-layouts')

app.use(expressLayouts)
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')
app.set('port', process.env.PORT || 4000);

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',require('./router'))



app.listen(app.get('port'),()=>{
    console.log(`La conexion se realiza en el puerto: http://localhost:${app.get('port')}`)
})