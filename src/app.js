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

app.get("/", (request, response) => { 
    response.sendFile('home.html' , { root: './src/resource/html/' })
});  

var files = fs.readdirSync('./src/resource/html/');
files.forEach(file => { 
    var streetaddress= file.substr(0, file.indexOf('.')); 
    app.get("/"+streetaddress, (request, response) => { 
        response.sendFile(file , { root: './src/resource/html/' }) 
    });  
});
var filesCss = fs.readdirSync('./src/resource/css/');
filesCss.forEach(file => {  
    app.get("/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/css/' }) 
    });  
});
var filesJs = fs.readdirSync('./src/resource/js/');
filesJs.forEach(file => {  
    app.get("/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/js/' }) 
    });  
});
var filesHome = fs.readdirSync('./src/resource/home');
filesHome.forEach(file => {  
    app.get("/src/resource/html/home/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/home/' }) 
    });  
});

app.listen(port);  