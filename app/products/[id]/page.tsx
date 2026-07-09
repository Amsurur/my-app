import React from 'react'
interface IParams{
    id:string
}
const  Page = async  ({params}:IParams) => {
    const {id} = await params
  return (
    <div>{id.map((e)=>e+1)}</div>
  )
}

export default Page