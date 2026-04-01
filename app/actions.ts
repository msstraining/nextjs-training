"use server";

import { writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { revalidatePath } from 'next/cache';
//
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function uploadImage(formData: FormData | undefined) {
  const file = formData?.get('image') as File;
  if (!file || file.size === 0) {
    throw new Error('No image provided');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure directory exists
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    // Ignore if directory exists
  }

  const path = join(UPLOAD_DIR, file.name);
  await writeFile(path, buffer);

  revalidatePath('/');
  return { success: true, name: file.name };
}

export async function getImages(): Promise<Array<string>> {
  try {
    //localStorage.getItem("")
    const files = await readdir(UPLOAD_DIR);
    // Filter for common image extensions
    return files.filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));
  } catch (error) {
    return [];
  }
}

export type LoginState = {
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: LoginState['errors'] = {};
  if (!email || !email.includes('@')) {
    errors.email = ['Please enter a valid email address'];
  }
  if (!password || password.length < 6) {
    errors.password = ['Password must be at least 6 characters'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Mock authentication logic
  if (email === 'admin@example.com' && password === 'password123') {
    return { success: true, message: 'Successfully logged in!' };
  }

  return { success: false, message: 'Invalid email or password' };
}
