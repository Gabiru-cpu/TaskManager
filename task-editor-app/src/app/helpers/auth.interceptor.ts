import { HttpClient, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService: AuthService = inject(AuthService)
    const currentUser = authService.currentUserValue
    
    if(currentUser != null && currentUser != undefined){
        req = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${currentUser.accessToken}`)
        })
    }
    return next(req)
}