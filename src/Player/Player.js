import React, { Component } from 'react';
import './Player.css';
import { FaStepForward, FaStepBackward, FaRandom, FaRedo } from 'react-icons/fa';
export default class Player extends Component {
    render() {
        return (

            <div className="player">
                <div className="player__list">
                    <div className="player__icon player__icon-list icon-list"></div>
                </div>
                <div className="player__volume">
                    <div className="player__icon player__icon-volume icon-volume"></div>
                </div>
                <div className="player__meta">
                    <div className="player__song">{this.props.currentSong.title}</div>
                    <div className="play_album">{this.props.currentAlbum.title}</div>
                </div>
                <div className="player__bg" style={{ backgroundImage: "url(https://ivanodintsov.ru/uploads/player_bg.jpg)" }}></div>
                <div className="player__controls">
                    <div className="player__controls-bg" style={{ backgroundImage: "url(https://ivanodintsov.ru/uploads/player_bg.jpg)" }}></div>
                    <div className="player__repeat">
                        <div><FaRedo className="player__icon player__icon-repeat" /></div>
                    </div>
                    <div className="player__prev" onClick={()=>{this.props.playerPreviousHandler()}}>
                        <div><FaStepBackward className="player__icon player__icon-prev" /></div>
                    </div>
                    <div className="player__play" onClick={()=>{this.props.playerPlayPauseHandler()}}>
                        <div>{this.props.renderPlayerPlayPause()}</div>
                    </div>
                    <div className="player__next" onClick={()=>{this.props.playerNextHandler()}}>
                        <div><FaStepForward className="player__icon player__icon-next" /></div>
                    </div>
                    <div className="player__shuffle">
                        <div><FaRandom className="player__icon player__icon-shuffle" /></div>
                    </div>
                </div>
            </div>
        )
    }
}