import { customAxios } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = customAxios.interceptors.request.use(
            async config => {
              const token = await auth?.getIdToken()
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        return () => {
            customAxios.interceptors.request.eject(requestIntercept);
        }
    }, [auth])

    return customAxios;
}

export default useAxiosPrivate;