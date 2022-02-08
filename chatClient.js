
       
       var socket = io(); 
      var things = ['Rock', 'Paper', 'Scissor','unlikely','lethal','sweet','warm','existing','elastic','painstaking','alluring','absent','bustling','wooden','eastern','nice','mature','null','overconfident','learned','sophisticated','boorish','scandalous','frightened','defeated','desperate','testy','versed','sudden','handsome','courageous','panoramic','economic','unaccountable','male','actually','bitter','mellow','black-and-white','lackadaisical','threatening','abiding','productive','loving','organic','greedy','psychotic','happy','penitent','modern','necessary','wiry','neat'];
      var username = things[Math.floor(Math.random()*things.length)] + Math.floor(Math.random()*things.length); 
      var messages = document.getElementById('messages');
      var form = document.getElementById('form');
      var input = document.getElementById('input'); 
      
      // let's assume that the client page, once rendered, knows what room it wants to join
      var room = "NC"; 
      socket.on('connect', function() {
        // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', username);
        socket.emit('get_message');
      }); 
      

      function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
          socket.emit('message', username+": "+input.value);
          input.value = '';
        }
      });

      socket.on('message', function(msg) {
        if(Array.isArray(msg)){  
            for (let index = 0; index < msg.length; index++) {
                const history = msg [index];
                var item = document.createElement('li');
                item.textContent = history;
                messages.appendChild(item);
            }  
        }else{
            var item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        }
      });