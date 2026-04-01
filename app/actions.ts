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
