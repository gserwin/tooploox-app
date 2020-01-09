import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

export class AddJWTInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.token) {
            const clonedRequest = req.clone({ headers: req.headers.set('token', localStorage.token) });
            return next.handle(clonedRequest);
        }
    }
}
