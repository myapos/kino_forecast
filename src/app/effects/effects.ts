import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { AppState } from '../reducers';
import { initializeActions } from '../actions';
import { Service } from '../services';

@Injectable()
export class Effects {
    store$: Observable<any>;
    payload$;
    constructor (
        private update$: Actions,
        private initActions: initializeActions,
        private svc: Service,
        private store: Store<any>
    ) {
        this.store$ = store;
    }

    @Effect() loadData$ = this.update$
        .ofType(initializeActions.LOAD_DATA)
        .switchMap(() => this.svc.getData('init', ''))
        .map(data => this.initActions.loadDataSuccess(data));

    @Effect() loadDataRange = this.update$
        .ofType(initializeActions.START_AND_END_DATE)
        // .withLatestFrom(this.store$)
        .map((action) => { this.payload$ = action.payload;} )
        .switchMap(() => { 
            // debugger; 
            console.log('payload:', this.payload$);
            return this.svc.getData('range', this.payload$);})
        .map(data => this.initActions.loadDataSuccess(data));

    @Effect() callUnplugApi$ = this.update$
        .ofType(initializeActions.CALL_UNPLUG_API)
        .switchMap(() => this.svc.callUnplugApi())
        .map(data => this.initActions.unplugApiSuccess(data));

    @Effect() loadDataOfCurrentDraw$ = this.update$
        .ofType(initializeActions.GET_DRAWS_OF_CURRENT_DATE)
        .switchMap(() => this.svc.getData('currentDate', ''))
        .map(data => this.initActions.loadDataLastDraw(data));

    // @Effect() loadHeroes$ = this.update$
    //     .ofType(HeroActions.LOAD_HEROES)
    //     .switchMap(() => this.svc.getHeroes())
    //     .map(heroes => this.heroActions.loadHeroesSuccess(heroes));

    // @Effect() getHero$ = this.update$
    //     .ofType(HeroActions.GET_HERO)
    //     .map<string>(action => action.payload)
    //     .switchMap(id => this.svc.getHero(id))
    //     .map(hero => this.heroActions.getHeroSuccess(hero));

    // @Effect() saveHero$ = this.update$
    //     .ofType(HeroActions.SAVE_HERO)
    //     .map(action => action.payload)
    //     .switchMap(hero => this.svc.saveHero(hero))
    //     .map(hero => this.heroActions.saveHeroSuccess(hero));

    // @Effect() addHero$ = this.update$
    //     .ofType(HeroActions.ADD_HERO)
    //     .map(action => action.payload)
    //     .switchMap(hero => this.svc.saveHero(hero))
    //     .map(hero => this.heroActions.addHeroSuccess(hero));

    // @Effect() deleteHero$ = this.update$
    //     .ofType(HeroActions.DELETE_HERO)
    //     .map(action => action.payload)
    //     .switchMap(hero => this.svc.deleteHero(hero))
    //     .map(hero => this.heroActions.deleteHeroSuccess(hero));
}