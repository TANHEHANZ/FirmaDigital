import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Toast } from 'primeng/toast';
import { SignedService } from '../../../../application/services/signed.service';
import { responceSigned } from '../../../../application/models/interfaces/api/signed';

@Component({
  selector: 'app-signed',
  imports: [NgFor, Toast, CommonModule],
  templateUrl: './signed.component.html',
})
export class SignedComponent implements OnInit {
  signedService = inject(SignedService);
  data: responceSigned[] = [];
  ngOnInit(): void {
    this.signed();
  }
  today: number = Date.now();

  signed() {
    this.signedService.docuemntsSigned().subscribe({
      next: (response) => {
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        // this.data = data;
        console.log(this.data);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
