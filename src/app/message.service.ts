import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  mensajes: string[]=[]
  constructor() { }
  anadir(mensaje:string){
    this.mensajes.push(mensaje)
  }
  limpiar(){
    this.mensajes=[]
  }
}
