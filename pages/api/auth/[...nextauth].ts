import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma  from '../../../libs/prismadb'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password)
          throw new Error('Invalid credentials')
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if(!user || !user?.hashedPassword)
          throw new Error('Invalid credentials')

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

        if(!isCorrectPassword)
          throw new Error('Invalid credentials')

        user.hashedPassword=''
        return user
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
        return { ...token, ...user };
    },
    async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.user = token;
        return session;
    },
  },
})