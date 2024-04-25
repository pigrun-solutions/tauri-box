export const useAuth = () => {
    const signIn = () => sessionStorage.setItem('isAuthenticated', 'true')

    const signOut = () => sessionStorage.removeItem('isAuthenticated')

    const isLogged = () => sessionStorage.getItem('isAuthenticated') === 'true'

    return { signIn, signOut, isLogged }
}

export type AuthContext = ReturnType<typeof useAuth>