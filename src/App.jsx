import './App.css'
import Brewery from './Components/breweryInfo'
import Breweries from './Components/features'
import BreweryBarChart from './Components/graph'

function App() {

  return (
    <div className="app">
      <div className='title-container'>
        <h1>Brewtopia 🍻</h1>
        <h2>Ale's well that ends well: chuckles guaranteed!</h2>
      </div>
      <div className='content-container'>
        <BreweryBarChart />
        <Breweries />
        <Brewery />
      </div>
    </div>
  )
}

export default App
