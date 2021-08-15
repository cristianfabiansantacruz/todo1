import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../servicios/alert.service';
import { AuthenticationService } from '../../servicios/authentication.service';
import { UserService } from '../../servicios/user.service';
import { UserModel } from '../../share/modelos/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  public error: string;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    });
  }

  public loginIn() {
    this.error = null;
    this.alertService.loading();
    this.userService.login(this.form.value)
      .toPromise()
      .then(res => {
        console.log(res);
        this.authService.login(res);
      })
      .catch(err => {
        this.error = err;
        console.log(err);
      })
      .finally(() => this.alertService.close());
  }

}
