import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "rk_steel_secret_key_2026_super_secure_jwt_token_key";
const COOKIE_NAME = "admin_token";

export interface AdminPayload {
  username: string;
  isAdmin: boolean;
}

export function signAdminToken(username: string): string {
  return jwt.sign({ username, isAdmin: true }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
