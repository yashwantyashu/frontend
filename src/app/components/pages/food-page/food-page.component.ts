import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(foodService:FoodService, activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private router:Router
  ) {
    activatedRoute.params.subscribe((params)=>{
      if(params.id){
        foodService.getFoodById(params.id).subscribe(serverFood=>{
          this.food = serverFood;
        }); //to retreive food by food id using foodservice isntead of this.foodservce because it is within constructor scope. if used in ngoninit this keyword is used as it isfor componnt class
      }
    })
   }

  ngOnInit(): void {
    
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
