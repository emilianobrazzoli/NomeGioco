/** MAIN */
const express = require('express'); 
const app = express();  
var fs = require('fs');

//INIT .ENV VAR
if(!process || !process.env || !process.env.TOKEN){
    require('dotenv').config();
}

var port = process.env.PORT || 8080;
var token = process.env.TOKEN || '';

app.use(express.static(__dirname + '/dist/'));
app.use('/src/assets', express.static(__dirname + '/src/assets/'));


app.get("/text.js", (request, response) => { 
    response.sendFile('text.js' , { root: './src/resource/js/' })
});  
app.get("/home.css", (request, response) => { 
    response.sendFile('home.css' , { root: './src/resource/css/' })
});  
app.get("/ego.css", (request, response) => { 
    response.sendFile('ego.css' , { root: './src/resource/css/' })
});  
app.get("/text.scss", (request, response) => { 
    response.sendFile('text.scss' , { root: './src/resource/css/' })
});  
app.get("/APPUNTI", (request, response) => { 
    response.sendFile('charity-bolla.html' , { root: './src/resource/html/' }) 
});  

var files = fs.readdirSync('./src/resource/html/');
files.forEach(file => { 
    var streetaddress= file.substr(0, file.indexOf('.')); 
    app.get("/"+streetaddress, (request, response) => { 
        response.sendFile(file , { root: './src/resource/html/' }) 
    });  
});

app.listen(port);  