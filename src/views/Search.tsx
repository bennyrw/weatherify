import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { StoreState } from '../store';
import { fetchForecast, setLocation } from '../actions';

interface Props {
  location?: string;
  onSetLocation: (location: string) => void;
  onSearch: () => void;
}

/**
 * Component for the search icon, input and button.
 */
function Search(props: Props) {
  const [location, setLocation] = React.useState(props.location || '');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page reload
    e.preventDefault();

    props.onSetLocation(location);
    props.onSearch();
  }

  const buttonEnabled = Boolean(location);
  const styles = useStyles();

  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Avatar className={styles.avatar}>
          <LocationIcon fontSize="large" titleAccess="enter location" />
        </Avatar>
        <TextField
          className={styles.location}
          data-testid="search-location"
          name="location"
          variant="outlined"
          required
          fullWidth
          autoFocus
          onChange={onChange}
          value={location} />
        <Button
          className={styles.submit}
          data-testid="search-button"
          variant="contained"
          color="primary"
          type="submit"
          disabled={!buttonEnabled}>
          <SearchIcon titleAccess="search" />
        </Button>
      </form>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: theme.spacing(3),
  },
  location: {
  },
  submit: {
    margin: theme.spacing(0, 1),
  },
}));

function mapStateToProps({ location }: StoreState) {
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