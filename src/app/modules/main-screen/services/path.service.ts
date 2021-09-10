import {Injectable} from "@angular/core";
import {PathPart} from "../../../shared/interfaces/path-part.interface";

@Injectable({
  providedIn: 'root'
})
export class PathService {
  private _path: PathPart[] = [];

  set path(newPath: PathPart[]) {
    this._path = newPath;
  }

  get path(): PathPart[] {
    return this._path;
  }

  upper(): void {
    this._path.pop();
  }

  deeper(deepedFolder: PathPart): void {
    this._path.push(deepedFolder);
  }

  isRoot(): boolean {
    return !this._path.length;
  }
}
