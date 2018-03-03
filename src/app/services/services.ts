import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Data } from '../models';
import { getHistoryResults } from '../constants';
import { proxyBaseURL } from '../constants';
// import generateDates from '../utils/generateDates';

//https://www.concretepage.com/angular-2/angular-2-http-get-parameters-headers-urlsearchparams-requestoptions-example

@Injectable()
export class Service {
    constructor (private http: Http) {}

    getData(): Observable<Data> {

        return this.http.get(`${proxyBaseURL}/${getHistoryResults}/`)        
        .map(res => {
            return res.json();
        });
    }

    // getHero(id): Observable<Hero> {
    //     return this.http.get('/api/heroes/' + id)
    //     .map(res => res.json());
    // }

    // saveHero(hero) {
    //     if (hero.id === 0) {
    //         return this.http.post('/api/heroes', hero)
    //         .map(res => res.json());
    //     } else {
    //         return this.http.put('/api/heroes/' + hero.id, hero)
    //         .map(res => res.json());
    //     }
    // }

    // deleteHero(hero) {
    //     return this.http.delete('/api/heroes/' + hero.id)
    //     .map(res => hero);
    // }
}