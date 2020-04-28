import React from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { render, RenderResult, fireEvent } from '@testing-library/react';

import Search from '../Search';
import { StoreState, getInitialState } from '../../store';
import { Action, fetchForecast, setLocation } from '../../actions';
import { reducer } from '../../reducers';

describe('search controls', () => {
    const renderWithStoreState = ((state: StoreState) => {
        const store = createStore<StoreState, Action, any, any>(reducer, state);
        store.dispatch = jest.fn();
        const renderResult = render(<Provider store={store}><Search /></Provider>);
        return {
            store,
            renderResult,
        }
    });

    it('without a location, the button is disabled', () => {
        const state = getInitialState();
        state.location = '';

        const {renderResult: {getByTestId}} = renderWithStoreState(state);
        
        const locationElement = getByTestId('search-location');
        expect(locationElement).toBeVisible();

        let searchButton = getByTestId('search-button');
        expect(searchButton).toBeVisible();
        expect(searchButton).toBeDisabled();
    });

    it('with a location, the button is enabled and clicking it generates fetch action', () => {
        const state = getInitialState();
        state.location = 'London';

        const {store, renderResult: {getByTestId}} = renderWithStoreState(state);
        
        const locationElement = getByTestId('search-location');
        expect(locationElement).toBeVisible();

        let searchButton = getByTestId('search-button');
        expect(searchButton).toBeVisible();
        expect(searchButton).toBeEnabled();

        searchButton.click();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(fetchForecast());
    });

    it('entering a location fires appropriate action', () => {
        const {store, renderResult: {getByTestId}} = renderWithStoreState(getInitialState());
        
        const locationElement: HTMLInputElement = getByTestId('search-location') as HTMLInputElement;

        fireEvent.change(locationElement, { target: { value: 'Chatham' }})
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        const setLocationAction = setLocation('Chatham');
        expect(store.dispatch).toHaveBeenCalledWith(setLocationAction);
        expect(locationElement.value).toBe('Chatham');
    });
});
