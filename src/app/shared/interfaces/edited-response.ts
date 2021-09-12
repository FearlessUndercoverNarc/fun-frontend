import {EditedDesk} from "./edited-desk";
import {EditedFolder} from "./editedFolder";

export interface EditedResponse {
  agreed: boolean,
  data: EditedDesk | EditedFolder | null
}
