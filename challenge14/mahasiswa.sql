PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE dosen(
id_dosen varchar(5) not null,
nama_dosen varchar(30) not null,
primary key (id_dosen));
INSERT INTO dosen VALUES('D001','Mei Lestari, M.Kom.');
INSERT INTO dosen VALUES('D002','DRA. ZEINYTA AZRA HAROEN, MM');
INSERT INTO dosen VALUES('D003','DR. SOEPARLAN KASYADI, MM');
INSERT INTO dosen VALUES('D004','Birul Walidain, M.KOM.');
CREATE TABLE jurusan(
id_jurusan varchar(5) not null,
nama_jurusan varchar(30) not null,
primary key (id_jurusan));
INSERT INTO jurusan VALUES('J001','Teknik Informatika');
INSERT INTO jurusan VALUES('J002','Desain Komunikasi Visual');
INSERT INTO jurusan VALUES('J003','Teknik Kecerdasan buatan');
CREATE TABLE mata_kuliah(
id_matkul varchar(10)
, nama_matkul varchar(20),
sks int(1),
primary key (id_matkul));
INSERT INTO mata_kuliah VALUES('M001','Algoritma 1',3);
INSERT INTO mata_kuliah VALUES('M002','Matematika Diskrit',4);
INSERT INTO mata_kuliah VALUES('M003','Bahasa Inggris',2);
INSERT INTO mata_kuliah VALUES('M004','Data mining',4);
CREATE TABLE mahasiswa(
nim varchar(15)not null,
nama_mhs varchar(30) not null,
alamat varchar(50)not null,
id_jurusan varchar(5) not null,
umur int(3),
primary key(nim),
foreign key(id_jurusan) references jurusan(id_jurusan));
INSERT INTO mahasiswa VALUES('201943500001','Faisal Assegaf','Bogor','J001',22);
INSERT INTO mahasiswa VALUES('201943500002','Fadil Mubarok','Jakarta','J003',21);
INSERT INTO mahasiswa VALUES('201943500003','Asep Sumaryat','Sumedang','J002',19);
CREATE TABLE kontrak(
nim varchar(15),
id_dosen varchar(5),
id_matkul varchar(10),
nilai char(1),
primary key(nim,id_dosen,id_matkul),
foreign key(nim) references mahasiswa(nim),
foreign key(id_dosen) references dosen(id_dosen),
foreign key(id_matkul) references mata_kuliah(id_matkul));
INSERT INTO kontrak VALUES('201943500001','D001','M001','C');
INSERT INTO kontrak VALUES('201943500002','D001','M001','B');
INSERT INTO kontrak VALUES('201943500001','D002','M002','A');
INSERT INTO kontrak VALUES('201943500001','D003','M003','B');
INSERT INTO kontrak VALUES('201943500001','D004','M004','E');
INSERT INTO kontrak VALUES('201943500003','D004','M004','E');
INSERT INTO kontrak VALUES('201943500002','D004','M004','D');
COMMIT;
