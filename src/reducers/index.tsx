import { Action, SET_LOCATION, FETCH_FORECAST, FETCH_FORECAST_SUCCEEDED, FETCH_FORECAST_FAILED, CHANGE_DAY, CHANGE_UNITS,
    FetchForecastFailedAction, ChangeDayAction, ChangeUnitsAction, FetchForecastSucceededAction, SetLocationAction } from '../actions/index';
import { getInitialState, StoreState } from '../store';

/**
 * Redux reducer that updates the store state with the consequences of an action.
 * @param state The current state.
 * @param action The action that will mutate the state.
 * @return The new state.
 */
export function reducer(state = getInitialState(), action: Action): StoreState {
    switch (action.type) {
        case SET_LOCATION: {
            const {payload: {location}} = action as SetLocationAction;
            return {...state, location: location};
        }
        case FETCH_FORECAST: {
            if (state.location) {
                return {...state, isFetchingForecast: true, error: undefined};
            } else {
                // no location set yet
                return state;
            }
        }
        case FETCH_FORECAST_SUCCEEDED: {
            const {payload: {forecast}} = action as FetchForecastSucceededAction;
            return {...state, isFetchingForecast: false, forecast};
        }
        case FETCH_FORECAST_FAILED: {
            const {payload: {errorKey}} = action as FetchForecastFailedAction;
            // todo - translation
            const error = errorKey;
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
    return state;
}