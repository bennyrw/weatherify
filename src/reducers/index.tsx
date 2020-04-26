import { Action, FETCH_FORECAST, FETCH_FORECAST_SUCCEEDED, FETCH_FORECAST_FAILED, CHANGE_DAY, CHANGE_UNITS,
    fetchForecast, fetchForecastSucceeded, fetchForecastFailed, changeDay, changeUnits, FetchForecastAction, FetchForecastFailedAction, ChangeDayAction, ChangeUnitsAction, FetchForecastSucceededAction } from '../actions/index';
import { getInitialState, StoreState } from '../store';

/**
 * Redux reducer that updates the store state with the consequences of an action.
 * @param state The current state.
 * @param action The action that will mutate the state.
 * @return The new state.
 */
export function reducer(state = getInitialState(), action: Action): StoreState {
    switch (action.type) {
        case FETCH_FORECAST: {
            const {payload: {location}} = action as FetchForecastAction;
            return {...state, isFetchingForecast: true, location: location};
        }
        case FETCH_FORECAST_SUCCEEDED: {
            const {payload: {forecast}} = action as FetchForecastSucceededAction;
            return {...state, isFetchingForecast: false, error: undefined, forecast};
        }
        case FETCH_FORECAST_FAILED: {
            const {payload: {error}} = action as FetchForecastFailedAction;
            return {...state, isFetchingForecast: false, error};
        }
        case CHANGE_DAY: {
            const {payload: {daysInFuture}} = action as ChangeDayAction;
            return {...state, forecastDayIndex: daysInFuture};
        }
        case CHANGE_UNITS: {
            const {payload: {isCentigrade}} = action as ChangeUnitsAction;
            return {...state, useCentigrade: isCentigrade};
        }
    }
}