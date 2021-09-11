import {DeskDto} from "./desk-dto.interface";

export interface FolderDto {
  id: number,
  title: string,
  createdAt: string,
  lastUpdatedAt: string,
  authorAccountId: number,
  parentId: number | null,
  desks: DeskDto[]
}
