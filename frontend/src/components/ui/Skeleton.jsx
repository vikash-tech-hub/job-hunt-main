import React from "react";
import { cn } from "@/lib/utils";

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200/80", className)}
      {...props}
    />
  );
};

export const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-xl" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-18 rounded-lg" />
      </div>
    </div>
  );
};

export const TableRowSkeleton = ({ cols = 4 }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-100 animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-24 rounded" />
      ))}
    </div>
  );
};

export default Skeleton;
