import { Forecast } from '../types';

//
// Action constants
//

export const SET_LOCATION = 'SET_LOCATION';
type SET_LOCATION = typeof SET_LOCATION;

export const FETCH_FORECAST = 'FETCH_FORECAST';
type FETCH_FORECAST = typeof FETCH_FORECAST;

export const FETCH_FORECAST_SUCCEEDED = 'FETCH_FORECAST_SUCCEEDED';
type FETCH_FORECAST_SUCCEEDED = typeof FETCH_FORECAST_SUCCEEDED;

export const FETCH_FORECAST_FAILED = 'FETCH_FORECAST_FAILED';
type FETCH_FORECAST_FAILED = typeof FETCH_FORECAST_FAILED;

export const CHANGE_DAY = 'CHANGE_DAY';
type CHANGE_DAY = typeof CHANGE_DAY;

export const CHANGE_UNITS = 'CHANGE_UNITS';
type CHANGE_UNITS = typeof CHANGE_UNITS;

//
// Action types
//

export interface Action {
    type: any;
    payload?: any;
}

export interface SetLocationAction extends Action {
    type: SET_LOCATION;
    payload: {
        location: string;
    }
}

export interface FetchForecastAction extends Action {
    type: FETCH_FORECAST;
};

export interface FetchForecastSucceededAction extends Action {
    type: FETCH_FORECAST_SUCCEEDED;
    payload: {
        forecast: Forecast,
    }
}

export interface FetchForecastFailedAction extends Action {
    type: FETCH_FORECAST_FAILED;
    payload: {
        errorKey: string;
    }
}

export interface ChangeDayAction extends Action {
    type: CHANGE_DAY;
    payload: {
        daysInFuture: number;
    }
}

export interface ChangeUnitsAction extends Action {
    type: CHANGE_UNITS;
    payload: {
        isCentigrade: boolean;
    }
}

//
// Action creators
//

export function setLocation(location: string): SetLocationAction {
    return {
        type: SET_LOCATION,
        payload: {
            location,
        },
    }
}

export function fetchForecast(): FetchForecastAction {
    return {
        type: FETCH_FORECAST,
    };
}

export function fetchForecastSucceeded(forecast: Forecast): FetchForecastSucceededAction {
    return {
        type: FETCH_FORECAST_SUCCEEDED,
        payload: {
            forecast,
        },
    };
}

export function fetchForecastFailed(errorKey: string): FetchForecastFailedAction {
    return {
        type: FETCH_FORECAST_FAILED,
        payload: {
            errorKey,
        }
    }
}

export function changeDay(daysInFuture: number): ChangeDayAction {
    return {
        type: CHANGE_DAY,
        payload: {
            daysInFuture,
        }
    }
}

export function changeUnits(isCentigrade: boolean): ChangeUnitsAction {
    return {
        type: CHANGE_UNITS,
        payload: {
            isCentigrade,
        }
    }
}