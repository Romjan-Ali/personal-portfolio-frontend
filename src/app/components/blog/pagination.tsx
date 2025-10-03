'use client'

import SmartPagination from '@/components/smart-pagination'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Pagination = ({ pagination }: { pagination: { pages: number } }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    router.push(`/blog?${params.toString()}`)
  }, [currentPage, router])

  return (
    <SmartPagination
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      totalPages={pagination.pages}
    />
  )
}

export default Pagination
