'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [displayText, setDisplayText] = useState('')
  const [assignments, setAssignments] = useState([{ course: '', name: '', deadline: '', hours: '' }])
  const fullText = 'How Cooked Are You?'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const addAssignment = () => {
    setAssignments([...assignments, { course: '', name: '', deadline: '', hours: '' }])
  }

  const deleteAssignment = (index: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-8">
      <h1 className="text-6xl font-bold text-white mb-12">
        {displayText}
        <span className="animate-pulse">|</span>
      </h1>
      
      <div className="w-full max-w-4xl">
        <div className={assignments.length > 3 ? "max-h-80 overflow-y-auto" : ""}>
          {assignments.map((assignment, index) => (
            <div key={index} className="flex gap-4 mb-4 items-center">
              <input
                type="text"
                placeholder="UBC Course"
                className="flex-1 p-3 rounded bg-gray-800 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="Assignment Name"
                className="flex-1 p-3 rounded bg-gray-800 text-white border border-gray-600"
              />
              <input
                type="date"
                placeholder="Deadline"
                className="flex-1 p-3 rounded bg-gray-800 text-white border border-gray-600"
              />
              <input
                type="number"
                placeholder="Commitment (hr/day)"
                className="flex-1 p-3 rounded bg-gray-800 text-white border border-gray-600"
              />
              {assignments.length > 1 && (
                <button
                  onClick={() => deleteAssignment(index)}
                  className="w-8 h-8 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addAssignment}
          className="mt-4 w-10 h-10 bg-blue-600 text-white rounded-full text-xl hover:bg-blue-700 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}