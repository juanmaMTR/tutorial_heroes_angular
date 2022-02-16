import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService:MessageService,
    private http:HttpClient,
  ) { }
  
  
  private log(mensaje:string){
    this.messageService.anadir(`Servicio Héroe: ${mensaje}`)
  }
  private urlHeroes='api/heroes'
  private manejadorError<T>(operacion='operacion',resultado?:T){
    return (error:any):Observable<T>=>{
      console.error(error)
      this.log(`${operacion} falla: ${error.mensaje}`)
      return of(resultado as T)
    }
  }

  cogerHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.urlHeroes)
      .pipe(
        tap(_ => this.log('heroes cogidos')),
        catchError(this.manejadorError<Hero[]>('cogerHeroes',[]))
      )
  }
  cogerHeroe(id: number): Observable<Hero> {
    const url=`${this.urlHeroes}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Heroe elegido id=${id}`)),
      catchError(this.manejadorError<Hero>(`cogerHeroe id=${id}`))
    )
  }
  actualizarHeroe(heroe:Hero):Observable<any>{
    return this.http.put(this.urlHeroes,heroe,this.httpOptions).pipe(
      tap(_ => this.log(`Actualizar heroe id=${heroe.id}`)),
      catchError(this.manejadorError<any>('actualizarHeroe'))
    )
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  anadirHeroe(heroe: Hero):Observable<Hero>{
    return this. http.post<Hero>(this.urlHeroes,heroe,this.httpOptions).pipe(
      tap((nuevoHeroe:Hero)=>this.log(`Heroe añadido w/ id=${nuevoHeroe.id}`)),
      catchError(this.manejadorError<Hero>('anadirHeroe'))
    )
  }
  eliminarHeroe(id:Number):Observable<Hero>{
    const url=`${this.urlHeroes}/${id}`
    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_ => this.log(`Heroe eliminado id=${id}`)),
      catchError(this.manejadorError<Hero>('eliminarHeroe'))
    )
  }
  buscarHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Hero[]>(`${this.urlHeroes}/?name=${term}`).pipe(
      tap(x => x.length ?
          this.log(`Encontrando un heroe ${term}`):
          this.log(`No ha encontrado un heroe ${term}`)
        ),
      catchError(this.manejadorError<Hero[]>('buscarHeroes',[]))
    )
  }
}
