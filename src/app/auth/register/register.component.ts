import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ShowToastrService } from '../../core/services/show-toastr.service';
import { RegData } from '../models/reg-data.model';
import {
  checkEmail,
  checkHavingNumber,
  checkHavingUpperLetter,
  checkPasswordsMismatch
} from '../../shared/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ShowToastrService
  ) { }

  ngOnInit () {
    this.registerForm = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.maxLength(100),
      ]],
      email: ['', [
        Validators.required,
        Validators.maxLength(100),
        checkEmail
      ]],
      passwords: this.fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          checkHavingNumber,
          checkHavingUpperLetter
        ]],
        confirmPassword: ''
      }, { validators: checkPasswordsMismatch })
    });
  }

  get userName () { return this.registerForm.get('userName'); }
  get email () { return this.registerForm.get('email'); }
  get password () { return this.registerForm.get('passwords').get('password'); }
  get passwords () { return this.registerForm.get('passwords'); }

  registerByEmailAndPassword () {
    this.submitted = true;

    if (this.registerForm.valid) {
      const regData: RegData = {
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value,
      };

      this.authService.doRegister(regData)
        .then(
          () => {
            this.toastr.showSuccess('Registration was successful, now you logged in');
            this.router.navigate(['/weather']);
          },
          err => {
            this.toastr.showError('Couldn\'t register you', err);
          }
        );
    }
  }
}
