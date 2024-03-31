import { Authentication } from '@/services/firebase'
import { useEffect, useState } from 'react'
import { useUser, InitialUserState } from './user';

export  const AuthStateChangeProvicer = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useUser();
    const {setUser} = user;

    const initiateAuthStateChange = () => {
        Authentication().onAuthStateChanged((user) => {
            if (user) {
                setUser({email: user.email, uuid: user.uid})
            } else {
                setUser(InitialUserState)
            }
            setIsLoading(false)
        })
    }
    useEffect(() => {
        initiateAuthStateChange()
    }, [])

    if(isLoading){
        return <i className='flex justify-center items-center h-[100vh] text-subtext text-3xl bx bx-loader-alt bx-spin' ></i>
    }
    
    return children
}