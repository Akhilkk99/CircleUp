import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../Actions/User';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    // Corrected: passing the arguments as an object
    dispatch(resetPassword({ otp, newPassword: password }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: '2vmax' }}>
          Circle Up
        </Typography>

        <input
          type="text"
          placeholder="OTP"
          required
          className="resetPasswordInputs"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          required
          className="resetPasswordInputs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
        <Link to='/'>Back to Login</Link>
      </form>
    </div>
  );
};

export default ResetPassword;
