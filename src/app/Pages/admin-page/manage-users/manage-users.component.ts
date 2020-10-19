import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  users = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((userSnapshot) => {
      this.users = [];
      userSnapshot.forEach((userData)=>{
        this.users.push({

        });
      });
    });
  }

}
