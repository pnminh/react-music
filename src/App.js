import React, { Component } from 'react';
import './App.css';
import Library from './Library/Library';
import Album from './Album/Album';
import {Switch,Route} from 'react-router-dom'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
class App extends Component {
  constructor(){
    super();
    this.state={albums:[]}
    fetch('/assets/data/album.json')
        .then((data) => data.json())
        .then((albumData) => this.setState({albums:albumData}))
  }
  render() {
    let albumDropDown = []
    if(this.state.albums.length>0){
      albumDropDown = this.state.albums.map((album,id)=>{
        return (
          <LinkContainer key={id} to={`/album/${album.slug}`}>
            <MenuItem eventKey={`2.${id}`}>{album.title}</MenuItem>
          </LinkContainer>
        )
      })
    } 
    return (
      <div className="App">
      <Navbar>
        <Nav>
        <LinkContainer to="/">
          <NavItem eventKey={1}>Library</NavItem>
        </LinkContainer>
          <NavDropdown eventKey={2} title="Albums" id="basic-nav-dropdown">
            {albumDropDown}
          </NavDropdown>
        </Nav>
    </Navbar>
        <Switch>
          <Route exact path="/" render={() => (<Library albums={this.state.albums}/>)}/>
          <Route path="/album/:slug" render={(props) => (<Album albums={this.state.albums} {...props}/>)}/>
        </Switch>
      </div>
    );
  }
}

export default App;
