import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly LOGIN_KEY = 'isLoggedIn';

    login(response: any): void {
        sessionStorage.setItem('isLoggedIn', 'true');

        sessionStorage.setItem(
            'token',
            response.token
        );

        sessionStorage.setItem(
            'username',
            response.username
        );

        sessionStorage.setItem(
            'employeeId',
            response.employeeId
        );

        sessionStorage.setItem(
            'fullName',
            response.fullName
        );

        sessionStorage.setItem(
            'role',
            response.role
        );
    }

    logout(): void {
        sessionStorage.clear();
    }

    getToken(): string | null {
        return sessionStorage.getItem('token');
    }

    getRole(): string | null {
        return sessionStorage.getItem('role');
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem(this.LOGIN_KEY) === 'true';
    }
}