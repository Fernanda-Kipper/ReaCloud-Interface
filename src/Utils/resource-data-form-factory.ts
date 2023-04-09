import { ResourceFormPayload } from "../Interfaces/resource";

export function resourceDataFormFactory(values: ResourceFormPayload){
    const dataForm = new FormData();

    const today = new Date()
    const last_modification =  today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
    const bncc = values.bncc.reduce((acc, item) => acc += item.value + ',', '').slice(0, -1);

    dataForm.append('title', values.title)
    dataForm.append('author', values.author)
    dataForm.append('type', values.type)
    dataForm.append('language', values.language)
    dataForm.append('license', values.license)
    dataForm.append('description', values.description)
    dataForm.append('date_of_publishment', values.date_of_publishment)
    dataForm.append('subject', values.subject)
    dataForm.append('keywords', values.keywords)
    dataForm.append('audience', values.audience)
    dataForm.append('external_url', values.external_url)
    dataForm.append('relation', values.relation)
    dataForm.append('contributor', values.contributor)
    dataForm.append('publisher', values.publisher)
    dataForm.append('format', values.format)
    dataForm.append('technical_requirements', values.technical_requirements.toString())
    dataForm.append('description_of_technical_requirements', values.description_of_technical_requirements)
    dataForm.append('last_modification', last_modification)
    dataForm.append('video', values.video)
    dataForm.append('file', values.file)
    dataForm.append('bncc', bncc)

    return dataForm;
}