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
    console.log( "Received a coffee: coffeeeeeeeeeee"); 
    response.sendFile('home.html' , { root: './code/resource/' })
});  
app.listen(port);  