export const FormatDate = (dateUnformatted: string) => {
  const dates = dateUnformatted.split('-')

  if(dates.length < 2) return 'Data não identificada'

  return `${dates[1]}/${dates[2]}/${dates[0]}`
}