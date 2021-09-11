import { HttpClient } from "@angular/common/http";
import { ApiAreas } from "../enums/api-areas.enum";
import { APIControllers } from "../enums/api-controllers.enum";
import { Board } from "../interfaces/board.interface";
import { BasicCRUD } from "./basic-crud.service";

export class BoardService extends BasicCRUD<Board> {

    postfix: string = ''

    constructor(private _httpClient: HttpClient) {
        super(ApiAreas.Shared, APIControllers.Board, _httpClient);
        this.postfix = APIControllers.Board;
    }
}