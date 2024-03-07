export interface Register {
  email: string
  password: string
  passwordConfirm: string
}

export interface Verify {
  code: string
}

export interface Login {
  email : string
  password : string
}