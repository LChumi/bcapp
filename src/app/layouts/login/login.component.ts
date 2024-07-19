import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export default class LoginComponent {
  username: string = '';
  password: string = '';
  visibleMesage: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['banco/acces']);
      } else {
        this.visibleMesage = true;
        setTimeout(() => {
          this.visibleMesage = false;
        }, 3000);
      }
    });
  }

  NoPermitirCaracteres(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9_\-]+$/;
    const key = event.key;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }
}