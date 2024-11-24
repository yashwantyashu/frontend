import { Food } from './food';


export class CartItem{
    constructor(public food:Food){}  //making it public to make it accessible
    quantity:number = 1;
    price:number = this.food.price;
}