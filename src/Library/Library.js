import React, { Component } from 'react';
import {albumData} from './../Album/Album'
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class Library extends Component {
  constructor(){
    super();
  }
  render() {
    let albumRendered=[]
    if(this.props.albums.length >0){
      albumRendered = 
      <Table striped bordered condensed hover>
              <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Cover Picture</th>
                <th>Info</th>
                <th>Link</th>
              </tr>
              </thead>
              <tbody>
              {
                this.props.albums.map((album,id)=>
                  <tr key={id}>
                    <td>{album.title}</td>
                    <td>{album.artist}</td>
                    <td><img src={album.albumCover} style={{width: 256, height: 256}}/></td>
                    <td>{album.releaseInfo}</td>
                    <td><Link to={`/album/${album.slug}`}>Go to album</Link></td>
                  </tr>
                )
              }
              </tbody>
            </Table>
      
    }
    return (
      <div>
        {albumRendered}
      </div>
    );
  }
}

export default Library;
