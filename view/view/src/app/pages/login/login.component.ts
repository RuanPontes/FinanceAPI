import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cpf: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.cpf.trim() === '') {
      this.errorMessage = 'Por favor, insira o CPF do cliente.';
      this.showErrorMessage();
      return;
    }

    this.isLoading = true;
    this.authService.login(this.cpf).subscribe(
      result => {
        this.isLoading = false;
        if (result) {
          this.router.navigate(['/']); // Redirecionar para a rota raiz (página inicial)
        } else {
          this.errorMessage = 'CPF não encontrado, inválido ou cliente inativo.';
          this.showErrorMessage();
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao efetuar o login. Por favor, tente novamente mais tarde.';
        this.showErrorMessage();
      }
    );
  }

  showErrorMessage(): void {
    const errorMessageElement = document.querySelector('.error-message');
    if (errorMessageElement) {
      errorMessageElement.classList.add('show');
    }
  }
}
