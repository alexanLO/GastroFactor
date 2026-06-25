import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FooterComponent } from '../../component/footer/footer.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { TechnicalSpecification } from '../technical-specification/technical-specification';

@Component({
  selector: 'app-my-collection',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, TechnicalSpecification],
  templateUrl: './my-collection.html',
  styleUrls: ['./my-collection.scss'],
})
export class MyCollection {
  isModalOpen = false;

  recipes = [
    {
      title: 'Receita Exemplo 1',
      image: '/receita.png'
    },
    {
      title: 'Receita Exemplo 2',
      image: '/receita.png'
    }
  ];

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
