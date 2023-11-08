import React from 'react';
import TicTacToeImage from '@/assets/images/tic-tac-toe.png';
import GameSettings from '@/components/GameSettings/GameSettings';
import HomeActions from '@/components/HomeActions/HomeActions';
import './HomePage.scss';

const HomePage: React.FC = () => {
  console.log('home page');
  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Tic Tac Toe</h1>
      </div>

      <div className="page-body">
        <img className="preview" src={TicTacToeImage} alt="" />
        <GameSettings />
        <HomeActions />
      </div>
    </div>
  );
};

export default HomePage;
