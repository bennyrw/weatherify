import { select, call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_FORECAST, fetchForecastSucceeded, fetchForecastFailed } from '../actions';
import { StoreState } from '../store';
import { getCoordinatesForLocation } from '../external/locationSearchApi';
import { getLocationMapURL } from '../external/locationMapApi'
import { getLocationDailyWeather } from '../external/weatherApi';

/**
 * Triggered when a FETCH_FORECAST action is fired, this saga retrieves the location
 * from the store and fetches the required data (map and weather).
 */
export function* fetchForecastSaga() {
    // don't allow concurrent requests
    yield takeLatest(FETCH_FORECAST, fetchForecast);
}

const getLocation = (state: StoreState) => state.location;

function* fetchForecast() {
    try {
        const location = yield select(getLocation);
        const coords = yield call(getCoordinatesForLocation, location);
        if (!coords) {
            return yield put(fetchForecastFailed('fetch-location-not-found'));
        }

        const { longitude, latitude } = coords;
        const locationMapUrl = yield call(getLocationMapURL, longitude, latitude);
        const dailyWeather = yield call(getLocationDailyWeather, longitude, latitude);
        return yield put(fetchForecastSucceeded({
            locationMapUrl,
            dailyWeather,
        }));
    } catch (e) {
        console.error(e.message);
        return yield put(fetchForecastFailed('fetch-general-error'));
    }
}