import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    profile: any;
    userEmail: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
      //if (this.auth.userProfile) {
      //    this.profile = this.auth.userProfile;
      //} else {
      //    this.auth.getProfile((err, profile) => {
      //        this.profile = profile;
      //    });
        
      //}
  }
}
