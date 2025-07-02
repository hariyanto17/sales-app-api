# Machine Learning Research

## env
    //digunakan untuk terkoneksi ke mongodb database
    MONGO_DATABASE_URL="mongodb://localhost:27017/test"
    MONGO_DATABASE=test
    //digunakan untuk terkoneksi ke mongodb postgreSQL
    POSTGRE_USER=postgres
    POSTGRE_HOST=127.0.0.1
    POSTGRE_DATABASE=ppa
    POSTGRE_PASSWORD=
    POSTGRE_PORT=5432

    // variabel untuk update data dari livelocation, SYNCHRONIZE akan menganti data livelocation setiap 15 menit
    SYNCHRONIZE=15

## kebutuhan data
    untuk menjalankan project ini di butuhkan beberapa data dari database mongoDB dan postgreSQL

- Collection yang di butuhkan dari mongoDB
    - live_location di butuhkan untuk mengambil data Houler(HD) secara realtime
    - production di butuhkan untuk mengambil data loadingTime Houler(HD)
    
- Tabel yang di butuhkan dari postgreSQL
    - equipment
    - map_area
    - map_poin
    - setting_fleet_hauler
    - setting_fleet_loader

## fungsion untuk postgres
### code bisa di ambil di folder src/postgres
- calculate_and_insert_travel_directions
- insert_travel_direction

## logika di belakang layar
- setiap 15 menit database livelocation di postgreSQL akan di bersihkan dan di isi data baru dari lielocation mongodb
- menghitung traveltime dari data livelocation dan di simpan ke dalam tabel travel_direction, tabel travel_direction hanya akan menyimpan 20 baru record setiap line
- mengambil nilai rata rata data dan memasukkanya ke dalam map_line_noded
-saat ini fungsi pgr djistra suda bisa di jalankan

## documentsi lengkap bisa di baca di notion 

baca selengkapnya di [Notion](https://www.notion.so/agusekaprs/Project-Management-6ef649573bdc4622a6f8c4950fbe53a0?p=8c209826b7b242de995824a16ac1290c&pm=s).