import axios from "axios";


/**
 * https://core.telegram.org/bots/api#sendmessage
 * @chat_id id получателя в Telegram
 * @html текст сообщения, можно в формате html
 * @reply_markup клавиатура под сообщением, может быть null
 * */

export async function sendTelegramMessage(chat_id, html, reply_markup) {

    const token = process.env.TELEGRAM_BOT_TOKEN
    const url = "https://api.telegram.org/bot" + token + "/sendMessage"
    let result

    const data = {
        text: html.replace(/\\n/g, "\n"),
        chat_id: chat_id,
        disable_web_page_preview: true,
        parse_mode: 'html',
    }


    if (reply_markup) {
        data['reply_markup'] = reply_markup
    }

    try {
        await axios.post(url, data, {
            headers: {'Content-type': 'application/json'}
        })
        result = {ok: true}
    } catch (e) {
        console.error(e.response.data)

        result = {ok: false}
    }
    return result
}

/**
 * https://core.telegram.org/bots/api#sendphoto
 * @chat_id id получателя в Telegram
 * @html текст сообщения, можно в формате html
 * @reply_markup клавиатура под сообщением, может быть null
 * */

export async function sendTelegramPhoto(chat_id, photo_url, caption, reply_markup) {

    const token = process.env.TELEGRAM_BOT_TOKEN
    const url = "https://api.telegram.org/bot" + token + "/sendPhoto"
    let result

    const data = {
        // photo: photo_url.replace(/\\n/g, "\n"),
        photo: "https://media.istockphoto.com/id/1252787937/tr/vekt%C3%B6r/izlenim.jpg?s=1024x1024&w=is&k=20&c=jxkPFyMq0rlpc7B8IUm0Bjf5WhnpYvAyE2hcfboQf68=",
        chat_id: chat_id,
        caption: caption,
        disable_web_page_preview: true,
        parse_mode: 'html',
    }

    if (reply_markup) {
        data['reply_markup'] = reply_markup
    }

    try {
        await axios.post(url, data, {
            headers: {'Content-type': 'application/json'}
        })
        result = {ok: true}
    } catch (e) {
        console.error(e.response.data)

        result = {ok: false}
    }

    return result

}

//TODO: реализовать
//https://core.telegram.org/bots/api#getfile
export async function getFileUrlById(file_id): Promise<string> {

    const token = process.env.TELEGRAM_BOT_TOKEN
    const url = "https://api.telegram.org/bot" + token + "/getFile"
    let result

    const data = {
        file_id: file_id
    }

    try {
        const res = await axios.post(url, data, {
            headers: {'Content-type': 'application/json'}
        })

        console.error(res.data);
        result = "https://api.telegram.org/file/bot" + token + "/" + res.data.result.file_path

    } catch (e) {
        console.error(e.response.data)

        result = null
    }

    return result
}


export function getBiggestPhoto(photos) {
    let max_size = 0;
    let biggest_photo

    for (let photo of photos) {
        if (photo.file_size > max_size) {
            max_size = photo.file_size;
            biggest_photo = photo;
        }
    }

    if (biggest_photo) {
        return biggest_photo;
    }

    console.log('Something went wrong!');
}
