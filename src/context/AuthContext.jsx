import { supabase } from '@/lib/supabase';
import { error_msg } from "@/src/context/error_msg";
import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

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
            async (event, session) => {
                if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
                    if (!session) {
                        // when invalid token cleans the session and user then redirect to login
                        setSession(null);
                        router.replace("/login");
                    }
                }

                if (session) {
                    setSession(session);
                }
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

    const user = session?.user;

    return (
        <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error(error_msg.useAuthOut)
    return ctx
}