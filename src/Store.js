import {BehaviorSubject} from 'rxjs';

export const token$ = new BehaviorSubject(window.localStorage.getItem('token'));

export function updateToken(newToken){
  window.localStorage.setItem('token', newToken)
  token$.next(newToken);
}

export function removeToken () {
  window.localStorage.removeItem('token');
}