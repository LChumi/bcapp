import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent {

  route= inject(Router)

  goToLogin(){
    console.log('entrada')
    this.route.navigate(['banco/login'])
  }

}
