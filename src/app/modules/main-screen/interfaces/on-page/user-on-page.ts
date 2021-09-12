import {UserDto} from "../../../../shared/interfaces/dto/user-dto.interface";

export interface UserOnPage {
  user: UserDto,
  isSelected: boolean,
  canEdit: boolean
}
