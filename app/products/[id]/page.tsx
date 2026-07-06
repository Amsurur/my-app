import React from 'react'
interface IParams{
    id:string
}
const  Page = async  ({params}:IParams) => {
    const {id} = await params
  return (
    <div>{id}</div>
  )
}

export default Page