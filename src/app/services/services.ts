import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Data } from '../models';
import { kino_url } from '../constants';
import generateDates from '../utils/generateDates';

//https://docs.angularjs.org/api/ng/service/$http#setting-http-headers
//https://docs.angularjs.org/api/ng/service/$http#usage
//https://blog.angular-university.io/angular-http/
//https://www.concretepage.com/angular-2/angular-2-http-get-parameters-headers-urlsearchparams-requestoptions-example

@Injectable()
export class Service {
    constructor (private http: Http) {}

    getData(): Observable<Data> {
        // debugger;
        let myHeaders = new Headers(); 
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Accept', 'text/plain'); 
        myHeaders.set('Access-Control-Allow-Origin', '*'); 


        let options = new RequestOptions({ headers: myHeaders });
        // const headers = new HttpHeaders()
        //     .set("X-CustomHeader", "custom header value");

       // const config = {
       //  method: 'GET',
       //  url: kino_url,
       //  headers: {
       //    'Content-Type': undefined,
       //    'Access-Control-Allow-Origin': '*'
       //  }
       // }
        
        // return this.http.get('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo')
        return this.http.get(kino_url)       
        // return this.http.get('https://api.github.com/users/technoweenie')    //https://api.github.com/users/technoweenie    
        // return this.http.get(kino_url, options)        
        // return this.http.get(
        //     kino_url,
        //     {
        //        headers: { 'Access-Control-Allow-Origin': '*' }
        //     })        
        .map(res => {
            debugger;
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