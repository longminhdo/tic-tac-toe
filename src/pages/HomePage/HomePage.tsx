import React, { useEffect } from 'react';
import TicTacToeImage from '@/assets/images/tic-tac-toe.png';
import GameSettings from '@/components/GameSettings/GameSettings';
import HomeActions from '@/components/HomeActions/HomeActions';
import './HomePage.scss';

interface IHomePage {
  setVisited: any;
}

const HomePage: React.FC<IHomePage> = ({ setVisited }) => {
  useEffect(() => {
    setVisited(true);
  }, [setVisited]);

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
