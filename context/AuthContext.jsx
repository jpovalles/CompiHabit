import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { error_msg } from './error_msg'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email, password, username) => {
        // Check if username is unique
        const { data } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
        if (data.length > 0) {
            throw new Error(error_msg.duplicateUsername)
        }

        const { data: dataSignUp, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error

        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id_profile: dataSignUp.user.id,
                username: username,
            })

        if (profileError) {
            console.log(profileError)
            throw profileError
        }
    }

    const signIn = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    return (
        <AuthContext.Provider value={{ session, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error(error_msg.useAuthOut)
    return ctx
}