import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupUser} from '../../model/user';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() resetErrorMessage: string | null;

  @Output() submitted = new EventEmitter<SignupUser>();

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    confirmCode: new FormControl('', Validators.required),
    password: new FormControl('',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,20}')
      ]),
    passwordConfirm: new FormControl('', [
      Validators.required
    ])
  }, this.passwordMatchValidator);

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  passwordMatchValidator(frm: FormGroup) {
    const pass = frm.get('password').value;
    const confirmPass = frm.get('passwordConfirm').value;

    return pass === confirmPass ? null : { mismatch: true };
  }

}
