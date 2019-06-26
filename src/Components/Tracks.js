import React from 'react'
import { getTopTracks } from '../Store/spotify'

const useTracks = (artistId) => {
  const [tracks, setTracks] = React.useState()
  const [isFetchingTracks, setIsFetchingTracks] = React.useState(false)
  const getTracks = () => {
    setIsFetchingTracks(true)
    return getTopTracks(artistId)
      .then(tracks => {
        setIsFetchingTracks(false)
        setTracks(tracks)
      })
  }
  return [tracks, getTracks, isFetchingTracks]
}

function Track ({ track }) {
  const { id, preview_url, album, name } = track
  const { images } = album
  
  return (
    <div>
      <span>{name}</span>
      <audio  controls
              src={preview_url}>
            Your browser does not support the
            <code>audio</code> element.>
      </audio>
      <img src={images[2].url} />
    </div>
  )
}
function Tracks ({ artistId }) {
  const [tracks, getTracks, isFetchingTracks] = useTracks(artistId)
  if (!tracks) {
    return <button onClick={getTracks}>get tracks</button>
  }
  if (isFetchingTracks) {
    return <span>loading tracks</span>
  }
  return (
    <div>
      {tracks.map((track, index) =>  <Track key={index} track={track}/>)}
    </div>
  )
}

export default Tracks
