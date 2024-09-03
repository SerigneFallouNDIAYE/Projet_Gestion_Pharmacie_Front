import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationAccountService } from '../creation-account.service';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { UserData } from '../../user.interface';
import { FactureData } from '../../facture.interface';

@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {

  response: any;
  user!: UserData;
  facture!: FactureData;

  constructor(
    private router: Router,
    private createAccount: CreationAccountService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.response = currentNavigation?.extras.state?.['response'];
  }

  ngOnInit(): void {
    if (this.response == null || this.response == undefined) {
      this.router.navigate(['/con']); // Assurez-vous que la route '/con' est bien configurée.
    } else {
      this.user = this.response;
      if (this.user && this.user.id) {
        this.createAccount.getFacture(this.user.id).subscribe(
          res => {
            this.facture = res;
            console.log(this.facture);
          },
          error => {
            console.error('Erreur lors de la récupération des factures:', error);
            // Ajoutez ici le traitement de l'erreur, par exemple en affichant un message à l'utilisateur.
          }
        );
      }
    }
  }

  naviguerAvecExtras(route: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        response: this.user
      }
    };
    this.router.navigate([route], navigationExtras);
  }

}
