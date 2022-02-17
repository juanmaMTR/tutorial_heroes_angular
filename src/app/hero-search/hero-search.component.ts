import { Component, OnInit } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!:Observable<Hero[]>
  private buscarTerminos=new Subject<string>()
  constructor(private servicioHeroe:HeroService) { }

  ngOnInit(): void {
    this.heroes$=this.buscarTerminos.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((termino:string)=>this.servicioHeroe.buscarHeroes(termino))
    )
  }

  buscar(termino:string):void{
    this.buscarTerminos.next(termino)
  }

}
