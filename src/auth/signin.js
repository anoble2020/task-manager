// SignInScreen.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect to the main app
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInScreen;