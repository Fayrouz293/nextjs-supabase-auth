"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function BarangPage() {
  const supabase = createClientComponentClient();
  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");

  const tambahBarang = async () => {
    const { data, error } = await supabase.from("barang").insert([
      { nama: nama, stok: stok }
    ]);
    if (error) {
      alert("Gagal: " + error.message);
    } else {
      alert("Berhasil tambah barang!");
      setNama("");
      setStok("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Tambah Barang</h1>
      <input placeholder="Nama barang" value={nama} onChange={(e) => setNama(e.target.value)} />
      <br /><br />
      <input placeholder="Stok" type="number" value={stok} onChange={(e) => setStok(e.target.value)} />
      <br /><br />
      <button onClick={tambahBarang}>Simpan</button>
    </div>
  );
}