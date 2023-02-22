export interface Task {
  id: string
  title: string
  description: string
}

export interface UserInfo {
  username: string
  email: string
  birthday: string
  avatar: string
  gender: string
}

export interface User {
  username: string
  email: string
  password: string
  birthday: string
  avatar: string
  gender: string
  agreement: boolean
}

export interface CsrfToken {
  csrf_token: string
}
