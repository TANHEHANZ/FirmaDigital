import { Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
import { PATH_ROUTES } from '../../../application/models/route.enum';
import { ButtonSecundaryComponent } from '../../shared/ui/button/secundary.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import {
  LoginService,
  res_data,
} from '../../../application/services/login.service';
import { res } from '../../../application/models/api.response';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { LoginInformacionComponent } from './components/information.component';
import { FormLoginComponent } from './components/form-login.component';
@Component({
  selector: 'app-login',
  imports: [ButtonModule, LoginInformacionComponent, FormLoginComponent],
  templateUrl: './login.component.html',
  providers: [MessageService],
})
export class LoginComponent {}
