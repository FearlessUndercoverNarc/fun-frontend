import {DeskDto} from "./desk-dto.interface";

export interface FolderDto {
  title: string,
  createdAt: string,
  lastUpdatedAt: string,
  authorAccountId: number,
  parentId: number | null,
  desks: DeskDto[]
}
