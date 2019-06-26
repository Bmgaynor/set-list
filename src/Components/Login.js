import React from 'react'
import { getLoginUrl, handleToken, getMe } from '../Store/spotify'

function LoginButton () {
  return (
    <a
      className="App-link"
      href={getLoginUrl()}
    >
      Login
  </a>
  )
}

function User (props) {
  return (
    <div>Welcome {props.user.display_name}</div>
  )
}

function Login() {
  const [user, setUser] = React.useState({})
  React.useEffect(handleToken, [])
  React.useEffect(() => {
    getMe().then((data) => {
      setUser(data)
    })
  }, [])
  if (!user.display_name) {
    return <LoginButton />
  } else {
    return <User user={user} />
  }
}
export default Login