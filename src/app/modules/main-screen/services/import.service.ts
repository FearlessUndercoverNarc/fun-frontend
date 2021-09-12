import { Injectable, Output } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ImportService {

    selectedElementsExported: ReplaySubject<void> = new ReplaySubject<void>()
    folderImportFile = {} as File
    boardImportFile = {} as File

    exportSelectedElements(): void {
        this.selectedElementsExported.next();
    }
}