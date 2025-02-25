import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Toast } from 'primeng/toast';
import { SignedService } from '../../../../application/services/signed.service';
import { responceSigned } from '../../../../application/models/interfaces/api/signed';

@Component({
  selector: 'app-signed',
  imports: [Toast, CommonModule],
  templateUrl: './signed.component.html',
})
export class SignedFileComponent implements OnInit {
  signedService = inject(SignedService);
  data: responceSigned[] = [];
  pdfUrl: string | null = null;
  ngOnInit(): void {
    this.signed();
  }
  today: number = Date.now();

  signed() {
    this.signedService.docuemntsSigned().subscribe({
      next: (response) => {
        console.log(response);
        this.data = response.data as responceSigned[];
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
