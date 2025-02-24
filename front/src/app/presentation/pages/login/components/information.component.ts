import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';

@Component({
  selector: 'login-informacion',
  // imports: [ButtonPrimaryComponent],
  template: `
    <div
      class="bg-grid h-screen flex justify-center items-center relative shadow-lg border-r border-gray-300"
    >
      <p class="w-56 h-56 bg-primary absolute blur-xl rounded-full"></p>

      <section
        class="isolate w-[80%] h-[80%] rounded-xl bg-white/60 shadow-lg ring-2 ring-black/5 p-8 flex justify-center items-start flex-col"
      >
        <img
          src="TokenConected.png"
          alt="Token"
          class="w-1/2 aspect-auto mx-auto"
        />
        <p class="bg-primary text-white px-2 py-1 rounded-md">¡Importante!</p>
        <h2 class="text-4xl w-2/3 font-medium">
          <span class="block"
            >Necesitas un <span class="text-primary">token</span> y</span
          >
          <span class="block"
            >tener instalado <span class="text-primary">Jacubitus</span>.</span
          >
        </h2>
        <button
          (click)="instalar()"
          class="text-primary/70 underline font-semibold  cursor-pointer hover:text-primary"
        >
          <p>Instalar Jacubitus</p>
        </button>
      </section>
    </div>
  `,
})
export class LoginInformacionComponent {
  instalar() {
    window.open(
      'https://firmadigital.bo/herramientas/jacobitus-escritorio/',
      '_blank'
    );
  }
}
