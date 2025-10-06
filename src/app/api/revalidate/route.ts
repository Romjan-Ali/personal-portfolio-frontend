// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    
    if (!tag) {
      return NextResponse.json({ error: 'Tag is required' }, { status: 400 })
    }

    revalidateTag(tag)
    
    return NextResponse.json({ revalidated: true, tag })
  } catch (error) {
    console.error('Error revalidating tag:', error)
    return NextResponse.json(
      { error: 'Error revalidating tag' },
      { status: 500 }
    )
  }
}