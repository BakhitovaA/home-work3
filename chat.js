const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;
      
/* В классе чата ChatApp добавить метод close, который будет вызывать событие close 
*/
   close() {
        this.emit('close');                                
    }
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

/*
Часть 1

Добавить обработчик события message для Чата Вебинара (webinarChat), который выводит в консоль сообщение 'Готовлюсь к ответу'. Обработчик создать в отдельной функции.
Для Вконтакте (vkChat) установить максимальное количество обработчиков событий, равное 2.
Добавить обработчик 'Готовлюсь к ответу' из пункта 1.1 к чату Вконтакте.
*/

function readyToAnswer() {
  console.log('Готовлюсь к ответу');
}

webinarChat.on('message', chatOnMessage);
webinarChat.on('message', readyToAnswer); 
//webinarChat.emit('message', readyToAnswer); 

facebookChat.on('message', chatOnMessage);

vkChat.on('message', chatOnMessage);
vkChat.getMaxListeners(2);                              	
vkChat.on('message', readyToAnswer);
//vkChat.emit('message', readyToAnswer); 

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

/*
Часть 2

Для чата вконтакте (vkChat) добавить обработчик close, выводящий в консоль текст "Чат вконтакте закрылся :(".
Вызывать у чата вконтакте метод close().
 */

vkChat.on('close', () => 
    console.log('Чат вконтакте закрылся :('));        
vkChat.close();