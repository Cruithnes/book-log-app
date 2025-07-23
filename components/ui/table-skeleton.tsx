import { Skeleton } from "@/components/ui/skeleton"

export function BookTableSkeleton({ rows = 10 }) {
  return (
    <div className="rounded-md border overflow-auto container mx-auto py-10">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-4 py-3">
          <Skeleton className="w-16 h-24 rounded-md" />

          <div className="text-right space-y-1 pr-2 border-r">
            <Skeleton className="h-4 w-32 ml-auto" />
            <Skeleton className="h-3 w-20 ml-auto" />
          </div>

          <Skeleton className="h-6 w-16 rounded-md ml-auto" />

          <Skeleton className="h-4 w-10 ml-auto" />

          <div className="text-right space-y-1 ml-auto">
            <Skeleton className="h-3 w-24 ml-auto" />
            <Skeleton className="h-3 w-20 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}
