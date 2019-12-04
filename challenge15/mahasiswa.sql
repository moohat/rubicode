/*1.*/ 
SELECT nim, nama_mhs, alamat, nama_jurusan FROM mahasiswa,jurusan WHERE mahasiswa.id_jurusan = jurusan.id_jurusan;

/* 2. */ 
SELECT * FROM mahasiswa WHERE umur < 20;

/* 3. */ 
SELECT nama_mhs, nilai FROM mahasiswa, kontrak WHERE mahasiswa.nim = kontrak.nim AND Nilai <= 'B';

/* 4. */ 
SELECT nama_mhs, sum(sks) as jumlah FROM mahasiswa,kontrak,mata_kuliah WHERE mahasiswa.nim=kontrak.nim AND kontrak.id_matkul=mata_kuliah.id_matkul GROUP BY nama_mhs HAVING jumlah  > 10

/* 5. */ 
SELECT nama_mhs,nama_matkul FROM mahasiswa, kontrak, mata_kuliah WHERE mahasiswa.nim = kontrak.nim AND kontrak.id_matkul = mata_kuliah.id_matkul AND nama_matkul = 'Data mining';

/* 6. */ 
SELECT nama_dosen, count(nama_mhs) FROM dosen, mahasiswa, kontrak WHERE dosen.id_dosen = kontrak.id_dosen AND mahasiswa.nim = kontrak.nim GROUP BY nama_dosen;


/* 7. */ 
SELECT nama_mhs, umur FROM mahasiswa ORDER BY umur ASC;

/* 8. */ 
/* WHERE CONDITION */
SELECT nama_mhs, nama_jurusan, nama_dosen, nama_matkul,nilai FROM mahasiswa,jurusan,dosen,mata_kuliah,kontrak WHERE mahasiswa.nim= kontrak.nim AND mahasiswa.id_jurusan = jurusan.id_jurusan AND dosen.id_dosen=kontrak.id_dosen AND mata_kuliah.id_matkul = kontrak.id_matkul AND kontrak.nilai >= 'D';
/* INNER JOIN */
SELECT nama_mhs, nama_jurusan, nama_dosen, nama_matkul,nilai FROM mahasiswa INNER JOIN jurusan,dosen, mata_kuliah, kontrak on mahasiswa.nim= kontrak.nim AND mahasiswa.id_jurusan = jurusan.id_jurusan AND dosen.id_dosen=kontrak.id_dosen AND mata_kuliah.id_matkul = kontrak.id_matkul AND kontrak.nilai >= 'D';