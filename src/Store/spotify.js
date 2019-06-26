import { get, post } from 'axios'
import { getSummerfestData, getArtists, getPerfromancesList } from './summerfest'

const CLIENT_ID = 'e5e5b796795b448d8d458f391b95a7c9'
const SCOPES = 'user-read-private user-read-email playlist-modify-public'
const REDIRECT_URI = 'http://localhost:3000'


export const getHashParams = () => {
  const hashParams = {}
  let e
  let r = /([^&;=]+)=?([^&;]*)/g
  let q = window.location.hash.substring(1)
  while (e = r.exec(q)) {  // eslint-disable-line
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

export const getLoginUrl = () => {
  // https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123
  return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&response_type=token&state=123`
}

export const login = () => {
  window.location = getLoginUrl()
}

export const handleToken = () => {
  const hashedParams = getHashParams()
  if (hashedParams.access_token) {
    window.localStorage.setItem('access_token', hashedParams.access_token)
    window.location.hash = ''
  }
}

const getSpotifyHeaders = () => {
  const accessToken = window.localStorage.getItem('access_token')
  return {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json'
  }
}

export const getMe = () => {
  const userInfo = window.localStorage.getItem('user_info')
  if (userInfo) {
    return Promise.resolve(JSON.parse(userInfo))
  }
  return get('https://api.spotify.com/v1/me', {
    headers: getSpotifyHeaders()
  }).then(({ data }) => {
    window.localStorage.setItem('user_info', JSON.stringify(data))
    return data
  })
  .catch(err => {
    console.error(err)
    return {}
  })
}

const buildPlaylist = () => {
  return {
    name: 'Dope summerfest playlist'    
  }
}

export const createPlaylist = async () => {
  const user = await getMe()
  const { id } =  user
  const { data } = await post(`https://api.spotify.com/v1/users/${id}/playlists`, buildPlaylist() , {
      headers: getSpotifyHeaders()
    })
  return data
}

export const getTopTracks = artistId => {
  return get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, { headers: getSpotifyHeaders() })
    .then(({ data }) => {
      return data.tracks
    })
}


// console.log(getTopSongs('7sKxqpSqbIzphAKAhrqvlf'))

// console.log(getPerfromancesList()[0])
console.log(getArtists(getPerfromancesList()))