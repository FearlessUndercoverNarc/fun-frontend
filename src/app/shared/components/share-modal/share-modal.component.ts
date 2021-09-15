import {Component, OnInit} from '@angular/core';
import {ShareModalService} from "../../services/share-modal.service";
import {UserOnPage} from "../../../modules/main-screen/interfaces/on-page/user-on-page";
import {AccountService} from "../../services/account.service";
import {ShareFolderService} from "../../../modules/main-screen/services/share-folder.service";
import {FoldersService} from "../../../modules/main-screen/services/folders.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.sass']
})
export class ShareModalComponent implements OnInit {

  isModalShown: boolean = false;

  usersOnPage: UserOnPage[] = [];

  constructor(
    private _shareFolderService: ShareFolderService,
    private _shareModalService: ShareModalService,
    private _foldersService: FoldersService,
    private _accountService: AccountService,
    private _httpClient: HttpClient
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
          }, () => {
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
        console.log(this.usersOnPage[i])

        if (this._foldersService.isFolderSelected) {
          this._shareFolderService.share(this.getSelectedFolderId(), this.usersOnPage[i].user.id, this.usersOnPage[i].canEdit)
            .subscribe(() => {
              console.log('shared to user #' + this.usersOnPage[i].user.id)
            }, error => {
              console.log(error)
            });
        } else {
          this._httpClient.get<void>(`${environment.apiUrl}/${this._accountService.ApiVersion}/DeskShare/share`, {
            params: {
              id: this.getSelectedFolderId().toString(),
              recipientId: this.usersOnPage[i].user.id.toString(),
              hasWriteAccess: this.usersOnPage[i].canEdit ? 'true' : 'false'
            }
          }).subscribe(() => {

          })

        }
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
