import { useState, useEffect } from 'react';

export type UserRole = 'admin' | 'user' | null;

export function useUserRole(userId: string | undefined) {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setRole(null);
      setLoading(false);
      return;
    }


  }, [userId]);

  return { role, loading, isAdmin: role === 'admin' };
}