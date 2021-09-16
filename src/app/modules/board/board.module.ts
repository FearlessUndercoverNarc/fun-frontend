import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainBoardComponent} from './components/main-board/main-board.component';
import {RouterModule} from '@angular/router';

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {CardComponent} from './components/card/card.component';
import {CardCreatorDialogComponent} from "./components/card-creator-dialog/card-creator-dialog.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {EditCardDialogComponent} from './components/edit-card-dialog/edit-card-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HistoryContainerComponent} from './components/history-container/history-container.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    CardComponent,
    CardCreatorDialogComponent,
    EditCardDialogComponent,
    HistoryContainerComponent,
    MainBoardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: MainBoardComponent}
    ]),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class BoardModule {
}
