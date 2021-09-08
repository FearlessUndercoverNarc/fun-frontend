import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../../../shared/services/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IsValidLoginRequestDto} from "../../../../shared/interfaces/is-valid-login-request-dto.interface";
import {LoginRequestDto} from "../../../../shared/interfaces/login-request-dto.interface";
import {Router} from "@angular/router";
import {LoginInputComponent} from "../../../../shared/components/login-input/login-input.component";
import {PasswordInputComponent} from "../../../../shared/components/password-input/password-input.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  ngOnInit(): void {
  }
}

