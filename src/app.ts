
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from './api/user/userRoutes'
dotenv.config();

const app = express();
const port = 5555;

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(cors({
  credentials: true
}));


app.use(userRouter);
// app.get('/api/user/:id', async (req, res) => {
//   const { id } = req.params;
//   console.log('Received GET request for user with id:', id);

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//       include: { profile: true },
//     });
//     console.log('User found:', user);
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error retrieving user:', error);
//     res.status(500).json({ error: 'Failed to retrieve user' });
//   }
// });

// app.post('/api/user', async (req, res) => {
//   const { email, name, image } = req.body;
//   console.log('Received POST request to create/update user:', { email, name, image });

//   if (!email) {
//     console.error('Email is undefined');
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   try {
//     let user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       user = await prisma.user.create({
//         data: { email, image },
//       });
//       await prisma.profile.create({
//         data: { userId: user.id, name },
//       });
//       console.log('User and profile created:', user);
//     } else {
//       await prisma.user.update({
//         where: { email },
//         data: { image },
//       });
//       await prisma.profile.upsert({
//         where: { userId: user.id },
//         update: { name },
//         create: { userId: user.id, name },
//       });
//       console.log('User and profile updated:', user);
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error creating/updating user:', error);
//     res.status(500).json({ error: 'Failed to create or update user' });
//   }
// });

// app.put('/api/user', async (req, res) => {
//   const { id, name } = req.body;
//   console.log('Received PUT request to update profile:', { id, name });

//   try {
//     const updatedProfile = await prisma.profile.update({
//       where: { userId: id },
//       data: { name },
//     });
//     console.log('Profile updated:', updatedProfile);
//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ error: 'Failed to update profile' });
//   }
// });

app.listen(port, () => {
  console.log(`port ${port} running`)
})