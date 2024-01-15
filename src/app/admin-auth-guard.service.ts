import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth : AuthService, private userService : UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    
    return this.auth.appUser$
    //for mapping to boolean
    .pipe(map(appUser => appUser?.isAdmin as boolean));
    
  }
}

