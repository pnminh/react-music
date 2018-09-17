import React, { Component } from 'react';
import './App.css';
import Library from './Library/Library';
import Album from './Album/Album';
import { Switch, Route } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlay, FaPause } from 'react-icons/fa';
import Player from './Player/Player';
class App extends Component {
  constructor() {
    super();
    this.audio = new Audio();
    this.state = {
      albums: [],
      currentAlbum: null, currentSong: null,currentId:null, isPlaying: false
    }
    fetch('/assets/data/album.json')
      .then((data) => data.json())
      .then((albumData) => {
        this.setState({ albums: albumData })
      })
  }
  playPauseHandler = (album, song, id) => {
    let state;
    if (!this.state.currentAlbum || this.state.currentAlbum !== album ||
      !this.state.currentSong || this.state.currentSong !== song) {
      this.audio.setAttribute('src', song.audioSrc);
      this.audio.play();
      state  = { currentAlbum: album, currentSong: song, isPlaying: true }
    }
    else {
      if (this.state.isPlaying) this.audio.pause();
      else this.audio.play();
      state = { isPlaying: !this.state.isPlaying };
    }
    state.currentId = id;
    this.setState(state);
  }
  renderPlayPause = (album, song, id) => {
    if (this.state.currentSong === song) {
      if (this.state.isPlaying) {
        return (
          <span><FaPause /></span>
        )
      } else {
        return <span><FaPlay /></span>
      }
    } else {
      return <span><FaPlay /></span>
    }
  }
  renderPlayerPlayPauseHandler = () => {
    return this.state.isPlaying ? 
    <span><FaPause className="player__icon player__icon-play" /> </span>
    : <span><FaPlay className="player__icon player__icon-play" /></span>
  }
  playerPlayPauseHandler = () => {
    if (this.state.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.setState({ isPlaying: !this.state.isPlaying })
  }
  playerNextHandler = () => {
    var currentId = this.state.currentId;
    if(currentId !=null && currentId < this.state.currentAlbum.songs.length-1){
      currentId++;
      this.audio.setAttribute('src', this.state.currentAlbum.songs[currentId].audioSrc);
      this.audio.play();
      this.setState({currentId:currentId,currentSong:this.state.currentAlbum.songs[currentId]})
    }
  }
  playerPreviousHandler = () => {
    var currentId = this.state.currentId;
    if(currentId !=null && currentId >0){
      currentId--;
      this.audio.setAttribute('src', this.state.currentAlbum.songs[currentId].audioSrc);
      this.audio.play();
      this.setState({currentId:currentId,currentSong:this.state.currentAlbum.songs[currentId]})
    }
  }
  render() {
    let albumDropDown = []
    if (this.state.albums.length > 0) {
      albumDropDown = this.state.albums.map((album, id) => {
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
          <Route exact path="/" render={() => (<Library albums={this.state.albums} />)} />
          <Route path="/album/:slug" render={(props) => (<Album playPauseHandler={this.playPauseHandler} renderPlayPause={this.renderPlayPause} albums={this.state.albums} {...props} />)} />
        </Switch>
        {(this.state.currentAlbum && this.state.currentSong) ? 
        <Player renderPlayerPlayPause={this.renderPlayerPlayPauseHandler} 
        playerPlayPauseHandler={this.playerPlayPauseHandler}
        playerNextHandler={this.playerNextHandler}
        playerPreviousHandler={this.playerPreviousHandler}
        currentAlbum={this.state.currentAlbum} 
        currentSong={this.state.currentSong} /> 
        : null}
      </div>
    );
  }
}

export default App;
