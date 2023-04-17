import express, {text} from 'express';
import {getFileUrlById, sendTelegramMessage, sendTelegramPhoto, getBiggestPhoto} from "../services/telegram.service";
import {IMessage} from "../telegram_objects/Message";
import {IMessageWithPhoto} from "../telegram_objects/Photo";
import {ITelegramUpdate} from "../telegram_objects/ITelegramUpdate";

const telegramRouter = express.Router()

/**
 * Отправляет сообщение от имени Telegram бота
 * в тело запроса (req.body) нужно передать JSON объект IMessage: {recipient_id: id получателя, text: текст сообщения},
 */

telegramRouter.post('/sendMessage', async (req, res) => {

    const message_data: IMessage = req.body

    const reply_markup = {
        inline_keyboard: [[
            {text: "Текст кнопки", url: "https://google.com"},
            {text: "Еще кнопка", url: "https://github.com"}],
        ]
    }

    await sendTelegramMessage(message_data.recipient_id, message_data.html, null)

    await sendTelegramMessage(message_data.recipient_id, message_data.html, reply_markup)

    res.json({ok: true})

})

/**
 * Отправляет фото от имени Telegram бота
 * в тело запроса (req.body) нужно передать JSON объект IMessageWithPhoto: {recipient_id: id получателя,
 * photo: ссылка на фото},
 */

telegramRouter.post('/sendPhoto', async (req, res) => {
    const photoData: IMessageWithPhoto = req.body;

    const replyMarkup = {
        inline_keyboard: [[
            { text: "LIKE", url: "https://google.com" },
            { text: "DISLIKE", url: "https://github.com" },
        ]]
    };

    await sendTelegramPhoto(photoData.recipient_id, photoData.photo_url, photoData.caption, replyMarkup);

    res.json({ ok: true });
});

telegramRouter.post('/webHook/1234', async (req, res) => {

    const body: ITelegramUpdate = req.body

    if (!body.message) {
        console.log("has not message")
        res.json({ok: false})
        return
    }

    if (body.message.text) {
        console.log("text", body.message.text)
        const text = body.message.text;
        if (text === 'Привет') {
            await sendTelegramMessage(body.message.from.id, "Добрый день", null);
        }
        if (text !== 'Привет') {
            await sendTelegramMessage(body.message.from.id, 'Ты прислал "' + text + '" Это неизвестный запрос', null);
        }
    }

    if (body.message.photo) {
        console.log("has photo")

        const photos = body.message.photo;

        //найти самое большое фото
        const biggest_photo = await getBiggestPhoto(photos);
        const file_url = await getFileUrlById(biggest_photo.file_id);
        // const downloadedPhoto = await downloadPhoto(file_url)

        // console.log(biggest_photo.file_id)
        console.log({file_url})

        await sendTelegramPhoto(body.message.from.id, file_url, 'Ты прислал это фото', '');
    }


    res.json({ok: true})

})

//

export default telegramRouter
