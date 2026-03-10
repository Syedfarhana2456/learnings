import { db } from '@/lib/db';
import { getAllProblems } from '@/modules/problems/actions';
import ProblemsTable from '@/modules/problems/components/problem-table';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const ProblemsPage = async() => {
    const user = await currentUser()

    let dbUser = null;

    if(user){
         dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true, role: true }
    });
    }

    const {data:problems , error} = await getAllProblems()

      if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">Error loading problems: {error}</p>
      </div>
    );
  }


  return (
    <div className='container mx-auto py-32'>
        <ProblemsTable problems={problems} user={dbUser}/>
    </div>
  )
}

export default ProblemsPage