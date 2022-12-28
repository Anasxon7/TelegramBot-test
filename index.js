// require ('dotenv').config()
// const express = require('express')
// const bodyParser = require('body-parser')
// const axios = require('axios')

// const {TOKEN, SERVER_URL} = process.env
// const TELEGRAM_API = `https:/api.telegram.org/bot${TOKEN}`
// const URI = `/webhook/${TOKEN}`
// const WEBHOOK_URL = SERVER_URL+URI

// const app = express()
// app.use(bodyParser.json())

// const init = async () => {
//     const  res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data);
// }

// app.listen(process.env.PORT || 5000, async() => {
//     console.log('🚀 app running on port', process.env.PORT || 5000)
//     await init()
// })



TelegramApi = require('node-telegram-bot-api');
const api = '5753168004:AAE2lzlciti4FuQOZKy2AfhKe2WekdYz3jQ'

const bot = new TelegramApi(api, {polling: true})
const chats = {}
const gameOptions = {asdasdasdasd
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
        [{text: '0', callback_data: '0'}]
        ]
    })
}
const againOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Play again ):', callback_data: '/again'}]
        ]
    })
}

bot.setMyCommands ( [
    {command: '/start', description: 'Boshlangich uchrashuv'},
    {command: '/game', description: 'Oyinni boshlash uchun'},
    {command: '/info', description: 'Boshlangich malumot'},
])

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Siz 0 dan 9 gacha son tanladim.')
    await  bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/192/9.webp')
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    return bot.sendMessage(chatId, 'Sonni toping!', gameOptions )
}

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
    
        if(text === '/start') {
          await  bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp')
          return  bot.sendMessage(chatId, `Assalomu alaykum! ${msg.from.first_name} `)
        }
    
        if(text === '/info') {
           await  bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/12.webp')
           return bot.sendMessage(chatId, `Game By THUNDER4TOSTOBOY`)
        }

        if(text === '/game') {
           return startGame(chatId)
        }

        return bot.sendMessage(chatId, 'Man bu narsani bilmayman')

    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id
        // console.log(data);
        if(data === '/again') {
            return startGame(chatId)
        }
        if(data === chats[chatId]) {
            return bot.sendMessage(chatId, `Tabriklayman, siz tog'ri soni tanladingiz! ${chats[chatId]}`)
        } else {
            return bot.sendMessage(chatId, `Afsuski, siz tog'ri javob topa olmading ${chats[chatId]}`, againOption)
        }
        bot.sendMessage(chatId, `Siz ${data} tanlading`)
    })
    
}

start()