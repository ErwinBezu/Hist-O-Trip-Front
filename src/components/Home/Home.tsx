/* eslint-disable react/function-component-definition */
import { FC, useEffect, useState } from 'react';
import './Home.scss';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';
import UserProfil from '../UserProfil/UserProfil'
import UserEditProfil from '../UserProfil/UserEditProfil';

export type Category = {
  id: number;
  slug: string;
  name: string;
};

export type Post = {
  id: number;
  categoryId: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
};

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
