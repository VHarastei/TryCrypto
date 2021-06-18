import { Layout } from 'components/Layout';
import React from 'react';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>content</Layout>
    </div>
  );
}
