type f_kota = {
  nama: string;
  gambar: string;
  wisata: {
    [key: string]: { deskripsi: string; gambar: string[]; nama: string };
  };
};

type f_kota__wisata = {
  id?: string;
  deskripsi: string;
  gambar: string[];
  nama: string;
};

type f_pengguna = {
  alamat: string;
  nama: string;
  nama_pengguna: string;
  no_hp: string;
};

type f_user_upload = {
  file_id: string;
  kota_id: string;
  like: number;
  wisata_id: string;
  waktu_unggah: string;
};
