import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../utils/AuthContext'

const Protected = ({children}) => {
  const {Auth} = useContext(AuthContext)

  if (!Auth){
    return <Navigate to='/login' />
  }

  return children;

}

export default Protected