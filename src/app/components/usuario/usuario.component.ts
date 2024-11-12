import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/IUsuario';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsuarioComponent implements OnInit {
  private readonly _activeRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  public isLoading = signal<boolean>(true);
  mensaje = 'Cargando información del usuario.';
  public usuario = signal<User | undefined>(undefined);
  ngOnInit(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this._userService.obtenerUsuario(parseInt(id, 10)).subscribe(
        (data) => {
          setTimeout(() => {
            this.isLoading.set(false);
            this.usuario.set(data);
          }, 1500);
        },
        (error: HttpErrorResponse) => {
          console.log('Se produjo un error:', error.message);
          //alert('No se pudo obtener la información del usuario');
          setTimeout(() => {
            this.isLoading.set(false);
            this.onBack();
          }, 500);
        }
      );
    }
    //this.isLoading = false;
  }
  private onBack() {
    this._router.navigate(['/']);
  }
}
