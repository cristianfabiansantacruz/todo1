import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/servicios/authentication.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  title = 'UTWeb';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.currentUser.subscribe(
      status => {
        if(status){
          this.router.navigate(['todo-uno']);
        }else{
          this.router.navigate(['']);
        }
      }
    )
  }

}
