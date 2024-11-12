import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/IUsuario';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [SpinnerComponent, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  private readonly _userService = inject(UserService);
  isLoading = true;
  mensaje = 'Cargando información de lo usuarios.';
  public usuarios = signal<User[]>([]);
  ngOnInit(): void {
    this._userService.obtenerUsuarios().subscribe(
      (users) => {
        setTimeout(() => {
          this.usuarios.set(users);
          this.isLoading = false;
        }, 2000);
        console.log('Listado de usuarios: ', this.usuarios());
      },
      (hasError: HttpErrorResponse) => {
        console.log('Se produjo un error al consultar los datos', hasError);
      }
    );
  }
}
