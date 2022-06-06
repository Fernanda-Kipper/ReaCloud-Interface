import { Resource } from "../Interfaces/resource"

export const mountFormDefaultValues =(resource?: Resource) => {
  return { 
    content: {
      title: resource?.title,
      subject: resource?.subject,
      type: resource?.type,
      description: resource?.description,
      external_url: resource?.external_url,
      relation: resource?.relation
    },
    intelectual_property: {
      author: resource?.author,
      license: resource?.license,
      contributor: resource?.contributor,
      publisher: resource?.publisher
    },
    instantiations: {
      date_of_publishment: resource?.date_of_publishment,
      audience: resource?.audience,
      language: resource?.language,
      keywords: resource?.keywords,
      format: resource?.format,
      technical_requirements: resource?.technical_requirements,
      description_of_technical_requirements: resource?.description_of_technical_requirements,
    },
    media: {
      video: resource?.video_link ?? ''
    }
  }
}