// components/profile-picture.tsx (Client Component)
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export function ProfilePicture() {
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const supabase = createClient();
        
        // Get current user
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          setUser(authUser);
          
          // Fetch profile picture
          const { data: playerData } = await supabase
            .from('player')
            .select('profile_picture')
            .eq('id', authUser.id)
            .single();
          
          setProfilePicture(playerData?.profile_picture || null);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProfile();
  }, []);

  if (loading || !user) {
    return null;
  }

  return (
    <Link
      href="/protected"
      className="hidden md:block flex-shrink-0"
    >
      <div className="w-8 h-8 rounded-full bg-[#861F41] border-2 border-white hover:border-[#861F41] hover:bg-white transition-colors duration-200 flex items-center justify-center group overflow-hidden">
        {profilePicture ? (
          <img 
            src={profilePicture} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <svg 
            className="w-5 h-5 text-white group-hover:text-[#861F41] transition-colors duration-200" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </Link>
  );
}