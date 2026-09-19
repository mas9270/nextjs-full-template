import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/mongoose";
import { UserModel, UserRole } from "@/models/user.model";
import { createToken } from "@/lib/auth";
import { handleApiError, handleApiSuccess } from "@/lib/api-handler";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return handleApiError(new Error("تمام فیلدها الزامی هستند"));
    }

    const existingUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return handleApiError(new Error("این ایمیل قبلاً ثبت شده است"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: UserRole.CUSTOMER,
    });

    const token = await createToken({
      id: newUser._id.toString(),
      role: newUser.role,
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return handleApiSuccess(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      "ثبت‌ نام با موفقیت انجام شد",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
