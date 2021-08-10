import { LandingLayout } from 'components/LandingLayout';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterPayload } from 'api/authApi';
import { fetchRegister } from 'store/slices/userSlice';
import { selectUserLoadingState } from 'store/selectors';
import { LoadingState } from 'store/slices/types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectUserLoadingState);

  interface RegisterForm extends RegisterPayload {
    passwordConfirmation: string;
  }

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
    setError,
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterForm) => {
    const { passwordConfirmation, ...payload } = data;
    dispatch(fetchRegister(payload as RegisterPayload));
  };

  useEffect(() => {
    if (loadingState === LoadingState.ERROR)
      setError('email', { type: 'manual', message: 'Email already in use' });
  }, [loadingState]);
  console.log(isValid);

  const router = useRouter();

  return (
    <LandingLayout>
      <div className={styles.container}>
        <div className={styles.title}>Create account</div>
        {/* 
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            name="Email"
            type="text"
            register={register('email')}
            error={errors.email?.message}
          />
          <TextField
            name="Username"
            type="text"
            register={register('username')}
            error={errors.username?.message}
          />
          <TextField
            name="Password"
            type="password"
            register={register('password')}
            error={errors.password?.message}
          />
          <TextField
            name="Password Confirmation"
            type="password"
            register={register('passwordConfirmation')}
            error={errors.passwordConfirmation?.message}
          />

          <Button
            onClick={() => router.push('/login')}
            disabled={loadingState === LoadingState.LOADING || !isValid}
            type="submit"
          >
            Create account
          </Button>
        </form> */}
      </div>
    </LandingLayout>
  );
}
