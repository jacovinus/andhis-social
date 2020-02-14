import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable()
export class UserGuard implements CanActivate {
    identity;
    follows;
constructor(private _userService : UserService, private _router: Router){}
    canActivate(
   
    ) {
        this.identity = this._userService.getIdentity();
     
        
        if(this.identity){
            return true;
        }else{
            this._router.navigate(['/login']);
        }
        
    }

}