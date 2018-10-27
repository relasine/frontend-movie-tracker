import React from 'react';
import { shallow, mount } from 'enzyme';

import { FavoriteBtn, mapDispatchToProps, mapStateToProps } from './index';
import * as Actions from '../../actions';


describe('FavoriteBtn', () => {
  let mockToggleFavorite;
  let wrapper;

  beforeEach(() => {
    mockToggleFavorite = jest.fn();
    wrapper = shallow(<FavoriteBtn toggleFavorite={mockToggleFavorite} />)
  })
  
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  
  it('should toggle favorite on click', () => {
    // mockToggleFavorite = jest.fn();
    // wrapper = mount(<FavoriteBtn toggleFavorite={mockToggleFavorite} />)
    // wrapper.find('.favorite-btn').simulate('click');
    // expect(mockToggleFavorite).toHaveBeenCalled();
  })

  it('should check if the user is logged in', () => {

  })

  it('should post a fetch with the correct parameters', () => {

  })

  it('should be isFavorited if it has been favorited', () => {
    
  })

  describe('mapStateToProps', () => {
    it('should map the state to props', () => {
      const mockUser = {
          name: 'Aaron',
          id: 1
      }

      const mockMovies = [
        {
          title: 'Die Hard',
          rating: 'R'
        },
        {
          title: 'Die Hard 2',
          rating: 'R'
        },
        {
          title: 'Die Hard with a Vengeance',
          rating: 'R'
        }
      ]

      const mockFavorites = [
        {
          title: 'Die Hard',
          rating: 'R'
        },
        {
          title: 'Die Hard 2',
          rating: 'R'
        },
        {
          title: 'Die Hard with a Vengeance',
          rating: 'R'
        }
      ]
      
      const expectedUser = mockUser
      const expectedMovies = mockMovies
      const expectedFavorites = mockFavorites
      const mockState = {
        user: {...mockUser},
        movies: mockMovies,
        favorites: mockFavorites
      }
      
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps.user).toEqual(expectedUser)
      expect(mappedProps.movies).toEqual(expectedMovies)
      expect(mappedProps.favorites).toEqual(expectedFavorites)
    })
    
  })
  
  describe('mapDispatchToProps', () => {
    it('should map the dispatch to props', () => {
      const mockUser = {
        name: 'Aaron',
        id: 1
      }

      const mockFavorites = [
        {
          title: 'Die Hard',
          rating: 'R'
        },
        {
          title: 'Die Hard 2',
          rating: 'R'
        },
        {
          title: 'Die Hard with a Vengeance',
          rating: 'R'
        }
      ]

      const mockDispatch = jest.fn();
      const actionToDispatch = Actions.updateFavorites(mockFavorites)
      const mappedProps = mapDispatchToProps(mockDispatch);
      
      mappedProps.setFavorites(mockFavorites)

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
})