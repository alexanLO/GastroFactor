import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';

@Component({
  selector: 'app-my-collection',
  standalone: true,
  imports: [FooterComponent, NavbarComponent],
  templateUrl: './my-collection.html',
  styleUrls: ['./my-collection.scss'],
})
export class MyCollection {
  
}
