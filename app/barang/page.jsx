"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function BarangPage() {
  const supabase = createClientComponentClient();
  const [barang, setBarang] = useState([]);
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");

  useEffect(() => {
    fetchBarang();
  }, []);

  async function fetchBarang() {
    const { data } = await supabase.from("barang").select("*").order("id");
    setBarang(data || []);
  }

  async function tambahBarang() {
    await supabase.from("barang").insert({
      nama_barang: nama,
      jumlah: Number(jumlah),
    });
    setNama("");
    setJumlah("");
    fetchBarang();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Data Barang</h1>

      <input
        placeholder="Nama Barang"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <br />
      <input
        placeholder="Jumlah"
        type="number"
        value={jumlah}
        onChange={(e) => setJumlah(e.target.value)}
      />
      <br />
      <button onClick={tambahBarang}>Tambah</button>

      <ul>
        {barang.map((b) => (
          <li key={b.id}>
            {b.nama_barang} - {b.jumlah}
          </li>
        ))}
      </ul>
    </div>
  );
}