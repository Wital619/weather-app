import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {RegData} from '../../../models/reg-data.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
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

    function checkHavingNumber (control: FormControl) {
      return /\d+/.test(control.value) ? null : { passwordWithoutNumber: true };
    }

    function checkHavingUpperLetter (control: FormControl) {
      return /[A-ZА-Я]+/.test(control.value) ? null : { passwordWithoutUpperLetter: true };
    }

    function checkEmail (control: FormControl) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value) ? null : { emailInvalid: true };
    }

    function checkPasswordsMismatch (group: FormGroup) {
      return group.get('password').value === group.get('confirmPassword').value ? null : { mismatch: true };
    }
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
            this.router.navigate(['/login']);
          },
          err => {
            console.error('Couldn\'t register', err);
          }
        );
    }
  }
}
