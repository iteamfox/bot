const TelegramBot = require('node-telegram-bot-api');
const debug = require('./helpers');
const TOKEN = '894155936:AAHMCW9yfPRvgtckrjweKhVgQGuE39hQAoI';


console.log('Bot has been started ...');

const bot = new TelegramBot(TOKEN,{
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

//9 клавиатура пользователю
bot.on('message', msg => {
    const chatId = msg.chat.id;
    
    if (msg.text === 'Clothe') {

        bot.sendMessage(chatId, 'Clothe keyboard', {
            reply_markup:{
                remove_keyboard: true
            }
        })

        } else if (msg.text === 'Reply'){

        bot.sendMessage(chatId, 'Answer',{
            reply_markup:{
                force_reply_: true
            }
        })
    } else {
        bot.sendMessage(chatId,'Keyboards',{
            reply_markup:{
                keyboard: [
                    [{
                        text: 'Send location',
                        request_location: true
                    }],
                    ['Reply', 'Clothe'],
                    [{
                    text: 'Send contact',
                        request_contact: true
                    }]
                ],
                one_time_keyboard: true
            }
        })
    }
    
    // bot.sendMessage(chatId,'Keyboards',{
    //     reply_markup:{
    //         keyboard: [
    //             ['Send location'],
    //             ['Reply', 'Clothe'],
    //             ['Send contact']
    //         ]
    //     }
    // })
});


//8 доп опции sendMessage
// bot.on('message', msg => {
//
//     setTimeout(() => {
//         bot.sendMessage(msg.chat.id, `https://core.telegram.org/bots/api#markdown-style`, {
//             disable_web_page_preview: true,   //превью запарсить
//             disable_notification: true,    //оповещение со звуком
//         })
//     }, 4000)
//
// });

//7 Markdown
// bot.on('message', msg => {
//
//     const markdown = `
//     *Hello, ${msg.from.first_name}*
//     _Italic text_
//   `;
//
//
//     bot.sendMessage(msg.chat.id, markdown, {
//         parse_mode: 'Markdown'
//     })
//
// });



//6 отправка HTML
// bot.on('message', msg => {
//     const html = `
// <strong>Hello, ${msg.from.first_name}</strong>
// <i>Test message</i>
// <pre>${debug(msg)}</pre>
//   `
//
//     bot.sendMessage(msg.chat.id, html, {
//         parse_mode: 'HTML'
//     })
// });


//5
// bot.onText(/\/start/, msg => {
//     const {id} = msg.chat;
//     bot.sendMessage(id, debug(msg))
// });
//
// bot.onText(/\/help(.+)/, (msg,[source, match]) =>{
//     const {id} = msg.chat
//     bot.sendMessage(id, debug(match))
// });


//6
// bot.on('message', msg => {
//     const html = `
// <strong>Hello, ${msg.from.first_name}</strong>
// <i>Test message</i>
// <pre>${debug(msg)}</pre>
//   `
//
//     bot.sendMessage(msg.chat.id, html, {
//         parse_mode: 'HTML'
//     })
// });


//4
// bot.on('message', msg => {
//     const  {id}= msg.chat;
//
//     bot.sendMessage(id, debug(msg))
//         .then(()=>{
//             console.log('Message has been send')
//         })
//         .catch((error)=>{
//             console.error(error)
//         })
//
//
//     // bot.sendMessage(msg.chat.id, 'Hello, '+ msg.from.first_name + '!')
// });
