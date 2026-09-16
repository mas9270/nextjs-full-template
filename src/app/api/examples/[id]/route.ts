import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { ExampleModel } from '@/models/example.model';
import { handleApiError, handleApiSuccess } from '@/lib/api-handler';
import { ApiError } from '@/types/api';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await ExampleModel.findById(id).lean();

    if (!item) {
      throw new ApiError(404, 'Example not found');
    }

    return handleApiSuccess(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedItem = await ExampleModel.findByIdAndDelete(id);

    if (!deletedItem) {
      throw new ApiError(404, 'Example not found');
    }

    return handleApiSuccess({ id }, 'Example deleted successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
