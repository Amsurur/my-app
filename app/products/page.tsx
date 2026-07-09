import React from 'react'

const page = async () => {
  await new Promise((r) => setTimeout(r, 2000))
  return (
    <div>page</div>
  )
}

export default page