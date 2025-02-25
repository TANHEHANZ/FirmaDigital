import { Component, input } from '@angular/core';

@Component({
  selector: 'file-signed',
  imports: [],
  template: `
    <section
      class="backdrop-blur-xl bg-gradient-to-r from-blue-900 via-blue-900 to-indigo-800 text-white rounded-xl p-4 flex flex-col gap-4 border-2 border-gray-300 relative overflow-auto w-[450px] h-full justify-center items-center"
    >
      <h3 class=" text-2xl text-center">Informacion del documento firmado</h3>
    </section>
  `,
})
export class FileSigned {
  slot = input<number>();
}
