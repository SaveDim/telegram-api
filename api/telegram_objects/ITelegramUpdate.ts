/**
 * Объект для отправки сообщений
 */

interface IFrom {
    id: number
}

interface IPhoto {
    file_id: string,
    file_unique_id: string,
    file_size: number,
    width: number,
    height: number
}


interface IMessage {
    text?: string,
    photo?: IPhoto[],
    document? : object,
    from: IFrom
}

export interface ITelegramUpdate {
    update_id: number,
    message?: IMessage,
}