import {NewCase} from "../../../../interfaces/new-case.interface";
import {NewFolder} from "../../../../interfaces/new-folder.interface";
import {NewDesk} from "../../../../interfaces/new-desk.interface";

export interface CreationResponse {
  agreed: boolean,
  data: NewCase | NewFolder | NewDesk | null
}
