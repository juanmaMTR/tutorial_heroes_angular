import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  //heroes= HEROES
  heroes: Hero[] = [];
  constructor(private servicioHeroe:HeroService,
              private messageService:MessageService) { 
    
  }

  ngOnInit(): void {
    this.cogerHeroes()
  }

  seleccionarHeroe?:Hero
  onSelect(heroe:Hero): void{
    this.seleccionarHeroe=heroe
    this.messageService.anadir(`Componentes Heroes: heroe seleccionado id=${heroe.id}`)
  }
  /*cogerHeroes(): void{
    this.heroes=this.servicioHeroe.cogerHeroes()
  }*/
  cogerHeroes(): void {
    this.servicioHeroe.cogerHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}
