import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  heroe:Hero|undefined
  constructor(
    private route:ActivatedRoute,
    private servicioHeroe:HeroService,
    private localizacion:Location
  ) { }

  ngOnInit(): void {
    this.cogerHeroe()
  }
  cogerHeroe(): void{
    const id=Number(this.route.snapshot.paramMap.get('id'))
    this.servicioHeroe.cogerHeroe(id)
        .subscribe(heroe=>this.heroe=heroe)
  }
  irAtras(): void {
    this.localizacion.back();
  }
  guardar(): void {
    if (this.heroe) {
      this.servicioHeroe.actualizarHeroe(this.heroe)
        .subscribe(() => this.irAtras());
    }
  }
  
}
