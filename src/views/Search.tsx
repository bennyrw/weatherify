import React from 'react';
import {connect} from 'react-redux';

import {StoreState} from '../store';
import {fetchForecast, setLocation} from '../actions';

function bem(className: string, modifiers: object = {}) {
    return Object.entries(modifiers).reduce((acc, entry) => {
        return `${acc} ${acc}--${entry[0]}--${entry[1]}`;
    }, className);
}

function Search({location, onSetLocation, onSearch}: SearchProps) {
    const buttonEnabled = Boolean(location);
    return (
      <div className="search">
          <input className="search__location"
            data-testid="search-location"
            onChange={(e) => onSetLocation(e.target.value)} value={location}></input>
          <button className={bem('search__button', {enabled: buttonEnabled})}
            data-testid="search-button"
            onClick={() => buttonEnabled && onSearch()}
            disabled={!buttonEnabled}></button>
      </div>
    );
  }

interface SearchProps {
    location?: string;
    onSetLocation: (location: string) => void;
    onSearch: () => void;
}

function mapStateToProps({location}: StoreState) {
  return {
    location,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
      onSetLocation: (location: string) => dispatch(setLocation(location)),
      onSearch: () => dispatch(fetchForecast()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);