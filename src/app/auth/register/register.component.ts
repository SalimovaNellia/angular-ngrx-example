import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface';
import { isSubmittingSelector, validationErrors } from 'src/app/auth/store/selectors';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { registerAction } from 'src/app/auth/store/actions/register.action';


@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
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
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  private initValues(): void {
    this.isSubmitting$ = this.store$.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store$.pipe(select(validationErrors));
  }

  public onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.value
    };

    this.store$.dispatch(registerAction({request}))
  }
}
