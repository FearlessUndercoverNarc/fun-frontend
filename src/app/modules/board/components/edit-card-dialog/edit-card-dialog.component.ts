import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Card} from 'src/app/shared/interfaces/card.interface';
import {CardService} from 'src/app/shared/services/card.service';

@Component({
  selector: 'app-edit-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrls: ['./edit-card-dialog.component.sass']
})
export class EditCardDialogComponent implements OnInit {

  @Input() card = {} as Card

  colors: string[] = ['#7BC86C', '#81e66d', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5']
  selectedColor: string = this.colors[0]
  selectedColorId: number = 0
  uploadedImageFileName: string = ''
  @Input() deskId: number = 0

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
      title: new FormControl(this.card.title, Validators.required),
      description: new FormControl(this.card.description, Validators.required),
      externalUrl: new FormControl(this.card.externalUrl),
    })

    this.selectedColor = this.card.colorHex
    this.selectedColorId = this.colors.findIndex(color => color == this.selectedColor)
    this.uploadedImageFileName = this.card.image || ''
  }

  submit(): void {

    console.log('something submits a form')

    if (this.cardForm.invalid) return;

    const value = {
      id: this.card.id,
      ...this.cardForm.value,
      image: this.uploadedImageFileName,
      deskId: this.deskId,
      colorHex: this.selectedColor,
      x: this.card.x,
      y: this.card.y
    }

    this._cardService.update(value)
      .subscribe(() => {
        // this.onClose.emit()
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

  removeCard() {
    this._cardService.remove(this.card.id)
      .subscribe(() => {
        this.onClose.emit()
      })
  }
}
