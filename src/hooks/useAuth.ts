import { useDispatch, useSelector } from 'react-redux'
import { _getUsers } from '../../_DATA.ts'
import { login, logout } from '../slices/authSlice.ts'
import { UserModel } from '../types/models.ts'
import { RootState } from '../store.ts'

export default function useAuth() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    return {
        login: async (id: string, password: string) => {
            const users = await _getUsers() as { [key: string]: UserModel }
            const user = users[id]
            if (user && user.password === password) {
                dispatch(login(user))
                return user
            }
            return null
        },
        logout: () => {
            dispatch(logout())
        },
        isAuthenticated: () => !!user,
        user: () => user,
    }
}