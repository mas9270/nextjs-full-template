import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db/mongoose";
import { UserModel } from "@/models/user.model";
import { verifyToken } from "@/lib/auth";
import { handleApiError, handleApiSuccess } from "@/lib/api-handler";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return handleApiError(new Error("احراز هویت نشده‌اید"));
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return handleApiError(new Error("توکن نامعتبر یا منقضی شده است"));
    }

    await connectDB();
    const user = await UserModel.findById(payload.id).select("-password");

    if (!user) {
      return handleApiError(new Error("کاربر یافت نشد"));
    }

    return handleApiSuccess(user, "اطلاعات پروفایل دریافت شد");
  } catch (error) {
    return handleApiError(error);
  }
}
