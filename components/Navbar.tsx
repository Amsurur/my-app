"use client"
import Link from 'next/link'
import {  usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const  router = useRouter()
  const pathname = usePathname()

        const handleChangeLang =(lang:string)=>{
        router.push(`${lang}`)
        }

  return (
    <div className='flex gap-10 p-5'>
      <select value={pathname.slice(1,3)} onChange={(e)=>handleChangeLang(e.target.value)} name="" id="">
        <option value="en">En</option>
        <option value="ru">Ru</option>
      </select>
        <Link className=' border-dashed border p-2 rounded-xl' href={"/"}>Home</Link>

        <Link className=' border-dashed border p-2 rounded-xl' href={"/about"}>About</Link>
        <Link className=' border-dashed border p-2 rounded-xl' href={"/contact"}>Contact</Link>
        <Link className=' border-dashed border p-2 rounded-xl' href={"/login"}>Login</Link>
    </div>
  )
}

export default Navbar