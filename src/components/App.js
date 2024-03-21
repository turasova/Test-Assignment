import React, { useState } from 'react';
import axios from 'axios';
import css from './App.module.css';

const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=eth';

const App = () => {
  const [ethAmount, setEthAmount] = useState(0);
  const [action, setAction] = useState('buy');
  const [usdtPrice, setUsdtPrice] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      const price = data.tether.eth;
      setUsdtPrice(price);
      setError(null);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeEthAmount = event => {
    setEthAmount(event.target.value);
  };

  const handleChangeAction = event => {
    setAction(event.target.value);
  };

  const getResult = () => {
    if (!usdtPrice || isNaN(ethAmount)) return null;

    let result;
    if (action === 'buy') {
      result = ethAmount * usdtPrice;
    } else {
      result = ethAmount / usdtPrice;
    }
    return result.toFixed(2);
  };

  return (
    <>
      <div className={css.container}>
        <h1>
          USDT/ETH <br />
          Price Calculator
        </h1>
        <input
          className={css.inputPrice}
          type="number"
          value={ethAmount}
          onChange={handleChangeEthAmount}
          placeholder="Enter ETH amount"
        />
        <select
          className={css.selectActions}
          value={action}
          onChange={handleChangeAction}
        >
          <option value="buy">Buy ETH</option>
          <option value="sell">Sell ETH</option>
        </select>
        <button className={css.button} onClick={calculate}>
          Calculate
        </button>
        {error && <div>{error}</div>}
        {usdtPrice && (
          <div className={css.containerResult}>
            Current USDT/ETH price:
            <span className={css.price}>{usdtPrice}</span>{' '}
          </div>
        )}
        <div>
          Amount of USDT required:
          <span className={css.price}>{getResult()}</span>
        </div>
      </div>
    </>
  );
};

export default App;
