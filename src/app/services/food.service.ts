import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)    //a method to get all data
  }

  getAllFoodBySearch(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)   //to get the searched item from getAll which is fitered. using tolwercase because its better both search and result is case insensitive by being lower case so when searching Pizza it will still be considered  as pizza and give the result
  }

  getAllTags():Observable<Tag[]>{  //to get all  tags
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodByTag(tag:string): Observable<Food[]> { //toget the tag by food simialr tosearch. if tag is all then get all food
    // if (tag.toLowerCase() === "all") {
    //   return this.getAll();
    // } else {
    //   this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
    // }
    return tag.toLowerCase() === "all" ? this.getAll():this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId)//using ?? new Food() nullish coalescence operator if the previous part is ndefined
  }
}
