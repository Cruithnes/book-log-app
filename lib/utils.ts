import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import "dotenv/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function uploadToCloudinary(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Make sure this is correct
  formData.append("folder", "bookCovers"); // Optional

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    const data = JSON.parse(text);
    return data.secure_url || null;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
}

export function isAdmin(session: any): boolean {
  if (!session?.user?.email) return false;
  return session.user.email === process.env.ADMIN_EMAIL;
}

