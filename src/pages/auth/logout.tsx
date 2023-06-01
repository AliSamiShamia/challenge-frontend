import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function logout() {
    const router = useRouter();
    const { data: session, status } = useSession()
    useEffect(() => {
        // signOut(session);
    }, []);
    return router.replace('/')
}

export default logout;