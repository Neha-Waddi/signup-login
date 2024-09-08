import Login from '@/components/login'
import React from 'react'
import RegisterForm from '@/components/register'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';


export default async function page() {
  const session=await getServerSession(authOptions);

  if(session) redirect("/userdetails");
  return (
    <main>
      <Login/>
    </main>
  )
}
