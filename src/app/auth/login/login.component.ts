import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isSubmittingSelector, validationErrors } from 'src/app/auth/store/selectors';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { loginAction } from 'src/app/auth/store/actions/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public validationErrors$: Observable<BackendErrorsInterface | null>;
  public isSubmitting$: Observable<boolean>;

  public form: FormGroup;

  public constructor(private store$: Store<AppStateInterface>) {}

  public ngOnInit() {
    this.initForm();
    this.initValues();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  private initValues(): void {
    this.isSubmitting$ = this.store$.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store$.pipe(select(validationErrors));
  }

  public onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.value
    };

    this.store$.dispatch(loginAction({request}))
  }
}
