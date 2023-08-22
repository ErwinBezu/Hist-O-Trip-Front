/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import './Home.scss';
import Header from '../Header/Header';
import Card from '../Card/Card';

const Home = () => {
  return (
    <>
      <Header />
      <Card />
    </>
  );
};

export default Home;
