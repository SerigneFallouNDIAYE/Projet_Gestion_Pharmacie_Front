import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProduitComponent } from './produit/produit.component';
import { NgModule } from '@angular/core';
import { FacturesComponent } from './factures/factures.component';
import { PanierComponent } from './panier/panier.component';
export const routes: Routes = [
  { path: 'con', component: ConnexionComponent },
  { path: 'ins', component: InscriptionComponent },
  { path: 'acc', component: AcceuilComponent },
  { path: 'prod', component: ProduitComponent },
  { path: 'pan', component: PanierComponent },
  { path: 'fact', component: FacturesComponent },
  { path: '', redirectTo: '/con', pathMatch: 'full' },
  { path: '**', redirectTo: '/con' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
