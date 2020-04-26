import { createStore } from 'redux';
import { List } from 'immutable';

import { StoreState, getInitialState } from '../store';
import { Action, fetchForecastSucceeded, fetchForecastFailed, changeDay, changeUnits, fetchForecast } from '../actions';
import { WeatherType, Forecast } from '../types';
import { reducer } from './index';

describe('reducer', () => {
    let state;

    beforeEach(() => {
        const store = createStore<StoreState, Action, any, any>(reducer, getInitialState());
        state = store.getState();
    });

    it('successfully fetching a forecast updates the forecast field', () => {
        const fetch = fetchForecast('London');

        const expectedState = getInitialState();
        expectedState.location = 'London';
        expectedState.isFetchingForecast = true;

        state = reducer(state, fetch);
        
        expect(state).toEqual(expectedState);

        const forecast: Forecast = {
            dailyForecasts: List.of(
                {
                    prevailingWeather: WeatherType.SUNNY,
                    date: new Date(),
                    temperatureInCentigrade: 33.2,
                    pressureInMillibars: 1010,
                }
            )
        };
        const success = fetchForecastSucceeded(forecast);

        expectedState.isFetchingForecast = false;
        expectedState.forecast = forecast;

        state = reducer(state, success);
        expect(state).toEqual(expectedState);
    });

    it('failing to fetch a forecast sets the error field', () => {
        const fetch = fetchForecast('London');

        const expectedState = getInitialState();
        expectedState.location = 'London';
        expectedState.isFetchingForecast = true;

        state = reducer(state, fetch);
        expect(state).toEqual(expectedState);

        const failed = fetchForecastFailed('Oops!');

        expectedState.isFetchingForecast = false;
        expectedState.error = 'Oops!';

        state = reducer(state, failed)
        expect(state).toEqual(expectedState);

        // and a later successful fetch clears it
        const success = fetchForecastSucceeded(null);
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
