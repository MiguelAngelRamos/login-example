import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interface/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public identity!: IAuth ;
  private baseUrl: string = environment.baseUrl;
  private authUser: IAuth | undefined;

  constructor(private http: HttpClient) { }

  login(auth: IAuth): Observable<IAuth> {
    const params = JSON.stringify(auth);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<IAuth>(`${this.baseUrl}/login`, params, {headers});
  }

  get authUserApi(): IAuth {
    // return this.authUser;
    return { ...this.authUser!}
  }

  getIdentity(): any {
     const identity = JSON.parse(localStorage.getItem('identity')!);
     if (identity != 'undefined' && identity != null) {
      return identity;
    } 
    return identity;
  }

  logout() {
    this.authUser = undefined;
  }
}


//* antes de pasar por el subcribe pasa por el tap