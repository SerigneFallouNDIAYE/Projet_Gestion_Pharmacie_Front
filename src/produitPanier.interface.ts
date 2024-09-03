
import { Panier } from "./panier.interface";
import { ProductData } from "./produit.interface";
export interface ProduitPanier{
  id:number;
  quantity:number;
  cart:Panier;
  product:ProductData;
}
