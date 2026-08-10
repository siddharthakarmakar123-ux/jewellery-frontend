import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Network {
    //  private apiUrl = 'http://localhost:8080/api';
     private apiUrl ='https://jewellery-backend-production.up.railway.app/api';

  constructor(private http: HttpClient) {
  }

  searchCustomer(mobile: string): Observable<any[]> {

    const request = {
      req: {
        reqType: "M",
        mobile: mobile,
      }
    };

    return this.http.post<any[]>(
      `${this.apiUrl}/mmGenCustomer/post/search/customerData`,
      request
    );
  }

  saveCustomer(customer: any): Observable<any> {

  const request = {
    req: {
      fullName: customer.fullName,
      mobile: customer.mobile,
      email: customer.email,
      address: customer.address
    }
  };

  return this.http.post<any>(
    `${this.apiUrl}/mmGenCustomer/post/save/customerData`,
    request
  );
}

authenticate(userName: string, password: string): Observable<any> {

    const request = {
      req: {
        userName: userName,
        password: password
      }
    };

    return this.http.post<any>(
      `${this.apiUrl}/login/post/authinticate`,
      request
    );
  }


  signup(
    fullName: string,
    userName: string,
    password: string
  ): Observable<any> {

    const request = {
      req: {
        fullName: fullName,
        userName: userName,
        password: password
      }
    };

    return this.http.post<any>(
      `${this.apiUrl}/login/post/signup`,
      request
    );
  }
}
