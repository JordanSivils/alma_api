import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
}

// export const confirmUser = async (id: string, email: string, name: string, image: string, emailVerified?: string) => {
//   let user = getUserByEmail(email);

//   try {
//     if (!user){
//       user = await prisma.user.create({
//         data: {
//           id: id,
//           email: email, 
//           image: image, 
//           name: name,
//           emailVerified: Date.now().toString() || null, 
//           role: "BASE",
//           createdAt: Date.now().toString() || undefined,
//           updatedAt: Date.now().toString() || undefined
//         }
//       })
//     }
//   } catch (error) {
    
//   }
  
    
  
// }