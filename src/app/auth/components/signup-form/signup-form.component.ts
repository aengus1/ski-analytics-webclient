import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmUser, SignupUser} from '../../model/user';
import {SignupStatus} from '../../actions/auth.actions';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  public status: SignupStatus = SignupStatus.NOT_STARTED;
  public signupSuccess = false;
  private signupEmail = '';
  private modalRef: NgbModalRef;
  private modalCloseResult: string;


  @Input()
  set signupStatus(status: SignupStatus) {
    if (status !== SignupStatus.NOT_STARTED) {
      this.signupForm.disable();
    } else {
      this.signupForm.enable();
    }
    if (status !== SignupStatus.SIGNUP_COMPLETE) {
      this.confirmForm.disable();
    } else {
      this.confirmForm.enable();
      this.signupSuccess = true;
    }
    if (status === SignupStatus.CONFIRM_COMPLETE) {
      const options: NgbModalOptions = {
        size: 'lg'
      };
      setTimeout(() => {
          this.modalRef = this.modal.open(this.confirmSuccessModal, options);
          this.modalRef.result.then((result) => {
            this.modalCloseResult = `Closed with: ${result}`;
          }, (reason) => {
            this.modalCloseResult = 'Dismissed';
          });
        }
        , 100);
    }
  }

  @Input() signupErrorMessage: string | null;

  @Input() confirmErrorMessage: string | null;

  @Input() resendConfirmErrorMessage: string | null;

  @Output() submittedSignup = new EventEmitter<SignupUser>();

  @Output() submittedConfirm = new EventEmitter<ConfirmUser>();

  @Output() submittedResendConfirm = new EventEmitter<SignupUser>();

  @ViewChild('confirmSuccessModal', { static: true }) private confirmSuccessModal;

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,20}')
      ]),
      passwordConfirm: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,20}')
        ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)])
  }, this.passwordMatchValidator);

  confirmForm: FormGroup = new FormGroup({
    validationCode: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private modal: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.signupStatus = SignupStatus.NOT_STARTED;
  }

  submitSignup() {
    if (this.signupForm.valid) {
      this.submittedSignup.emit(this.signupForm.value);
      this.signupEmail = this.signupForm.value.username;
    }
  }

  submitConfirm() {
    if (this.confirmForm.valid) {
      this.submittedConfirm.emit({username: this.signupEmail, confirmCode: this.confirmForm.value.validationCode});
    }
  }

  resendConfirm() {
    this.submittedResendConfirm.emit(this.signupForm.value);
  }

  /* edge case when user wants to sign up again.. */
  closeModal() {
    this.modalRef.close();
  }

  gotoLogin() {
    this.modalRef.close();
    this.router.navigateByUrl('/signin');
  }

  passwordMatchValidator(frm: FormGroup) {
    const pass = frm.get('password').value;
    const confirmPass = frm.get('passwordConfirm').value;

    return pass === confirmPass ? null : { mismatch: true };
  }
}

