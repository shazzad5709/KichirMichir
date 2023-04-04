import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "./prismadb";

const serverAuth = async (req:NextApiRequest) => {
  // console.log('_________________________________')
  // console.log(req.cookies);
  
  const session = await getSession({ req })
  console.log('ServerAuth session: ' + session);
  
  console.log('ServerAuth email: ' + session?.user?.email);
  
  if(!session?.user?.email) {
    throw new Error('Not signed in')
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if(!currentUser) {
    throw new Error('Not signed in')
  }

  return { currentUser }
}

export default serverAuth