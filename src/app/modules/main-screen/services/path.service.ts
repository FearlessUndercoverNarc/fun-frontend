import {Injectable} from "@angular/core";
import {PathPart} from "../../../shared/interfaces/path-part.interface";
import {LocalStorageEnum} from "../../../shared/enums/local-storage.enum";

@Injectable({
  providedIn: 'root'
})
export class PathService {
  private _path: PathPart[] = [];

  get parentFolderId(): number {
    return this._path[this._path.length - 1].folderId;
  }

  set path(newPath: PathPart[]) {
    this._path = newPath;
    localStorage.setItem(LocalStorageEnum.Path, JSON.stringify(this._path));
  }

  get path(): PathPart[] {
    if (!this._path.length) {
      this._path = JSON.parse(this.getPathFromLocalStorage());
    }
    console.log(this._path)
    return this._path;
  }

  private getPathFromLocalStorage(): string {
    if (localStorage.getItem(LocalStorageEnum.Path) === null) {
      return '[]';
    } else {
      return localStorage.getItem(LocalStorageEnum.Path) + ''
    }
  }

  upper(): void {
    this._path.pop();
  }

  deeper(deepedFolder: PathPart): void {
    this._path.push(deepedFolder);
    this.path = this._path;
  }

  isRoot(): boolean {
    return !this.path.length;
  }
}
