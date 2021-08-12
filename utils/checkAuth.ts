import { Store } from '@reduxjs/toolkit';
import { Api } from 'api';
import { RootState } from 'store';
import { User } from 'store/slices/types';
import { setUserData } from 'store/slices/userSlice';

export const checkAuth = async (
  store: Store<RootState>,
  token?: string
): Promise<undefined | any> => {
  try {
    const user = await Api(token).getMe();
    store.dispatch(setUserData(user));
  } catch (error) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};
