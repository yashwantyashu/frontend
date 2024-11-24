import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';

const USER_KEY = 'User'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserLocalStorage());
  public userObservable!:Observable<User>;
  constructor(private http:HttpClient) { 
    this.userObservable= this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user)=>{
          this.setUserLocalStorage(user);
          this.userSubject.next(user);

        },
        error:(errorResponse)=>{
          
        }
      })
    );
  }

  logOut(){
    this.userSubject.next(new User()); //creating a new empty class
    localStorage.removeItem(USER_KEY); //to remove the key
    window.location.reload(); //to be redirected if had credentialks
  }

  private setUserLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson){
      return JSON.parse(userJson) as User;
    }
    return new User();
  }
}
