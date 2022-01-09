export type Evaluation = {
  Id: string
  Message: string
  Profile: string
  Rate: number
  UserId: string
  Username: string
}

export type EvaluationsPayload = {
  average: number,
  evaluations: Evaluation[]
}

export type EvaluationFormPayload = {
  stars: number,
  message?: string,
}