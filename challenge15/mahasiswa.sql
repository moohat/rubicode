/*1. tampilkan seluruh data mahasiswa beserta nama jurusannya*/ 
SELECT nim, nama_mhs, alamat, nama_jurusan FROM mahasiswa,jurusan WHERE mahasiswa.id_jurusan = jurusan.id_jurusan;

/* 2.tampilkan mahasiswa yang memiliki umur dibawah 20 tahun */ 
SELECT * FROM mahasiswa WHERE umur < 20;

/* 3. tampilkan mahasiswa yang memiliki nilai 'B' ke atas */ 
SELECT nama_mhs, nilai FROM mahasiswa, kontrak WHERE mahasiswa.nim = kontrak.nim AND Nilai <= 'B';
/* opsional */
SELECT nama_mhs, nilai FROM mahasiswa, kontrak WHERE mahasiswa.nim = kontrak.nim AND Nilai <= 'B' GROUP BY nama_mhs;

/* 4. tampilkan mahasiswa yang memiliki jumlah SKS lebih dari 10*/ 
SELECT nama_mhs, sum(sks) AS jumlah FROM mahasiswa,kontrak,mata_kuliah WHERE mahasiswa.nim=kontrak.nim AND kontrak.id_matkul=mata_kuliah.id_matkul GROUP BY nama_mhs HAVING jumlah  > 10

/* 5. tampilkan mahasiswa yang mengontrak mata kuliah 'Data mining'*/ 
SELECT nama_mhs,nama_matkul FROM mahasiswa, kontrak, mata_kuliah WHERE mahasiswa.nim = kontrak.nim AND kontrak.id_matkul = mata_kuliah.id_matkul AND nama_matkul = 'Data mining';

/* 6. tampilkan jumlah mahasiswa untuk setiap dosen*/ 
SELECT nama_dosen, COUNT(DISTINCT(nama_mhs)) FROM  mahasiswa, dosen, kontrak WHERE  dosen.id_dosen = kontrak.id_dosen AND mahasiswa.nim = kontrak.nim GROUP BY nama_dosen;

/* 7. urutkan mahasiswa berdasarkan umurnya*/ 
SELECT nama_mhs, umur FROM mahasiswa ORDER BY umur;

/* 8. tampilkan kontrak matakuliah yang harus diulang (nilai D dan E), serta tampilkan data mahasiswa jurusan dan dosen secara lengkap. gunakan mode JOIN dan WHERE clause (solusi terdiri dari 2 syntax SQL)*/ 
/* WHERE CONDITION */
SELECT nama_mhs, nama_jurusan, nama_dosen, nama_matkul,nilai FROM mahasiswa,jurusan,dosen,mata_kuliah,kontrak WHERE mahasiswa.nim= kontrak.nim AND mahasiswa.id_jurusan = jurusan.id_jurusan AND dosen.id_dosen=kontrak.id_dosen AND mata_kuliah.id_matkul = kontrak.id_matkul AND kontrak.nilai >= 'D';
/* INNER JOIN */
SELECT nama_mhs, nama_jurusan, nama_dosen, nama_matkul,nilai FROM mahasiswa INNER JOIN jurusan,dosen, mata_kuliah, kontrak on mahasiswa.nim= kontrak.nim AND mahasiswa.id_jurusan = jurusan.id_jurusan AND dosen.id_dosen=kontrak.id_dosen AND mata_kuliah.id_matkul = kontrak.id_matkul AND kontrak.nilai >= 'D';