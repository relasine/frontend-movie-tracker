import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCall from '../../utilities/fetchCall';
import { getMovieList, updateFavorites, getUserLoggedIn } from '../../actions';
import { apiKey } from '../../utilities/apiKey';

import SingleMovie from '../../components/SingleMovie';
import LogButton from '../LogButton';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';

import './MoviesList.css'


class MoviesList extends Component {

  async componentDidMount() {
    const today = this.getTodaysDate();
    const filmObject = await fetchCall(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&/movie?primary_release_date.lte=${today}`);
    this.props.setFetchedMovies(filmObject.results);
    if (this.props.user.id) {
      const favorites = await this.getFavorites();
      localStorage.setItem('userInfo', JSON.stringify({
        favorites: favorites.data,
        user: this.props.user
      }));
      this.props.setFavorites(favorites.data);
    }

    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.props.logIn(userInfo.user.id, userInfo.user.name);
    }
  }

  getTodaysDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd;
    } 
    if(mm<10) {
        mm = '0'+mm;
    } 
    return `${mm}-${dd}-${yyyy}`;
  }

  getFavorites = async () => {
    const url = `http://localhost:3000/api/users/${this.props.user.id}/favorites`;
    return await fetchCall(url);
  }

  getMovies = () => {
    if (this.props.movies.length > 1) {
      return this.props.movies.map( movie => (
        <SingleMovie key={movie.title} {...movie} />
        ));
    } else {
      return '';
    }
  }


  render() {
      return (
        <div className='movies-list'>
          <header>
            <section className='header-wrapper'>
              <LogButton />
              <SearchBar />
            </section>
          </header>
          <section className='movies-wrapper'>
            <div className='movies-stripe'></div>
            {this.getMovies()}
          </section>
          <footer>
            <div className='footer-wrap'>
              <section className='logo-footer-section'>
                <Logo />
                <h1><span>movie</span>Tracker</h1>
              </section>
              <section className='scroll-social-wrapper'>
                <i className="fab fa-facebook scroll-social"></i>
                <i className="fab fa-instagram scroll-social"></i>
                <i className="fab fa-twitter scroll-social"></i>
              </section>
              <h3 className='footer-copyright'>© 2018 MovieTracker - All Rights Reserved</h3>
            </div>
          </footer>
        </div>
    );
  }
}


const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites
});

const mapDispatchToProps = (dispatch) => ({
  setFetchedMovies: (data) => dispatch(getMovieList(data)),
  setFavorites: (data) => dispatch(updateFavorites(data)),
  logIn: (id, name) => dispatch(getUserLoggedIn(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
