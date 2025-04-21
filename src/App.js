import './App.css';
import Header from './components/Header';
import Getstarted from './components/Getstarted';
import Discovery from './components/Discovery';
import WhoWeServe from './components/WhoWeServe';
import ForecastTrader from './components/ForecastTrader';
import Subscribe from './components/Subscribe';

function App() {
  return (
    <div>
      <Header />
      <Getstarted/>
      <Discovery/>
      <WhoWeServe/>
      <ForecastTrader/>
      <Subscribe/>
    </div>
  );
}

export default App;
