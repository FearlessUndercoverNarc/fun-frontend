import {NewCase} from "../../../../interfaces/new-created/new-case.interface";
import {NewFolder} from "../../../../interfaces/new-created/new-folder.interface";
import {NewDesk} from "../../../../interfaces/new-created/new-desk.interface";

export interface CreationResponse {
  agreed: boolean,
  data: NewCase | NewFolder | NewDesk | null
}
