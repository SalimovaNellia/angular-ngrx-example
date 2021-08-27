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
  registerFailureAction,
  registerSuccessAction,
  registerAction
} from 'src/app/auth/store/actions/register.action';

@Injectable()
export class RegisterEffect {

  constructor(private persistenceService: PersistenceService,
              private authService: AuthService,
              private actions$: Actions,
              private router: Router) {
  }

  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({request}) =>
      this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          this.persistenceService.set('accessToken', currentUser.token);
          return registerSuccessAction({currentUser});
        }),
        catchError(
          (errorResponse: HttpErrorResponse) => of(
            registerFailureAction({errors: errorResponse.error.errors})
          )
        )
      )
    ),
  ));

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() => this.router.navigateByUrl('/'))
    ),
    {dispatch: false}
  );

}
