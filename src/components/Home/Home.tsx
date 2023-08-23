/* eslint-disable react/function-component-definition */
import { FC } from 'react';
import './Home.scss';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <>

      <Header />
      <Card />
      <Footer />
    </>
  );
};

export default Home;
