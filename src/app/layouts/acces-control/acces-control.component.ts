import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ImagenService } from '../../core/services/imagen.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../core/models/Usuario';

@Component({
  selector: 'app-acces-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acces-control.component.html',
  styles: ``
})
export default class AccesControlComponent implements OnInit{
  user: Usuario | null = null;
  question: any;
  answer: string = '';
  imagenesAleatorias: any[] = [];
  nombre: string = '';

  responsQuestion: string = '';
  responsImg: string = '';
  validationResponse: boolean = false;
  validationMensa: string = '';

  constructor(
    private authService: AuthService,
    private imagenesService: ImagenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadImages();
    this.obtenerPreguntas();
  }

  loadImages() {
    // Cargar y barajar las imágenes
    this.imagenesAleatorias = this.imagenesService.getImagenesAleatorias();
  }

  obtenerPreguntas() {
    if (this.user) {
      this.getRandomQuestion();
    } else {
      this.controlMensaje('No se pudo obtener el usuario logueado');
    }
  }

  getRandomQuestion() {
    const preguntas = this.user?.preguntas || [];
    this.nombre = this.user?.username || '';
    const randomIndex = Math.floor(Math.random() * preguntas.length);
    this.question = preguntas[randomIndex];
  }

  validar() {
    if (this.responsQuestion.trim().length === 0) {
      this.controlMensaje('Responda a la pregunta');
      return;
    }

    if (this.responsImg.trim().length === 0) {
      this.controlMensaje('Seleccione una imagen');
      return;
    }

    if (this.question.respuesta.trim().toLowerCase() !== this.responsQuestion.trim().toLowerCase()) {
      this.controlMensaje('Respuesta incorrecta');
      return;
    }

    if (this.responsImg.trim().toLowerCase() !== this.user?.logo.trim().toLowerCase()) {
      this.controlMensaje('Imagen incorrecta');
      return;
    }

    this.router.navigate(['banco/dashboard']);
  }

  controlMensaje(mensaje: string) {
    this.validationResponse = true;
    this.validationMensa = mensaje;
    setTimeout(() => {
      this.validationResponse = false;
      this.validationMensa = '';
    }, 3000);
  }

  almacenarImg(name: string) {
    this.responsImg = name;
  }

  NoPermitirCaracteres(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9_\-]+$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  // Método para barajar las imágenes de nuevo
  barajarImagenes() {
    this.loadImages();
  }
}
