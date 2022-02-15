import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService:MessageService) { }

  cogerHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.anadir('Servicio Heroe: buscar heroe')
    return heroes;
  }
}
