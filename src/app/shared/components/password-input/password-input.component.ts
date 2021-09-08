import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})
export class PasswordInputComponent implements OnInit, ControlValueAccessor {
  @Input('validators') validators: ValidatorFn[] = []

  @ViewChild('input') input: any

  value: string = ''
  inputForm: FormGroup = new FormGroup({})

  inputType: string = 'password'
  showPasswordIcon: string = 'visibility'

  constructor() {
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: string): void {
    this.value = value
    this.onChange(this.value)
    this.onTouched()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      'input': new FormControl('', this.validators)
    })
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  public focus(): void {
    this.input.nativeElement.focus();
  }

  update(): void {
    this.value = this.inputForm.value.input
    this.onChange(this.value)
  }

  togglePasswordVisibility(): void {
    this.inputType = this.inputType == 'password' ? 'text' : 'password'
    this.showPasswordIcon = this.inputType == 'password' ? 'visibility' : 'visibility_off'
  }


}
