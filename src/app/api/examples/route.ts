import { NextRequest } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db/mongoose';
import { ExampleModel } from '@/models/example.model';
import { handleApiError, handleApiSuccess } from '@/lib/api-handler';

const createExampleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
});

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 10));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      ExampleModel.find({ isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ExampleModel.countDocuments({ isActive: true }),
    ]);

    return handleApiSuccess(items, 'Examples fetched successfully', {
      page,
      limit,
      total,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validatedData = createExampleSchema.parse(body);

    const newExample = await ExampleModel.create(validatedData);

    return handleApiSuccess(newExample, 'Example created successfully', undefined, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
