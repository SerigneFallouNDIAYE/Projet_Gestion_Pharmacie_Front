
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from '../panier.interface';
import { ProductData } from '../produit.interface';
import { UserData } from '../user.interface';
import { ProduitPanier } from '../produitPanier.interface';
import { FactureData } from '../facture.interface';
@Injectable({
  providedIn: 'root',
})
export class CreationAccountService {

  constructor(private https: HttpClient) { }


  public createUser(userData: any) {
    const url = "http://localhost:8080/user";
    return this.https.post<UserData>(url, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  public conUser(userCon: any) {
    const url = "http://localhost:8080/user/account";
    return this.https.post(url, userCon, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  public getUserByMail(email:any) {
    const url = "http://localhost:8080/user/mail/"+email;
    return this.https.get<UserData>(url);
  }
  public getProducts() {
    const url = "http://localhost:8080/stock";
    return this.https.get<ProductData[]>(url);
  }
  public getPanier(email:any)
  {
    const url = "http://localhost:8080/cart/user/mail/"+email;
    return this.https.get<Panier>(url);
  }
  public getPanierById(id:any)
  {
    const url = "http://localhost:8080/cart/user/id/"+id;
    return this.https.get<Panier>(url);
  }
  public addProduct(productId: number, quantity: number = 1,cartID:number)
  {
    const url = "http://localhost:8080/cart/"+cartID+"/products/"+productId+"/"+quantity;
    return this.https.get(url);
  }
  public getProductCart(cartID:any)
  {
    const url ="http://localhost:8080/cart/"+cartID+"/products";
    return this.https.get<ProduitPanier[]>(url);
  }
  public getFacture(idUser:any)
  {
    const url ="http://localhost:8080/fact/user/"+idUser;
    return this.https.get<FactureData>(url);
  }
  public deleteFacture(idFact:any)
  {
    const url ="http://localhost:8080/fact/delete/"+idFact;
    return this.https.delete(url);
  }
  public deleteOneProduct(idProduct: number, idCart: number) {
    const url = `http://localhost:8080/cart/${idCart}/product/${idProduct}`;
    return this.https.delete(url);
  }

  public deleteProduct(idProduct: number, idCart: number) {
    const url = `http://localhost:8080/cart/${idCart}/products/${idProduct}`;
    return this.https.delete(url);
  }
}
