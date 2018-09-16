import React, { Component } from 'react';
import { Media, Table } from 'react-bootstrap';
import {FaPlay} from 'react-icons/fa';
export default class Album extends Component {
    constructor(){
        super()
        this.state = {isPlaying:false,currentSong:null}
        this.audio = new Audio()
    }
    playPauseHandler (song,id){
        if(!this.state.currentSong || this.state.currentSong !== song){
            this.audio.setAttribute('src',song.audioSrc);
            this.audio.play();
            this.setState({currentSong:song,isPlaying:true})
        }else{
            if(this.state.isPlaying) this.audio.pause();
            else this.audio.play();
            this.setState({isPlaying:!this.state.isPlaying});
        }
    }
    render() {
        let album = this.props.albums.find(album => album.slug === this.props.match.params.slug);
        let albumDom = null;
        if (album) {
            albumDom = (
                <div>
                    <Media>
                        <Media.Left>
                            <img width={64} height={64} src={album.albumCover} alt="thumbnail" />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{album.title}</Media.Heading>
                            <p>
                                Artist:{album.artist}
                            </p>
                            <p>
                                {album.releaseInfo}
                            </p>
                        </Media.Body>
                    </Media>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Song Title</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                album.songs.map((song, id) =>
                                    <tr key={id}>
                                        <td>{song.title}</td>
                                        <td>{song.duration}</td>
                                        <td><FaPlay onClick={()=>this.playPauseHandler(song,id)}/></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>

            )
        }
        return (
            <div>
                {albumDom}
            </div>
        )
    }
}