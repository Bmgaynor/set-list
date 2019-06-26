import React from 'react'
import { createPlaylist } from '../Store/spotify'

function CreatePlaylist () {
  const [isCreating, setIsCreating] = React.useState(false)
  if (isCreating) {
    return <div>creating</div>
  }
  const createPlaylistOnClick = () => {
    setIsCreating(true)
    createPlaylist().then(() => {
      setIsCreating(false)
    })
  }
  return (
    <button onClick={createPlaylistOnClick}>create playlist</button>
  )
}

export default CreatePlaylist
