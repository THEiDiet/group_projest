export type UserT = {
  password: string
  email: string
  rememberMe?: boolean
}
export type AuthResponse = {
  addedUser: {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
  }
}
