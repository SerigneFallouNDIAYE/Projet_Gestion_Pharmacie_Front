
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { UserData } from '../../user.interface';
import { CommonModule } from '@angular/common';
import { Panier } from '../../panier.interface';
import { CreationAccountService } from '../creation-account.service';
import { ProduitPanier } from '../../produitPanier.interface';
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  cartProducts:ProduitPanier[]=[];
  user!: UserData;
  panier!:Panier;
  response1: any;
  constructor(
    private router: Router,
    private creationAccount : CreationAccountService,

  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.response1 = currentNavigation?.extras.state?.['response'];
  }
  ngOnInit(): void {
    if(this.response1==null ||this.response1==undefined)
    {
      this.router.navigate(['/con'])
    }
    else
    {
      this.user = this.response1;
      this.creationAccount.getPanierById(this.user.id).subscribe
      (
        re=>{
          this.panier=re;
          console.log(re);
          this.creationAccount.getProductCart(this.panier.id).subscribe
          (
            (res) => {
              this.cartProducts = res;
              console.log(res);
            },
            (error)=>
            {
              console.log(error);

            },
          )
        },
        error=>{
          console.log("BOG ERROR CHOC ");
        }
      )

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
  calculateTotal(): number {
    return this.cartProducts.reduce((acc, item) => acc + item.product.prix * item.quantity, 0);
  }
  decreaseQuantity(idProduct:number)
  {
    console.log('Diminuer la quantité pour le produit', idProduct);
    return this.creationAccount.deleteOneProduct(idProduct,this.panier.id).subscribe(
      re=>{
        this.creationAccount.getProductCart(this.panier.id).subscribe
        (
          (res) => {
            this.cartProducts = res;
            console.log(res);
          },
          (error)=>
          {
            console.log(error);

          },
        )      },
      error=>{
        console.log("BOG ERROR CHOC ");
      }
    );
  }
  removeFromCart(idProduct:number)
  {
    console.log('Retirer le produit du panier', idProduct);
    return this.creationAccount.deleteProduct(idProduct,this.panier.id).subscribe(
      re=>{
        this.creationAccount.getProductCart(this.panier.id).subscribe
        (
          (res) => {
            this.cartProducts = res;
            console.log(res);
          },
          (error)=>
          {
            console.log(error);

          },
        )
      },
      error=>{
        console.log("BOG ERROR CHOC ");
      }
    );
  }
}
