
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Route, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CreationAccountService } from '../creation-account.service';
import { UserCon } from '../../userCon.interface';
@Component({
  selector: 'app-connexion',
  standalone: true,
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
  imports: [ReactiveFormsModule,HttpClientModule, CommonModule, FormsModule,RouterModule]
})
export class ConnexionComponent
{
  userJSON: any;
  checkoutForm:any;
  constructor(
    private formBuilder: FormBuilder,
    private creationAccount : CreationAccountService,
    private router:Router
  ) { this.checkoutForm= this.formBuilder.group({
    email: '',
    password: '',
  });}
  onSubmit(form:NgForm)
  {
    const user1 :UserCon =
      {
        email: form.value.email,
        password: form.value.password,
      }
    this.userJSON=JSON.stringify(user1);
    this.creationAccount.conUser(this.userJSON).subscribe
    (
      response => {console.log('Success!', response);
        const navigationExtras: NavigationExtras = {
          state: {
            response: response
          }
        };
        this.router.navigate(['/acc'],navigationExtras)},
      error => console.error('Error!', error)
    )
  }

}
