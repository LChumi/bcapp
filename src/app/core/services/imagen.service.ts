import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  
  private imagenesLoging: any[] = [
    { nombre: "palmera.PNG" },
    { nombre: "mundo.PNG" },
    { nombre: "microfono.PNG" },
    { nombre: "metro.PNG" },
    { nombre: "impresora.PNG" },
    { nombre: "corazon.PNG" },
    { nombre: "calculadora.PNG" },
    { nombre: "billete.PNG" },
    { nombre: "bicicleta.PNG" },
    { nombre: "ancla.PNG" },
    { nombre: "televisor.PNG" },
    { nombre: "telefono.PNG" },
    { nombre: "satelite.PNG" },
    { nombre: "paloma.PNG" },
    { nombre: "palmera.PNG" }
  ];

  getImagenesAleatorias(cantidad: number = 5): any[] {
    const imagenes = [...this.imagenesLoging];
  
    // Barajar las imágenes
    for (let i = imagenes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
    }
  
    // Devolver solo la cantidad deseada de imágenes
    return imagenes.slice(0, cantidad);
  }
}