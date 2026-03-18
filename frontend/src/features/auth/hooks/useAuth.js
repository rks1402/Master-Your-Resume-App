import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getCurrentUser } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const {user,setUser,loading,setLoading} = context;

    const handleLogin = async(email,password) => {
        try {
            setLoading(true);
            const response = await login({email,password});
            setUser(response.user);
        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async(username,email,password) => {
        try {
            setLoading(true);
            const response = await register({username,email,password});
            setUser(response.user);
        } catch (error) {
            console.error("Error registering:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async() => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetCurrentUser = async() => {
        try {
            setLoading(true);
            const response = await getCurrentUser();
            setUser(response.user);
        } catch (error) {
            console.error("Error getting current user:", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetCurrentUser
    }
    
}