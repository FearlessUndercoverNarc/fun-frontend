export interface AccountDto {
  id: number,
  fio: string,
  password: string
}

export interface UpdateAccountDto {
  fio: string,
  password: string
}
