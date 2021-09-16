export interface UpdateAccountDto {
  fio: string,
  password: string
}

export interface AccountDto extends UpdateAccountDto {
  id: number
}
