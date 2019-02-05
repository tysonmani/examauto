import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class Auth6Guard implements CanActivate {
  constructor(private auth:AuthService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(!this.auth.isloggedin())
  	this.router.navigate(['login']);
   else if(!this.auth.isoldresult())
  	this.router.navigate(['oldcontests']);
    return true;

  }
}
