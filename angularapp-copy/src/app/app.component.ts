import { Component, OnInit } from '@angular/core';
import { DataSeederService } from './services/data-seeder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp-copy';

  constructor(private dataSeeder: DataSeederService) {}

  ngOnInit() {
    this.dataSeeder.seedDataIfRequired();
  }
}
