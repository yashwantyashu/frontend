import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:User;
  cartQuantity =0;
  constructor(cartService:CartService, private userService:UserService) {
    cartService.getcartObservable().subscribe((newCart)=>{
      this.cartQuantity=newCart.totalCOunt;
    })

    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    })
   }

  ngOnInit(): void {
  }
  logout(){
    this.userService.logOut();
  }

  get isAuth(){
    return this.user.token;
  }

}
