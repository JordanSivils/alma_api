import { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (req:Request, res: Response) => {
  const { id } = req.params;
  console.log('Received GET request for user with id:', id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
    console.log('User found:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

export const createOrUpdateUser = async (req:Request, res: Response) => {
  const { email, name, image, id } = req.body;
  console.log('Received POST request to create/update user:', { email, name, image });

  if (!email) {
    console.error('Email is undefined');
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: id, email: email, image: image, name: name },
      });
      await prisma.profile.create({
        data: { userId: user.id, name },
      });
      console.log('User and profile created:', user);
    } else {
      user =  await prisma.user.update({
        where: { email },
        data: { image, name },
      });
      await prisma.profile.upsert({
        where: { userId: user.id },
        update: { name },
        create: { userId: user.id, name },
      });
      console.log('User and profile updated:', user);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: 'Failed to create or update user' });
  }
}

export const updateProfile = async (req:Request, res: Response) => {
  const { id, name } = req.body;
  console.log('Received PUT request to update profile:', { id, name });

  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId: id },
      data: { name },
    });
    console.log('Profile updated:', updatedProfile);
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}