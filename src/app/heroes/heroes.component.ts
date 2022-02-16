import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  //heroes= HEROES
  heroes: Hero[] = [];
  constructor(private servicioHeroe:HeroService) { 
    
  }

  ngOnInit(): void {
    this.cogerHeroes()
  }

  seleccionarHeroe?:Hero
  cogerHeroes(): void {
    this.servicioHeroe.cogerHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  anadir(name:string):void{
    name=name.trim()
    if(!name){return}
    this.servicioHeroe.anadirHeroe({ name } as Hero)
      .subscribe(heroe=>{
        this.heroes.push(heroe)
      })
  }
  eliminar(hero:Hero):void{
    this.heroes=this.heroes.filter(h=>h!==hero)
    this.servicioHeroe.eliminarHeroe(hero.id).subscribe()
  }
}
