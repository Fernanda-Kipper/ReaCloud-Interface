export default interface Recurso{
    audience: string,
    author: string,
    contributor: string,
    covarage: string
    date_of_publishment: string,
    description: string,
    description_of_technical_requirements: string,
    external_url: string,
    format: string,
    id: number,
    keywords: string,
    language: string
    last_modification: string,
    licence: string,
    publisher: string,
    relation: string,
    subject: string,
    technical_requirements: number,
    title: string,
    type: string,
    userName: string,
    image: {
        url: string
    },
    video_link: string
}