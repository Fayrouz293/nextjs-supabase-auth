import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ✅ Kalau belum login → ke sign-in
  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="card">
      <h2>User Profile</h2>
      <code className="highlight">{user.email}</code>

      <div className="heading">Terakhir Login:</div>
      <code className="highlight">{new Date(user.last_sign_in_at).toUTCString()}</code>

      {/* ✅ Tombol ke halaman Barang */}
      <Link className="button" href="/barang">
        Lihat Barang
      </Link>

      <SignOut />
    </div>
  );
}