import { Resource } from "../Interfaces/resource";


export const generateResource = (partialResource: Partial<Resource>): Resource => {
    return { 
        id: partialResource.id ?? '',
        audience: partialResource.audience ?? '',
        author: partialResource.author ?? '',
        contributor: partialResource.contributor ?? '',
        date_of_publishment: partialResource.date_of_publishment ?? '',
        description: partialResource.description ?? '',
        description_of_technical_requirements: partialResource.description_of_technical_requirements ?? '',
        external_url: partialResource.external_url ?? '',
        format: partialResource.format ?? '',
        keywords: partialResource.keywords ?? '',
        language:  partialResource.language ?? '',
        last_modification: partialResource.last_modification ?? '',
        license: partialResource.license ?? 'CCBY',
        publisher: partialResource.publisher ?? '',
        relation: partialResource.relation ?? '',
        subject: partialResource.subject ?? '',
        technical_requirements: !!partialResource.technical_requirements ? partialResource.technical_requirements : true,
        title: partialResource.title ?? '',
        type: partialResource.type ?? '',
        userName: partialResource.userName ?? '',
        video_link: partialResource.video_link ?? '',
        bncc: partialResource.bncc ?? '',
        image: {
            url: partialResource.image?.url ?? ''
        }
    }
}