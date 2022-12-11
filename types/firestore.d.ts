type f_kota = {
  nama: string;
  gambar: string;
  wisata: {
    [key: string]: { deskripsi: string; gambar: string[]; nama: string };
  };
};
