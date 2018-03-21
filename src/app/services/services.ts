import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { Data } from '../models';
import { getHistoryResults } from '../constants';
import { proxyBaseURL, unplugApiKey } from '../constants';
import { generateDates } from '../utils/generateDates';
import { formatDate } from '../utils/formatDate';

//https://www.concretepage.com/angular-2/angular-2-http-get-parameters-headers-urlsearchparams-requestoptions-example

@Injectable()
export class Service {
    constructor (private http: Http) {}

    getSingle(singleUrl: string): Observable<Data> {
        // debugger;
        return this.http.get(singleUrl)
            .map((r: Response) => { 
                // debugger;
                return r.json().draws.draw;
            });
    };

    getMultiple(): Observable<Array<Data>> {
        const dates = generateDates();
        // const urlsWithDates = dates.map(date => `${proxyBaseURL}/${getHistoryResults}?date=${formatDate(date)}`);
        const urlsWithDates = dates.map(date => `${proxyBaseURL}/${formatDate(date)}.json`);
        // let singleUrls = [`${proxyBaseURL}/${getHistoryResults}?date=24-02-2017`,`${proxyBaseURL}/${getHistoryResults}?date=25-02-2017`]; // can be replaced with any 'Single' identifier
        let singleUrls = [`${proxyBaseURL}/24-02-2017.json`,`${proxyBaseURL}/25-02-2017.json`]; // can be replaced with any 'Single' identifier

        let singleObservables = urlsWithDates.map((singleUrl: string, urlIndex: number) => {
            return this.getSingle(singleUrl)
                .map(single => { 
                    // debugger;
                    // const customRes = single.map(item => {
                    //     // debugger;
                    //     // return ({
                    //     //     draws: item
                    //     // });
                    //     return item;
                    // });
                    return single;
                })
                .catch((error: any) => {
                    console.error('Error loading Data, singleUrl: ' + singleUrl, 'Error: ', error);
                    return Observable.of(null); // In case error occurs, we need to return Observable, so the stream can continue
                });
        });
        return forkJoin(singleObservables);
    };


    getData(): Observable<[any]> {
        const dates = generateDates();
        const formattedDates = dates.map(date => formatDate(date));

        const results = this.getMultiple().map(
            (singles: any) => {
                // debugger;
                // console.log(singles); // [Single, Single, Single];
                // In case error occured e.g. for the 'singleUrl' (our 'Single' identifier) at position 1,
                // Output wil be: [Single, null, Single];
                return singles;
            }
        );

        return results;
    }

    callUnplugApi(): Observable<any> {
        debugger;
        return this.http.get('/')
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