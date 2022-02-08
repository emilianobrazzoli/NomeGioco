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
app.get("/favicon.ico", (request, response) => { 
    response.sendFile('favicon.ico' , { root: './src/resource/' })
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
    console.log("/src/resource/css/"+file);
    app.get("/src/resource/css/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/css/' }) 
    });  
});
var filesJs = fs.readdirSync('./src/resource/js/');
filesJs.forEach(file => {  
    console.log("/src/resource/js/"+file);
    app.get("/src/resource/js/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/js/' }) 
    });  
});
var filesHome = fs.readdirSync('./src/resource/home');
filesHome.forEach(file => {  
    console.log("/src/resource/html/home/"+file);
    app.get("/src/resource/html/home/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/home/' }) 
    });  
});
 

  
app.get('/history.js', (req, response) => {
    response.sendFile('/history.js' , { root: './src' }) 
});
app.get('/chat', (req, response) => {
    response.sendFile('chat.html' , { root: './' }) 
});
app.get('/chatClient.js', (req, response) => {
    response.sendFile('chatClient.js' , { root: './' }) 
});
const http = require('http').Server(app);
const io = require('socket.io')(http); 
const room = 'NC'; 
const random = require('./randomChat.json');
var history = [];
var things = ['Rock', 'Paper', 'Scissor','unlikely','lethal','sweet','warm','existing','elastic','painstaking','alluring','absent','bustling','wooden','eastern','nice','mature','null','overconfident','learned','sophisticated','boorish','scandalous','frightened','defeated','desperate','testy','versed','sudden','handsome','courageous','panoramic','economic','unaccountable','male','actually','bitter','mellow','black-and-white','lackadaisical','threatening','abiding','productive','loving','organic','greedy','psychotic','happy','penitent','modern','necessary','wiry','neat'];


// handle incoming connections from clients
io.sockets.on('connection', function(socket) { 
    socket.on('room', function(username) {
        socket.join(room);
        io.sockets.in(room).emit('message', username+' si è unito al datapool'); 
    });
    socket.on('message', function(message) {
        io.sockets.in(room).emit('message', message);
        history.push(message);  
    });
    
    socket.on('get_message', function(){ 
        io.sockets.send(history);
    });

    
});
 
setInterval( function(){
    var username = things[Math.floor(Math.random()*things.length)] + Math.floor(Math.random()*things.length); 
    var message = random.random[Math.floor(Math.random()*random.random.length)]; 
    io.sockets.in(room).emit('message', username+ ': '+message); 
    history.push(username+ ': '+message);   
} , 5000);

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
