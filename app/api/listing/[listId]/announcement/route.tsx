import { NextRequest, NextResponse } from 'next/server';
import { getAnnouncementsByListingId } from '@/lib/db/announcement.queries';

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      listId: string;
    };
  }
) {
  const { listId } = params;

  try {
    const data = await getAnnouncementsByListingId(listId);

    if (data.length === 0) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'ไม่พบข้อมูลรายการประกาศ',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'ไม่สามารถดึงข้อมูลรายการประกาศได้',
    });
  }
}
