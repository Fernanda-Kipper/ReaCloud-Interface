import { Licenses } from "../Constants/licenses"
import { OptionType } from './option';

export type Resource = {
    id: string,
    audience: string,
    author: string,
    contributor: string,
    date_of_publishment: string,
    description: string,
    description_of_technical_requirements: string,
    external_url: string,
    format: string,
    keywords: string,
    language:  string,
    last_modification: string,
    license: keyof typeof Licenses,
    publisher: string,
    relation: string,
    subject: string,
    technical_requirements: boolean,
    title: string,
    type: string,
    userName: string,
    bncc: string,
    image: {
        url: string
    },
    video_link: string
}

export type ResourceFormPayload = {
    title: string,
    author: string,
    type: string,
    language: string,
    license:  keyof typeof Licenses,
    description: string,
    date_of_publishment: string,
    subject: string,
    keywords: string,
    audience: string,
    external_url: string,
    relation: string,
    contributor: string,
    publisher: string,
    format: string,
    technical_requirements: boolean,
    description_of_technical_requirements: string,
    last_modification: string,
    video: string,
    file: File,
    bncc: OptionType[]
}