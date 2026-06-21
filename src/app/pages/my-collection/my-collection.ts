import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FooterComponent } from '../../component/footer/footer.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';

@Component({
  selector: 'app-my-collection',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterLink],
  templateUrl: './my-collection.html',
  styleUrls: ['./my-collection.scss'],
})
export class MyCollection {
  
}
