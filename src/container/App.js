import './App.css';
import React, {Component} from 'react';
import CardList from './CardList';
import { robots } from './Robots';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from '../component/ErrorBoundry'

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: robots,
      searchArray: ''
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => {this.setState({ robots: users})});
  }
  onSearchChange = (event) => {
    this.setState({ searchArray: event.target.value})
  }
  render() {
    const {robots, searchArray} = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchArray.toLowerCase())
    })
    return (
      <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
        <ErrorBoundry>
        <CardList robots = {filteredRobots}/>  
        </ErrorBoundry>
        </Scroll>  
    </div>
  );
}
}
export default App;
