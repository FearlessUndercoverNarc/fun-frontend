import {Component, OnInit, SkipSelf} from '@angular/core';
import {ShareModalService} from "../../services/share-modal.service";
import {UserDto} from "../../interfaces/dto/user-dto.interface";
import {UserOnPage} from "../../../modules/main-screen/interfaces/on-page/user-on-page";
import {skip} from "rxjs/operators";
import {AccountService} from "../../services/account.service";
import {ShareFolderService} from "../../../modules/main-screen/services/share-folder.service";
import {FoldersService} from "../../../modules/main-screen/services/folders.service";

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.sass']
})
export class ShareModalComponent implements OnInit {

  isModalShown: boolean = false;

  usersOnPage: UserOnPage[] = [];

  constructor(
    @SkipSelf() private _shareFolderService: ShareFolderService,
    @SkipSelf() private _shareModalService: ShareModalService,
    @SkipSelf() private _foldersService: FoldersService,
    @SkipSelf() private _accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this._shareModalService.shareModalShown
      .subscribe(() => {
        this._accountService.getAll()
          .subscribe((result) => {
            this.usersOnPage = result
              .filter(u => {
                return u.id != this._accountService.id
              }).map(u => {
                return {user: u, isSelected: false, canEdit: false}
              })

            this.isModalShown = true;
          }, error => {
            this.isModalShown = false;
            alert('Произошла ошибка загрузки пользователей.');
          })
      })

    this._shareModalService.modalHidden
      .subscribe(() => {
        this.isModalShown = false;
      })
  }

  toggleUserToShare(user: UserOnPage): void {
    if (!user.isSelected) {
      user.isSelected = true;
    } else if (!user.canEdit) {
      user.canEdit = true;
    } else {
      user.canEdit = false;
      user.isSelected = false;
    }
  }

  shareToSelected(): void {
    console.log('here')

    for (let i = 0; i < this.usersOnPage.length; i++) {
      if (this.usersOnPage[i].isSelected) {
        this._shareFolderService.share(this.getSelectedFolderId(), this.usersOnPage[i].user.id, this.usersOnPage[i].canEdit)
          .subscribe(() => {
            console.log('shared to user #' + this.usersOnPage[i].user.id)
          }, error => {
            console.log(error)
          });
      }
    }

    this.isModalShown = false;

    this.unselectAll();
  }

  private getSelectedFolderId(): number {
    return this._foldersService.lastSelectedFolderId;
  }

  getImgStr(userOnPage: UserOnPage): string {
    if (userOnPage.isSelected) {
      if (userOnPage.canEdit) {
        return 'assets/icons/can-edit-icon.svg'
      } else {
        return 'assets/icons/read-only-icon.svg'
      }
    } else {
      return '';
    }
  }

  private unselectAll() {
    for (let i = 0; i < this.usersOnPage.length; i++) {
      this.usersOnPage[i].isSelected = false;
      this.usersOnPage[i].canEdit = false;
    }
  }
}