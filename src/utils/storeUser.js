import localStorage from 'localStorage'

const USER_KEY = 'user'
export const saveUser = user => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = () => {
  return localStorage.getItem(USER_KEY)
}
//删除
export const deleteUser = () => {
  localStorage.removeItem(USER_KEY)
}
