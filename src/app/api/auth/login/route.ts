import { connectDB } from "@/lib/db/mongoose";
import { UserModel } from "@/models/user.model";
import { createToken } from "@/lib/auth";
import { handleApiSuccess, handleApiError } from "@/lib/api-handler";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return handleApiError(new Error("Invalid credentials"));
    }

    const token = await createToken({ id: user._id, role: user.role });

    // ست کردن کوکی امن
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return handleApiSuccess({ name: user.name, role: user.role }, "Logged in");
  } catch (error) {
    return handleApiError(error);
  }
}
