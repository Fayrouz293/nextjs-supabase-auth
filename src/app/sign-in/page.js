import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignIn from 'src/components/Auth/SignIn';

export default async function SignInPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  // ✅ Kalau user sudah login → langsung ke barang
  if (data?.session) {
    redirect('/barang');
  }

  return <SignIn />;
}