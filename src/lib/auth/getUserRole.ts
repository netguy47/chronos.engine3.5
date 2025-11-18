import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type UserRole = 'admin' | 'user' | 'guest';

export async function getUserRole(): Promise<UserRole> {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return 'guest';
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error || !profile) {
      console.error('Error fetching user role:', error?.message);
      return 'user'; // Default role if profile not found
    }

    // Validate the role against allowed values
    const validRoles: UserRole[] = ['admin', 'user'];
    return validRoles.includes(profile.role as UserRole) 
      ? profile.role as UserRole 
      : 'user';
      
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return 'guest';
  }
}
