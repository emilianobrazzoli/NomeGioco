/** MAIN */
const express = require('express'); 
const app = express();  

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
app.get("/EGO", (request, response) => { 
    response.sendFile('ego.html' , { root: './src/resource/html/' })
});  
app.get("/ISTERIA", (request, response) => { 
    response.sendFile('isteria.html' , { root: './src/resource/html/' })
});  
app.get("/SUPEREGO", (request, response) => { 
    response.sendFile('superego.html' , { root: './src/resource/html/' })
});  
app.get("/SOGNATORE", (request, response) => { 
    response.sendFile('sognatore.html' , { root: './src/resource/html/' })
});  
app.get("/AVVERTENZE", (request, response) => { 
    response.sendFile('avvertenze.html' , { root: './src/resource/html/' })
});  
app.get("/IFO", (request, response) => { 
    response.sendFile('info.html' , { root: './src/resource/html/' })
});  
app.listen(port);  