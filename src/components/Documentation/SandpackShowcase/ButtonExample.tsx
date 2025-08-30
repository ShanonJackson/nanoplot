import React from 'react'

export function ButtonExample() {
  return (
    <div className="flex gap-4">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Default
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors">
        Secondary
      </button>
      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
        Outline
      </button>
    </div>
  )
}
