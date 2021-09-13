import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CardService} from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-card-creator-dialog',
  templateUrl: './card-creator-dialog.component.html',
  styleUrls: ['./card-creator-dialog.component.sass']
})
export class CardCreatorDialogComponent implements OnInit {

  colors: string[] = ['#7BC86C', '#81e66d', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5']
  selectedColor: string = this.colors[0]
  selectedColorId: number = 0
  uploadedImageFileName: string = ''
  @Input() deskId: number = 1

  @Input() position = {} as { offsetX: number, offsetY: number }
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>()

  @ViewChild('fileInput') fileInput!: ElementRef

  cardForm = {} as FormGroup

  constructor(
    private _matSnackBar: MatSnackBar,
    private _cardService: CardService
  ) {
  }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      externalUrl: new FormControl(''),
    })
  }

  submit(): void {
    if (this.cardForm.invalid) return;

    const value = this.cardForm.value
    value.image = this.uploadedImageFileName
    value.deskId = this.deskId
    value.colorHex = this.selectedColor
    value.x = this.position.offsetX
    value.y = this.position.offsetY

    this._cardService.create(value)
      .subscribe(() => {
        this.cardForm.reset()
        this.selectedColor = this.colors[0]
        this.selectedColorId = 0
        this.uploadedImageFileName = ''
        this.onClose.emit()
      })
  }

  selectColor(id: number) {
    this.selectedColor = this.colors[id]
    this.selectedColorId = id
  }

  uploadFile() {
    console.log(this.fileInput.nativeElement.files[0])

    this._cardService.uploadImage(this.fileInput.nativeElement.files[0])
      .subscribe(imageDto => {
        this._matSnackBar.open('Изображение загружено', '', {duration: 3000})
        this.uploadedImageFileName = imageDto.image
      })
  }

}
