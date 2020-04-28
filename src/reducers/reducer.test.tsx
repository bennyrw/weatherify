import { createStore } from 'redux';
import { List } from 'immutable';

import { StoreState, getInitialState } from '../store';
import { Action, setLocation, fetchForecastSucceeded, fetchForecastFailed, changeDay, changeUnits, fetchForecast } from '../actions';
import { Forecast } from '../types';
import { reducer } from './index';

describe('reducer', () => {
    let state: StoreState;

    beforeEach(() => {
        const store = createStore<StoreState, Action, any, any>(reducer, getInitialState());
        state = store.getState();
    });

    it('successfully fetching a forecast updates the forecast field', () => {
        const setLocationAction = setLocation('London');
        state = reducer(state, setLocationAction);

        const expectedState = getInitialState();
        expectedState.location = 'London';
        expectedState.isFetchingForecast = false;
        expect(state).toEqual(expectedState);

        const fetchAction = fetchForecast();
        state = reducer(state, fetchAction);
        expectedState.isFetchingForecast = true;
        expect(state).toEqual(expectedState);

        const forecast: Forecast = {
            dailyForecasts: List.of(
                {
                    weatherIconUrl: 'someUrl',
                    date: new Date(),
                    temperatureInCentigrade: 33.2,
                    pressureInMillibars: 1010,
                }
            )
        };
        const successAction = fetchForecastSucceeded(forecast);
        state = reducer(state, successAction);
        expectedState.isFetchingForecast = false;
        expectedState.forecast = forecast;
        expect(state).toEqual(expectedState);
    });

    it('failing to fetch a forecast sets the error field', () => {
        // initially try to fetch without setting location
        const fetchAction = fetchForecast();
        state = reducer(state, fetchAction);
        const expectedState = getInitialState();
        expectedState.isFetchingForecast = false;
        expect(state).toEqual(expectedState);

        // set location and try again
        const setLocationAction = setLocation('London');
        state = reducer(state, setLocationAction);
        state = reducer(state, fetchAction);
        expectedState.location = 'London';
        expectedState.isFetchingForecast = true;
        expect(state).toEqual(expectedState);

        const failed = fetchForecastFailed('Oops!');
        state = reducer(state, failed)
        expectedState.isFetchingForecast = false;
        expectedState.error = 'Oops!';
        expect(state).toEqual(expectedState);

        // and a later successful fetch clears it
        const success = fetchForecastSucceeded({dailyForecasts: List()});
        state = reducer(state, success);
        expect(state.error).toBeUndefined();
    });

    it('changing day updates state', () => {
        const action = changeDay(3);

        const expectedState = getInitialState();
        expectedState.forecastDayIndex = 3;

        expect(reducer(state, action)).toEqual(expectedState);
    });

    it('changing units updates the state', () => {
        const useCentigrade = changeUnits(true);
        const useFahrenheit = changeUnits(false);

        const expectedState = getInitialState();
        expectedState.useCentigrade = false;

        state = reducer(state, useFahrenheit);
        expect(state).toEqual(expectedState);
        
        // applying same again does nothing
        state = reducer(state, useFahrenheit);
        expect(state).toEqual(expectedState);

        expectedState.useCentigrade = true
        state = reducer(state, useCentigrade);
        expect(state).toEqual(expectedState);
    });
})
