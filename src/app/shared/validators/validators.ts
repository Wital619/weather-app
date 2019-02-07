import { FormControl, FormGroup } from '@angular/forms';

export const checkHavingNumber = (control: FormControl) => {
  return /\d+/.test(control.value) ? null : { passwordWithoutNumber: true };
};

export const checkHavingUpperLetter = (control: FormControl) => {
  return /[A-ZА-Я]+/.test(control.value) ? null : { passwordWithoutUpperLetter: true };
};

export const checkEmail = (control: FormControl) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value) ? null : { emailInvalid: true };
};

export const checkPasswordsMismatch = (group: FormGroup) => {
  return group.get('password').value === group.get('confirmPassword').value ? null : { mismatch: true };
};
