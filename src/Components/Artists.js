import React from 'react'
import { getArtists, getPerfromancesList } from '../Store/summerfest'
import Tracks from './Tracks'

function Artist ({ artist }) {
  return ( 
    <div>
      <a href={artist.spotifyLink}>{artist.name} : {artist.spotifyArtistId}</a>
      <Tracks artistId={artist.spotifyArtistId} />
      <img src={artist.image} />
    </div>
  )
}
const artists = getArtists(getPerfromancesList()) // make network call when data not coming from static

function Artists () {
  return (
    <div>
      {artists.map((artist, index) => <Artist key={index} artist={artist} />)}
    </div>
  )
}

export default Artists
