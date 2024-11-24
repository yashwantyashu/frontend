import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  loginForm!:FormGroup;
  returnUrl='';
  isSubmitted = false; //indicator if user has pressed submit button or not to not show the validation error until the user has clicked it

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl; // queryparams are everythign after ? in url
  }

  get formControls(){
    return this.loginForm.controls; //to replace this.loginForms.controls with just formControls for readability
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    //alert(`email: ${this.formControls.email.value}, password: ${this.formControls.password.value}`);
    this.userService.login({email:this.formControls.email.value,
      password:this.formControls.password.value
    }).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    });
  }

}
