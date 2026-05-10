"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const adminId = formData.get("adminId");
  const password = formData.get("password");

  if (
    adminId === process.env.ADMIN_ID &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();
    // In a real app, sign a JWT here. For now, a secure random string token.
    cookieStore.set("admin_session", "authenticated_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid Admin Credentials" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
