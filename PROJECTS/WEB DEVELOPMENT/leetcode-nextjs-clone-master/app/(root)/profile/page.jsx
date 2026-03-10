import { SubmissionHistory } from '@/modules/problems/components/submission-history';
import { getCurrentUserData } from '@/modules/profile/actions'
import PlaylistsSection from '@/modules/profile/components/playlist-section';
import ProfileStats from '@/modules/profile/components/profile-stats';
import SolvedProblems from '@/modules/profile/components/solved-problems';
import UserInfoCard from '@/modules/profile/components/user-info';
import { redirect } from 'next/navigation';
import React from 'react'


export const dynamic = 'force-dynamic';

const ProfilePage = async() => {
    const profileData = await getCurrentUserData();

    if(!profileData) {
      return redirect('/');
    }

 
  return (
    <div className='h-full py-32'>
        <div className='container mx-auto px-4 max-w-7xl'>
            <UserInfoCard userData={profileData}/>
            <ProfileStats
                submissions={profileData.submissions}
                solvedCount={profileData.solvedProblems.length}
                playlistCount={profileData.playlists.length}
            />

            <SubmissionHistory submissions={profileData.submissions} />

            <div className='grid gap-8 mt-10'>
                  <SolvedProblems solvedProblems={profileData.solvedProblems} />
          <PlaylistsSection playlists={profileData.playlists} />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage