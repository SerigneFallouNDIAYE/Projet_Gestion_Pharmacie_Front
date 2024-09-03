
import { Component } from '@angular/core';
import { UserData } from '../../user.interface';
import { NavigationExtras, Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css',
  imports: [CommonModule,RouterModule]
})
export class AcceuilComponent {
  response: any;
  user!: UserData;
  constructor(
    private router: Router
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.response = currentNavigation?.extras.state?.['response'];
  }
  ngOnInit(): void
  {
    if(this.response==null ||this.response==undefined)
    {
      this.router.navigate(['/con'])
    }
    this.user = this.response;    }
  naviguerAvecExtras(route: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        response: this.user
      }
    };
    this.router.navigate([route], navigationExtras);
  }


}
