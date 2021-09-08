import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginInputComponent),
      multi: true
    }
  ]
})
export class LoginInputComponent implements OnInit, ControlValueAccessor {
  @Input('validators') validators: ValidatorFn[] = [];
  value: string = ''
  inputForm: FormGroup = new FormGroup({})

  @ViewChild('input') input: any

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

  ngOnDestroy() {
  }

  public disable(): void {
    this.inputForm.get('input')?.disable();
  }

  update(): void {
    this.value = this.inputForm.value.input
    this.onChange(this.value)
  }

}
