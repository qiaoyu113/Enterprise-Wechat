import Cookies from 'js-cookie'

const TokenKey = localStorage.getItem('token')

export function getToken() {
  return TokenKey
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
