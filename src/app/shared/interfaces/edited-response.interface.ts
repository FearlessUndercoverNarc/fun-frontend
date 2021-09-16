import {EditedDesk} from "./edited-desk.interface";
import {EditedFolder} from "./edited-folder.interface";

export interface EditedResponse {
  agreed: boolean,
  data: EditedDesk | EditedFolder | null
}
