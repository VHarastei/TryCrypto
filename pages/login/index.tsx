import { LandingLayout } from 'components/LandingLayout';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPayload } from 'api/authApi';
import { fetchLogin, fetchRegister, setUserLoadingState } from 'store/slices/userSlice';
import { selectUser, selectUserLoadingState } from 'store/selectors';
import { LoadingState } from 'store/slices/types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectUserLoadingState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthPayload>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AuthPayload) => {
    dispatch(fetchLogin(data));
  };

  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (loadingState === LoadingState.ERROR)
      setError('password', { type: 'manual', message: 'Wrong email or password' });
    if (loadingState === LoadingState.LOADED && user) {
      Cookies.remove('token');
      Cookies.set('token', user.token);
      router.push('/home');
    }

    return () => {
      dispatch(setUserLoadingState(LoadingState.NEVER));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingState]);

  return (
    <LandingLayout>
      <div className={styles.container}>
        <div className={styles.title}>TryCrypto Account Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            name="Email"
            type="text"
            register={register('email')}
            error={errors.email?.message}
          />

          <TextField
            name="Password"
            type="password"
            register={register('password')}
            error={errors.password?.message}
          />
          <Button
            disabled={loadingState === LoadingState.LOADING}
            isLoading={loadingState === LoadingState.LOADING}
            type="submit"
          >
            Log In
          </Button>
        </form>
        <Link href="/register">
          <a className={styles.link}>Don`t have an account? Register now</a>
        </Link>
      </div>
    </LandingLayout>
  );
}
