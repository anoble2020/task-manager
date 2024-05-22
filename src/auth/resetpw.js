// ResetPasswordScreen.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useContext(AuthContext);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      // Show a success message or redirect to a confirmation page
    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;