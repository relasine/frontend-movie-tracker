import React from 'react';
import { connect } from 'react-redux';
import { logUserOut, updateFavorites } from '../../actions'
import { NavLink } from 'react-router-dom'

export const LogButton = (props) => {
  
  const logOutUser = () => {
    props.logOut();
    props.removeFavorites();
    localStorage.removeItem('userInfo') 
  }
  
  return (
    <NavLink to='/login'>
    {props.user.id && 
     <button 
      onClick={() => logOutUser()}
      className='login-logout-btn'
    >log out</button> 
    }
    {!props.user.id && 
      <button
        className='login-logout-btn'
      >login</button>
    }
    </NavLink>
  )
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logUserOut()),
  removeFavorites: () => dispatch(updateFavorites())
})

export default connect(mapStateToProps, mapDispatchToProps)(LogButton)