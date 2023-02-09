import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Api from './Api_test'
import LoginPage from "../Login/LoginPage";
import RegisterPage from "../Register/RegisterPage";
import IndexPage from "../Index/IndexPage"

class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
    }
}
  componentDidMount() {}
  render () {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<IndexPage/>}/> 
            <Route path='/api_test' element={<Api />} />
            <Route path="/members/register" element={<RegisterPage/>}/>  
            <Route path ="/members/login" element={<LoginPage/>}/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
