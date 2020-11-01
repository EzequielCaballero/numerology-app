export enum RequestType {
    Contact = 'contact',
    Result = 'result'
}

export type THeader = {
    Accept: string,
    'Content-Type': string,
    'Origin-Type': RequestType,
    'Token': string
}

export type TBody = {
    lang: string,
    from: string,
    to?: string,
    subject?: string,
    username: string,
    message:{
        text: string,
        birth?: string,
        url?: string
    }
}
