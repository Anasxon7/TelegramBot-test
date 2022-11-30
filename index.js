TelegramApi = require('node-telegram-bot-api');

const api = '5753168004:AAE2lzlciti4FuQOZKy2AfhKe2WekdYz3jQ'

const bot = new TelegramApi(api, {polling: true})
const chats = []
const gameOptions = {
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}]
        ]
    })
}

bot.setMyCommands ( [
    {command: '/start', description: 'Boshlangich uchrashuv'},
    {command: '/game', description: 'Oyinni boshlash uchun'},
    {command: '/info', description: 'Boshlangich malumot'},
])


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
            await bot.sendMessage(chatId, 'Siz 0 dan 9 gacha son tanladim.')
            await  bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/192/9.webp')
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Sonni toping!', gameOptions )
        }

        return bot.sendMessage(chatId, 'Man bu narsani bilmayman')

    })
    
}

start()