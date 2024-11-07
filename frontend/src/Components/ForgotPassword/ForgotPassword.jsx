import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      alert.success(message);
      // Redirect to OTP verification page
      navigate('/password/reset');
      dispatch({ type: 'clearMessage' });
    }
  }, [alert, error, dispatch, message, navigate]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: '2vmax' }}>
          Circle Up
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
