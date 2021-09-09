import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import CreatedDto from "../interfaces/dto/created-dto.interface";
import {CreateGroupDto} from "../interfaces/dto/create-group.dto";

export abstract class BasicCRUD<TParam> {

  // This is a simple abstract class which implements all basic CRUD methods

  protected constructor(
    protected postfix: string,
    protected httpClient: HttpClient
  ) {
  }


  getAll(): Observable<TParam[]> {
    return this.httpClient.get<TParam[]>(`${environment.apiUrl}/${this.postfix}/GetAll`)
  }

  create(data: CreateGroupDto): Observable<CreatedDto> {
    return this.httpClient.post<CreatedDto>(`${environment.apiUrl}/${this.postfix}/Create`, data)
  }

  remove(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.postfix}/Remove`, {
      params: {
        id: id.toString(),
      }
    })
  }

  getById(id: number): Observable<TParam> {
    return this.httpClient.get<TParam>(`${environment.apiUrl}/${this.postfix}/GetById`, {
      params: {
        id: id.toString()
      }
    })
  }

  update(element: TParam): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/${this.postfix}/Update`, element)
  }

}
