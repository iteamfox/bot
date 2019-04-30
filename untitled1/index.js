process.env["NTBA_FIX_319"] = 1;
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

// 12,13,14,15  
const inline_keyboard = [
    [
        {
            text:'Forward',
            callback_data:'forward'
        },
        {
            text:'Reply',
            callback_data:'reply'
        }
    ],
    [
        {
            text:'Edit',
            callback_data:'edit'
        },
        {
            text:'Delete',
            callback_data:'delete'
        }
    ]
];

bot.on('callback_query', query =>{
    const {chat, message_id, text} = query.message;
   switch (query.data) {
       case 'forward':
           //куда, откуда, что
           bot.forwardMessage(chat.id, chat.id,message_id);
           break
       case 'reply':
           bot.sendMessage(chat.id, `Answer on message`,{
               reply_to_message_id: message_id
           })
           break
       case 'edit':
           bot.editMessageText(`${text} (edited)`, {
               chat_id: chat.id,
               message_id: message_id,
               reply_markup: {inline_keyboard}
           })
           break
       case 'delete':
           bot.deleteMessage(chat.id, message_id)
           break
   }
   bot.answerCallbackQuery({
       callback_query_id: query.id
   })
});

bot.onText(/\/start/,(msg, [source,match]) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Keyboard', {
        reply_markup:{
            inline_keyboard
        }
    })
});


// 11  Обработка инлайн запросов
// bot.on('inline_query', query => {
//     const results = [];
//
//     for (let i = 0; i<5;i++){
//         results.push({
//             type: 'article',
//             id: i.toString(),
//             title: 'Title' +i,
//             input_message_content:{
//                 message_text: `Article #${i+1}`
//             }
//         })
//     }
//     bot.answerInlineQuery(query.id, results, {
//         cache_time: 0
//     })
// });

//10 Инлайн клавиатура
// bot.on('message', msg => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, 'Inline keyboard', {
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     {
//                         text: 'Google',
//                         url: 'https://google.com'
//                     }
//                 ],
//                 [
//                     {
//                         text: 'Reply',
//                         callback_data: 'reply'
//                     },
//                     {
//                         text: 'Forward',
//                         callback_data: 'forward'
//                     }
//                 ]
//             ]
//         }
//     })
// });
//
// bot.on('callback_query', query => {
//     // bot.sendMessage(query.message.chat.id, debug(query))
//
//     bot.answerCallbackQuery(query.id, `${query.data}`)
// });

//9 клавиатура пользователю
// bot.on('message', msg => {
//     const chatId = msg.chat.id;
//
//     if (msg.text === 'Clothe') {
//
//         bot.sendMessage(chatId, 'Clothe keyboard', {
//             reply_markup:{
//                 remove_keyboard: true
//             }
//         })
//
//         } else if (msg.text === 'Reply'){
//
//         bot.sendMessage(chatId, 'Answer',{
//             reply_markup:{
//                 force_reply: true
//             }
//         })
//     } else {
//         bot.sendMessage(chatId,'Keyboards',{
//             reply_markup:{
//                 keyboard: [
//                     [{
//                         text: 'Send location',
//                         request_location: true
//                     }],
//                     ['Reply', 'Clothe'],
//                     [{
//                     text: 'Send contact',
//                         request_contact: true
//                     }]
//                 ],
//                 one_time_keyboard: true
//             }
//         })
//     }
//
//     // bot.sendMessage(chatId,'Keyboards',{
//     //     reply_markup:{
//     //         keyboard: [
//     //             ['Send location'],
//     //             ['Reply', 'Clothe'],
//     //             ['Send contact']
//     //         ]
//     //     }
//     // })
// });

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

//5 Обработка команд
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

//4 Получение сообщения от пользователя
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
