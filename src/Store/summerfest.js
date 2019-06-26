import summerfestData from './summerfestData.json'

export const getSummerfestData = () => {
  return summerfestData
}
export const getPerfromancesList = () => {
  return Object.values(summerfestData)
}

const getArtistId = link => {
  const pathname = new URL(link).pathname  
  return pathname.split('/')[2]
}
const spotifyRegex = new RegExp('\\bspotify\\b')
export const getArtists = (performances) => {
  return performances.reduce((pages, performance) => {
    const { socials, name, image } = performance

    const spotifyPages = socials.filter((social) => {
      const isSoundcloudType = social.type === 'soundcloud'
      const isASpotifyLink = spotifyRegex.test(social.link)
      return isSoundcloudType && isASpotifyLink
    }).map((social) => {
      return {
        name,
        image,
        spotifyLink: social.link,
        spotifyArtistId: getArtistId(social.link)
      }
    })

    return [...spotifyPages, ...pages]
  }, [])
}