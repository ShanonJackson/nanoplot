'use client'

import React, { useState } from 'react'
import { useSandpack } from '@codesandbox/sandpack-react'

export function CopyButton() {
  const [copied, setCopied] = useState(false)
  const { sandpack } = useSandpack()

  const handleCopy = async () => {
    try {
      // Get the active file content from Sandpack
      const activeFile = sandpack.activeFile
      const fileContent = sandpack.files[activeFile]?.code || ''
      
      if (fileContent) {
        await navigator.clipboard.writeText(fileContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      title="Copy code"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {copied ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        ) : (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </>
        )}
      </svg>
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}
