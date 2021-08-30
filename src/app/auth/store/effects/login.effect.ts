import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  loginFailureAction,
  loginSuccessAction,
  loginAction
} from 'src/app/auth/store/actions/login.action';

@Injectable()
export class LoginEffect {

  constructor(private persistenceService: PersistenceService,
              private authService: AuthService,
              private actions$: Actions,
              private router: Router) {
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({request}) =>
      this.authService.login(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistenceService.set('accessToken', currentUser.token);
          return loginSuccessAction({currentUser});
        }),
        catchError(
          (errorResponse: HttpErrorResponse) => of(
            loginFailureAction({errors: errorResponse.error.errors})
          )
        )
      )
    ),
  ));

  redirectAfterSubmit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => this.router.navigateByUrl('/'))
      ),
    {dispatch: false}
  );

}
