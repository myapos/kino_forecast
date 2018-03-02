import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Data } from '../models';

@Injectable()
export class Service {
    constructor (private http: Http) {}

    getData(): Observable<Data> {
        // return this.http.get('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo')
        return this.http.get('https://api.github.com/users/technoweenie')        
        .map(res => res.json());
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