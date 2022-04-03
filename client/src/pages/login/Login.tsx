import React from 'react'

import { NavLink } from 'react-router-dom'

import { Button } from '../../components/common'


export const Login: React.FC = () => (
  <div
    style={{
      width: '415px',
      height: '600px',
      backgroundColor: 'white',
      margin: '0 auto',
    }}
  >
    <h1>it-incubator</h1>
    <span>Sign In</span>
    <div>
      <form>
        <div>
          <input type="email" />
        </div>
        <div>
          <input type="password" />
        </div>
        <p>Forgot Password</p>
        <Button type="submit">Login</Button>
      </form>
      <p>Don’t have an account?</p>
      <NavLink to="/signUp">Sign Up</NavLink>
    </div>
  </div>
)
