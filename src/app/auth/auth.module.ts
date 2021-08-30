import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { BackendErrorMessagesModule } from 'src/app/shared/modules/backend-error-messages/backend-error-messages.module';
import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { LoginEffect } from 'src/app/auth/store/effects/login.effect';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { reducers } from 'src/app/auth/store/reducers';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,

        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([RegisterEffect, LoginEffect]),
        BackendErrorMessagesModule
    ],
  providers: [
    PersistenceService,
    AuthService
  ]
})
export class AuthModule { }
