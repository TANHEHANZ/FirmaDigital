import { Component, inject } from '@angular/core';
import { DrawerService } from '../../../../../application/global/drawer.service';
import { SignedService } from '../../../../../application/services/signed.service';

@Component({
  selector: 'informationFile',
  imports: [],
  template: `<section>Historial del documento</section>`,
})
export default class InformationFile {
  drawerService = inject(DrawerService);
  historyS = inject(SignedService);
  infoHistory: any;

  ngOnInit() {
    this.drawerService.getData().subscribe((data) => {
      if (data && data.id) {
        this.historyS.signedHistory(data.id).subscribe({
          next: (res: any) => {
            console.log(res.data);

            this.infoHistory = res.data;
          },
          error: (err) => {
            console.error('Error fetching user data:', err);
          },
        });
      }
    });
  }
}
