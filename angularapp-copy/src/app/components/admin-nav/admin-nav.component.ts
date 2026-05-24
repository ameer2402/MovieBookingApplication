import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/helpers/user-store.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  isSuperAdmin: boolean = false;

  constructor(private userStore: UserStoreService) { }

  ngOnInit(): void {
    const role = this.userStore.authUser?.role;
    this.isSuperAdmin = role === 'SUPER_ADMIN';
  }

}
