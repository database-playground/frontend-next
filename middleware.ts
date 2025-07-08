import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { apolloClient, ERROR_UNAUTHORIZED } from './lib/apollo'
import { userQuery } from './lib/user'
import { ApolloError } from '@apollo/client'
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    try {
        await apolloClient.query({
            query: userQuery,
            context: {
                headers: {
                    cookie: (await cookies()).toString(),
                },
            },
        })
    } catch (error) {
        if (error instanceof ApolloError && error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions?.code === ERROR_UNAUTHORIZED) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!login|_next).*)',
    ],
}
