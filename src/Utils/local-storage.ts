import { LOCALSTORAGE_KEYS } from '../Constants/local-storage-keys'

export const saveToken = (token: string) => {
  const key = LOCALSTORAGE_KEYS.token
  localStorage.setItem(key, JSON.stringify(token))
}

export const getToken = (): string => {
  const key = LOCALSTORAGE_KEYS.token
  return localStorage.getItem(key)?.replaceAll('"','') || ''
}

export const clearToken = () => {
  const key = LOCALSTORAGE_KEYS.token
  localStorage.removeItem(key)
}