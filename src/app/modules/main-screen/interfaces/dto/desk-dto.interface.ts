export interface DeskDto {
  id: number,
  title: string,
  description: string,
  createdAt: string,
  lastUpdatedAt: string,
  authorAccountId: number,
  authorAccountFio: string,
  parentId: number | null,
  parentTitle: string
}
