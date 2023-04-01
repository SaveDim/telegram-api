/**
 * Объект для отправки сообщений
 */
//https://core.telegram.org/bots/api#inlinekeyboardmarkup

interface IReplyMarkup {

}

export interface IMessage {
    recipient_id: number
    html: string,
    reply_markup?: object | null
    disable_notification?: boolean,
}