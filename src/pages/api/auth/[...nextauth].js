import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { post } from "../../../../handler"

import authConfig from '../../../../@core/config/auth'



const options = {
    secret: "DiabAfrica-Secret",
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/register' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "E-mail Address", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await post(authConfig.loginEndpoint, credentials);
                const user = await res.data
                // If no error and we have user data, return it
                if (res && res.status_code == 200) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null
            }
        })

    ],
    session: {
        jwt: true,
        age: 30 * 24 * 60 * 60,
        maxAge: 30 * 24 * 60 * 60
    },

    callbacks: {

        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                token = user;
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            return { ...session, user: token }


        }
    }
}

export default (req, res) => NextAuth(req, res, options)


