import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainBoardComponent} from './components/main-board/main-board.component';
import {RouterModule} from '@angular/router';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {CardComponent} from './components/card/card.component';
import {CardCreatorDialogComponent} from "./components/card-creator-dialog/card-creator-dialog.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditCardDialogComponent } from './components/edit-card-dialog/edit-card-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    MainBoardComponent,
    CardComponent,
    CardCreatorDialogComponent,
    EditCardDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild([
      {path: '', component: MainBoardComponent}
    ]),
    PerfectScrollbarModule
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
