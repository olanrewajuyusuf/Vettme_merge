import { Skeleton } from './ui/skeleton'

export function NotificationsSkeleton() {
  return (
        <div className='flex flex-col gap-5'>
            <div className="flex items-center space-x-4 bg-white p-4 rounded-xl">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
        <div className="flex items-center space-x-4 bg-white p-4 rounded-xl">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
        <div className="flex items-center space-x-4 bg-white p-4 rounded-xl">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
        <div className="flex items-center space-x-4 bg-white p-4 rounded-xl">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    </div>
  )
}

export function NotificationSkeleton() {
    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col gap-5 w-[50%]'>
                <div className="flex items-center space-x-4 bg-white p-5 rounded-xl">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                </div>
                <div className="bg-white p-5 h-80 rounded-xl flex flex-col gap-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    )
}

export function RecentSkeleton() {
    return (
        <div className='flex flex-col gap-5'>
            <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border-[1px] border-stroke-clr">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border-[1px] border-stroke-clr">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border-[1px] border-stroke-clr">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
      </div>
    )
}

export function CardSkeleton() {
    return (
        <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-6 w-10 mt-5" />
      </div>
    )
}

export function BackCardSkeleton() {
    return (
        <div className='grid grid-cols-4 gap-5 mb-6'>
            <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5 mx-auto" />
             </div>
             <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5 mx-auto" />
             </div>
             <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5 mx-auto" />
             </div>
             <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5 mx-auto" />
             </div>
             <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5" />
             </div>
             <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5" />
             </div>
             <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5" />
             </div>
             <div className='p-5 bg-white rounded-xl border-[1px] border-stroke-clr'>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-6 w-10 mt-5" />
             </div>
        </div>
    )
}

export function NavSkeleton() {
    return (
        <div className="w-full bg-white h-[70px] flex items-center justify-between px-[30px] border-b-[1px] border-stroke-clr">
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="w-40 h-7" />
            </div>
            <Skeleton className="w-40 h-7" />
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="w-36 h-7" />
                <Skeleton className="w-10 h-7" />
                <Skeleton className="w-10 h-10 rounded-full" />
            </div>
        </div>
    )
}

export function VerificationSkeleton() {
    return (
        <div className="w-full bg-white h-[70px] flex items-center justify-between px-[30px] border-b-[1px]">
            <Skeleton className="w-40 h-5" />
            <Skeleton className="w-40 h-5" />
            <Skeleton className="w-40 h-5" />
            <Skeleton className="w-40 h-5" />
        </div>
    )
}

export function PersonnelInfoSkeleton() {
    return (
        <div className="">
            <div className='flex justify-between items-center my-5'>
                <div>
                    <Skeleton className="w-64 h-5 bg-white" />
                    <Skeleton className="w-64 h-5 bg-white mt-2" />
                </div>
                <Skeleton className="w-20 h-12 bg-white" />
            </div>
            <div className='grid grid-cols-4 border-[1px] border-stroke-clr mb-5 rounded-lg bg-white'>
                <div className='border-r-[1px] border-stroke-clr p-5'>
                    <Skeleton className="w-40 h-5" />
                    <Skeleton className="w-20 h-5 mt-2" />
                </div>
                <div className='border-r-[1px] border-stroke-clr p-5'>
                    <Skeleton className="w-40 h-5" />
                    <Skeleton className="w-20 h-5 mt-2" />
                </div>
                <div className='border-r-[1px] border-stroke-clr p-5'>
                    <Skeleton className="w-40 h-5" />
                    <Skeleton className="w-20 h-5 mt-2" />
                </div>
                <div className=' p-5'>
                    <Skeleton className="w-40 h-5" />
                    <Skeleton className="w-20 h-5 mt-2" />
                </div>
            </div>

            <div className='border-[1px] border-stroke-clr p-5 mb-5 rounded-lg bg-white'>
                <Skeleton className="w-40 h-5" />
            </div>
            <div className='border-[1px] border-stroke-clr p-5 mb-5 rounded-lg bg-white'>
                <Skeleton className="w-40 h-5" />
            </div>
            <div className='border-[1px] border-stroke-clr p-5 mb-5 rounded-lg bg-white'>
                <Skeleton className="w-40 h-5" />
            </div>
            
        </div>
    )
}

export function EditInfoSkeleton() {
    return (
        <div className="">
            <Skeleton className="w-96 h-7 bg-white my-5" />

            <div className='border-[1px] border-stroke-clr p-5 mb-5 rounded-lg bg-white'>
                <Skeleton className="w-40 h-5" />
            </div>
            <div className='border-[1px] border-stroke-clr p-5 mb-5 rounded-lg bg-white'>
                <Skeleton className="w-40 h-5" />
            </div>
            <div className='border-[1px] border-stroke-clr p-5 mb-5 rounded-lg bg-white'>
                <Skeleton className="w-40 h-5" />
            </div>
            <div className='border-[1px] border-stroke-clr p-5 mb-5 rounded-lg bg-white'>
                <Skeleton className="w-40 h-5" />
            </div>

            <Skeleton className="w-40 h-14 bg-white" />
            
        </div>
    )
}