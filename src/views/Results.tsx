import React from 'react';
import {connect} from 'react-redux';

import {StoreState} from '../store';
import {} from '../actions';

function ResultsPanel({}: Props) {
    return (
      <div className="results-panel">
      </div>
    );
  }

interface Props {
    // location?: string;
    // onSetLocation: (location: string) => void;
    // onSearch: () => void;
}

function mapStateToProps({location}: StoreState) {
  return {
    // location,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    //   onSetLocation: (location: string) => dispatch(setLocation(location)),
    //   onSearch: () => dispatch(fetchForecast()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPanel);