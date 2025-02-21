import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { CustomSelectComponent } from '../../../shared/ui/select.component';

@Component({
  selector: 'user-filter',
  template: `
    <div class="flex gap-4">
      <custom-input type="search" label="Filtrar"></custom-input>
      <custom-select
        label="Filtrar por:"
        [options]="[
          { label: 'Juridica', value: 'Juridica' },
          { label: 'Natural', value: 'Natural' }
        ]"
      />
    </div>
  `,
  imports: [CustomInputComponent, CustomSelectComponent],
})
export class UserFilerComponet {
  // register() {
  //   console.log(this.form.value);
  //   if (this.form.invalid) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Por favor, corrige los errores en el formulario.',
  //       life: 3000,
  //     });
  //     return;
  //   }
  //   this.loginService
  //     .register({
  //       email: this.form.value.email ?? '',
  //       password: this.form.value.password ?? '',
  //       ci: this.form.value.ci ?? '',
  //       name: this.form.value.name ?? '',
  //       idRol: '1',
  //       idUnidad: this.form.value.idUnidad ?? '',
  //       tipo_user: 'Natural',
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         if (response.status === 200 && response.data) {
  //           localStorage.setItem(ACCESS_TOKEN, response.data[0].accessToken);
  //           localStorage.setItem(REFRESH__TOKEN, response.data[0].refreshToken);
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Éxito',
  //             detail: response.message,
  //             life: 3000,
  //           });
  //           this.router.navigate([PATH_ROUTES.LOGOUT]);
  //         }
  //       },
  //       error: (error: any) => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: error.error?.message || 'Ocurrió un error inesperado',
  //           life: 3000,
  //         });
  //       },
  //     });
  // }
}
