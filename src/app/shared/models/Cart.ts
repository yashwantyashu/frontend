import { CartItem } from "./CartItem";

export class Cart{
    items:CartItem[]=[];
    totalPrice:number = 0;
    totalCOunt:number = 0;
}