import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationExtras } from '@angular/router';
import { CreationAccountService } from '../creation-account.service';
import { ProductData } from '../../produit.interface';
import { UserData } from '../../user.interface';
import { Panier } from '../../panier.interface';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']  // Corrigé pour utiliser styleUrls
})
export class ProduitComponent implements OnInit {
  response: any;
  produits: ProductData[] = [];
  user!: UserData;
  panier!: Panier;

  constructor(
    private creationAccount: CreationAccountService,
    private router: Router
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.response = currentNavigation?.extras.state?.['response'];
  }

  ngOnInit(): void {
    if (!this.response) {
      this.router.navigate(['/con']);
    } else {
      this.user = this.response;
      this.creationAccount.getProducts().subscribe({
        next: (response) => {
          this.produits = response;
          console.log('Produits chargés', response);
        },
        error: (error) => console.error('Erreur de chargement des produits', error)
      });

      this.creationAccount.getPanierById(this.user.id).subscribe({
        next: (response) => this.panier = response,
        error: (error) => console.error('Erreur de chargement du panier', error)
      });
    }
  }

  naviguerAvecExtras(route: string) {
    const navigationExtras: NavigationExtras = {
      state: { response: this.user }
    };
    this.router.navigate([route], navigationExtras);
  }

  addProduct(productId: number) {
    this.creationAccount.addProduct(productId, 1, this.panier.id).subscribe({
      next: () => alert('Produit ajouté avec succès'),
      error: (error) => alert('Erreur lors de l\'ajout au panier: ' + error.message)
    });
  }
}
