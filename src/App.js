import './App.css';
import Search from './components/search/Search';
import Current from './components/current-weather/Current';
function App() {


  const handleOnSearchChange = (searchData)=>{
    console.log(searchData)
  }
  return (
    <div className="App">
      <header className="App-header">
        < Search onSearchChange={handleOnSearchChange}/>
      </header>
      <Current/>
    </div>
  );
}

export default App;
