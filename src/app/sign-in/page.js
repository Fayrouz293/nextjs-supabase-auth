import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignIn from 'src/components/Auth/SignIn';

export default async function SignInPage() {
  const supabase = createServerComponentClient({ cookies });

  // Ambil session user
  const { data } = await supabase.auth.getSession();

  // Kalau sudah login → langsung ke halaman barang
  if (data?.session) {
    redirect('/barang');
  }

  // Kalau belum login → tampilkan form login
  return <SignIn />;
}