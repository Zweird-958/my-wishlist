export type SignInData = {
  email: string
  password: string
}
export type SignUpData = {
  username: string
} & SignInData

export type UserShared = {
  id: number
  username: string
}
