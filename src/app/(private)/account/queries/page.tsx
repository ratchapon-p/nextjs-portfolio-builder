import React from 'react'
import { getCurrentUser } from '@/actions/user'
import { fetchQueriesOfUser } from '@/actions/queries'
import { IQuery } from '@/interfaces'
import dayjs from 'dayjs'

async function QueriesPage() {

  const userResponse: any = await getCurrentUser()
  if (!userResponse.success) {
    return <div className="">Failed to load user data</div>
  }

  const queriesResponse = await fetchQueriesOfUser(userResponse?.data?.id!)
  if (!userResponse.success) {
    return <div className="">Failed to load queries</div>
  }

  const queries: IQuery[] = queriesResponse.data || []

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold mb-5'>Queries</h1>
      <div className="mt-5">
        {queries.length === 0 ? (
          <div className="p-3 border border-gray-300 bg-gray-100 text-sm">No queries found</div>
        )
        :
        (
          <div className="flex flex-col gap-4">
            {queries.map((query) => (
              <div key={query.id} className="border border-gray-300 p-3 rounded-lg">                  
                <h1 className="text-sm-font-semibold">{query.name} - {query.email}</h1>
                <p className="text-sm mt-5">{query.message}</p>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">
                    {dayjs(query.created_at).format('MM DD YYYY : hh:mm A')}
                  </span>
                </div>
              </div>

            ))}
          </div>
        )
      }
      </div>
    </div>
  )
}

export default QueriesPage
