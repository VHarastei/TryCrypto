import { LandingLayout } from 'components/LandingLayout';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './Register.module.scss';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPayload } from 'api/authApi';
import { fetchRegister, setUserLoadingState } from 'store/slices/userSlice';
import { selectUserLoadingState } from 'store/selectors';
import { LoadingState } from 'store/slices/types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email adress').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function Register() {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectUserLoadingState);

  interface RegisterForm extends AuthPayload {
    passwordConfirmation: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterForm) => {
    const { passwordConfirmation, ...payload } = data;
    dispatch(fetchRegister(payload as AuthPayload));
  };

  const router = useRouter();
  useEffect(() => {
    if (loadingState === LoadingState.ERROR)
      setError('email', { type: 'manual', message: 'Email already in use' });
    if (loadingState === LoadingState.LOADED) router.push('/login');

    return () => {
      dispatch(setUserLoadingState(LoadingState.NEVER));
    };
  }, [loadingState]);

  return (
    <LandingLayout>
      <div className={styles.container}>
        <div className={styles.title}>Create account</div>

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
          <TextField
            name="Password Confirmation"
            type="password"
            register={register('passwordConfirmation')}
            error={errors.passwordConfirmation?.message}
          />

          <Button disabled={loadingState === LoadingState.LOADING} type="submit">
            Create account
          </Button>
        </form>
      </div>
    </LandingLayout>
  );
}
