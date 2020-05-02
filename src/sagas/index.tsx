import { select, call, put, all, takeLatest } from 'redux-saga/effects';

import { FETCH_FORECAST, fetchForecastSucceeded, fetchForecastFailed } from '../actions';
import { StoreState } from '../store';
import { getCoordinatesForLocation } from '../external/locationSearchApi';
import { getLocationMapURL } from '../external/locationMapApi'
import { getLocationDailyWeather } from '../external/weatherApi';
import { MAX_FORECAST_DAYS } from '../constants';
import { SagaIterator } from 'redux-saga';

/**
 * Triggered when a FETCH_FORECAST action is fired, this saga retrieves the location
 * from the store and fetches the required data (world coordinates then map and weather).
 */
export function* fetchForecastSaga() {
    // don't allow concurrent requests
    yield takeLatest(FETCH_FORECAST, fetchForecast);
}

const getLocation = (state: StoreState) => state.location;

function* fetchForecast(): SagaIterator {
    try {
        const location = yield select(getLocation);
        const coords = yield call(getCoordinatesForLocation, location);
        if (!coords) {
            return yield put(fetchForecastFailed('fetch-location-not-found'));
        }
        const { longitude, latitude } = coords;

        // get the map and weather in parallel now we know the coordinates
        const [locationMapUrl, dailyWeather] = yield all([
            call(getLocationMapURL, longitude, latitude),
            call(getLocationDailyWeather, longitude, latitude, MAX_FORECAST_DAYS)
        ]);

        return yield put(fetchForecastSucceeded({
            locationMapUrl,
            dailyWeather,
        }));
    } catch (e) {
        console.error(e.message);
        return yield put(fetchForecastFailed('fetch-general-error'));
    }
}