import React from 'react'

interface PreviewTabProps {
  children: React.ReactNode
}

export function PreviewTab({ children }: PreviewTabProps) {
  return (
    <div className="p-6 bg-white">
      <div className="flex items-center justify-center min-h-[200px]">
        {children}
      </div>
    </div>
  )
}
