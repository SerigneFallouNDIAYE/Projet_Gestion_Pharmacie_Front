import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UserData } from '../../user.interface';
import { CreationAccountService } from '../creation-account.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
  ],
});
@Component({
  selector: 'app-inscription',
  standalone: true,
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule, RouterModule]
})
export class InscriptionComponent {
  userJSON: any;
  responseJSON!: UserData;
  checkoutForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private creationAccount: CreationAccountService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      last_name: '',
      firstname: '',
      email: '',
      profile: '',
      password: '',
      repasswd: '',
      active: ''
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value); // Affiche les valeurs du formulaire
    const password = form.value.password;
    const repassword = form.value.repasswd;
    if (password == repassword) {
      const user1: UserData =
        {
          id: undefined,
          last_name: form.value.last_name,
          firstname: form.value.firstname,
          email: form.value.email,
          profile: form.value.profile,
          password: form.value.password,
          active: form.value.active
        }
      this.userJSON = JSON.stringify(user1);
      alert(this.userJSON);
      this.creationAccount.createUser(this.userJSON).subscribe
      (
        response => {
          console.log('Success!', response);
          this.responseJSON = response;
          const navigationExtras: NavigationExtras = {
            state: {
              response: this.responseJSON
            }
          };
          this.router.navigate(['/acc'], navigationExtras);
        },
        error => console.error('Error!', error)
      )
    }
    else {
      alert("Mot de Passe différents");
    }
  }

}
