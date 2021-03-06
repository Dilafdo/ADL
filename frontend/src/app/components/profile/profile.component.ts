import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ResponseModel, UserService} from '../../services/user.service';
import {SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;

  constructor(private socialAuthService: SocialAuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        map((user: SocialUser | ResponseModel) => {
          if (user instanceof SocialUser) {
            return {
              email: 'mdilanfdo1995@gmail.com',
              ...user,

            };
          } else {
            return user;
          }
        })
      )
      .subscribe((data: ResponseModel | SocialUser) => {
        this.myUser = data;
      });
  }

  logout() {
    this.userService.logout();
  }

}
