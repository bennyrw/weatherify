import { List } from 'immutable';

import { Forecast } from '../types';
import { DEBUG } from '../constants';

export interface StoreState {
    /**
     * Set if an error occurred that the user might want to know about.
     */
    errorKey?: string;
    /**
     * The current location, if any has been set.
     */
    location?: string;
    /**
     * Whether we're currently fetching data for the forecast.
     */
    isFetchingForecast: boolean;
    /**
     * The day of the forecast to display, indexed from 0.
     */
    forecastDayIndex: number;
    /**
     * Whether to use centigrade for the temperature units.
     */
    useCentigrade: boolean;
    /**
     * Forecast data, if we've received any.
     */
    forecast?: Forecast;
}

export function getInitialState(): StoreState {
    const state: StoreState = {
        isFetchingForecast: false,
        forecastDayIndex: 0,
        useCentigrade: true,
    };

    // Support various debugging behaviours. Useful when getting layout right while the app is in particular states.
    if (DEBUG.MOCK_LOADING) {
        state.isFetchingForecast = true;
    } else if (DEBUG.MOCK_FORECAST) {
        state.location = 'Cambridge';
        state.forecast = {
            locationMapUrl: 'https://a.tile.openstreetmap.org/12/2049/1349.png',
            dailyWeather: List([
                {
                    iconUrl: 'http://openweathermap.org/img/wn/10d@2x.png',
                    date: new Date(),
                    temperatureInCentigrade: 37.5,
                    pressureInMillibars: 1023,
                },
                {
                    iconUrl: 'http://openweathermap.org/img/wn/01d@2x.png',
                    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                    temperatureInCentigrade: 21.0,
                    pressureInMillibars: 1000,
                },
                {
                    iconUrl: 'http://openweathermap.org/img/wn/04d@2x.png',
                    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                    temperatureInCentigrade: 14.5,
                    pressureInMillibars: 980,
                }
            ])
        };
    } else if (DEBUG.MOCK_ERROR) {
        state.errorKey = 'fetch-general-error';
    }

    return state;
}