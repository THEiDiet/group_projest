export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
}

export type SetNewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
