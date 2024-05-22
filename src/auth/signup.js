// SignUpScreen.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      // Redirect to a success page or the main app
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpScreen;