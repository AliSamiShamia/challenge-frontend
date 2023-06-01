import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function AuthMiddleware({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession()
    useEffect(
        () => {
            if (!router.isReady) {
                return
            }
            if (status == "unauthenticated" && (!session) && !window.localStorage.getItem('user')) {
                if (router.asPath !== '/') {
                    router.replace({
                        pathname: '/auth/login',
                        query: { returnUrl: router.asPath }
                    })
                } else {
                    router.replace('/auth/login')
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [session])

    return children


}

export default AuthMiddleware;