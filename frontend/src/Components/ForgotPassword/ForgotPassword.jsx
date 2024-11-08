import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/User';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      toast.success(message);
      navigate('/password/reset');
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message, dispatch, navigate]);

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
