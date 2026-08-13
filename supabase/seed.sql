insert into public.jobs (
  title, company_name, company_description, location, category, work_type, work_mode,
  short_description, description, requirements, responsibilities, salary_min, salary_max,
  salary_display, salary_period, application_method, application_whatsapp, is_active, is_featured
) values (
  'Barista Part-Time', 'Kopi Nusantara', 'Kedai kopi lokal dengan biji pilihan dari berbagai daerah Indonesia.',
  'Jakarta Selatan', 'Food & Beverage', 'Part-Time', 'On-site',
  'Bergabung dengan tim hangat kami dan ciptakan pengalaman ngopi terbaik untuk setiap pelanggan.',
  'Kami mencari barista part-time yang ramah, cekatan, dan antusias mempelajari dunia kopi.',
  array['Minimal SMA/SMK atau sederajat', 'Bersedia bekerja dengan sistem shift', 'Komunikatif dan ramah'],
  array['Menyiapkan minuman sesuai standar resep', 'Menjaga kebersihan area bar', 'Melayani pelanggan'],
  28000, 38000, 'Rp28.000 – Rp38.000 / jam', 'jam', 'whatsapp', '6281212345678', true, true
);

insert into public.jobs (
  title, company_name, company_description, location, category, work_type, work_mode,
  short_description, description, requirements, responsibilities, salary_min, salary_max,
  salary_display, salary_period, application_method, application_email, is_active, is_urgent
) values (
  'Crew Store Part-Time', 'Daily Mart', 'Jaringan convenience store modern dengan lingkungan kerja suportif.',
  'Bandung', 'Retail', 'Part-Time', 'On-site',
  'Bantu pelanggan menemukan kebutuhan harian mereka dalam lingkungan toko yang modern dan dinamis.',
  'Daily Mart membuka kesempatan bagi mahasiswa dan lulusan baru untuk mendapat pengalaman retail.',
  array['Usia 18–25 tahun', 'Teliti, jujur, dan bertanggung jawab', 'Dapat bekerja minimal 4 jam per hari'],
  array['Melayani transaksi pelanggan', 'Menata produk', 'Membantu pengecekan stok'],
  25000, 30000, 'Rp25.000 – Rp30.000 / jam', 'jam', 'email', 'karier@dailymart.id', true, true
);

insert into public.jobs (
  title, company_name, company_description, location, category, work_type, work_mode,
  short_description, description, requirements, responsibilities, salary_display, salary_period,
  application_method, application_url, is_active, is_featured
) values (
  'Social Media Assistant', 'Kreativa Studio', 'Studio kreatif independen yang membantu brand lokal tumbuh.',
  'Remote', 'Creative & Marketing', 'Freelance', 'Remote',
  'Ubah ide menjadi konten yang menarik untuk brand lokal bersama tim kreatif dari mana saja.',
  'Posisi freelance untuk kamu yang aktif mengikuti tren media sosial dan nyaman menulis copy pendek.',
  array['Memahami Instagram dan TikTok', 'Mampu menggunakan Canva', 'Portofolio menjadi nilai tambah'],
  array['Membuat kalender konten', 'Menulis caption', 'Memantau insight dasar'],
  'Rp2.500.000 / proyek', 'proyek', 'url', 'https://example.com/apply', true, true
);

insert into public.jobs (
  title, company_name, company_description, location, category, work_type, work_mode,
  short_description, description, requirements, responsibilities, salary_min, salary_max,
  salary_display, salary_period, application_method, application_whatsapp, is_active
) values (
  'Kasir Part-Time', 'Fresh Market', 'Pasar swalayan keluarga dengan produk segar berkualitas.',
  'Surabaya', 'Retail', 'Part-Time', 'On-site',
  'Jadilah wajah ramah Fresh Market dan bantu pelanggan menyelesaikan belanja dengan mudah.',
  'Kami membutuhkan kasir part-time untuk shift sore dan akhir pekan di cabang Darmo.',
  array['Minimal SMA/SMK', 'Mampu berhitung dengan baik', 'Siap bekerja akhir pekan'],
  array['Memproses transaksi', 'Menjaga area kasir', 'Membuat rekap kas'],
  24000, 29000, 'Rp24.000 – Rp29.000 / jam', 'jam', 'whatsapp', '6282234567890', true
);

insert into public.jobs (
  title, company_name, company_description, location, category, work_type, work_mode,
  short_description, description, requirements, responsibilities, salary_display, salary_period,
  application_method, application_email, is_active, is_urgent
) values (
  'Event Crew', 'Eventku Indonesia', 'Event organizer untuk konser, pameran, dan aktivasi brand.',
  'Jakarta', 'Event', 'Temporary', 'On-site',
  'Terlibat langsung di balik layar acara seru dan bangun pengalaman profesionalmu.',
  'Kesempatan kerja harian untuk mendukung persiapan dan operasional acara selama tiga hari.',
  array['Berusia minimal 18 tahun', 'Sehat jasmani', 'Tepat waktu'],
  array['Membantu registrasi', 'Mengarahkan pengunjung', 'Mendukung setup ringan'],
  'Rp350.000 / hari', 'hari', 'email', 'crew@eventku.id', true, true
);

insert into public.jobs (
  title, company_name, company_description, location, category, work_type, work_mode,
  short_description, description, requirements, responsibilities, salary_display, salary_period,
  application_method, application_url, is_active
) values (
  'People Operations Intern', 'Tumbuh Bersama', 'Startup edutech yang membantu talenta muda menyiapkan karier.',
  'Yogyakarta', 'Human Resources', 'Internship', 'Hybrid',
  'Pelajari people operations di startup bertumbuh dengan pendampingan langsung dari mentor.',
  'Program magang berbayar selama tiga bulan dengan jadwal hybrid yang fleksibel.',
  array['Mahasiswa aktif semester 5 ke atas', 'Rapi dalam administrasi', 'Tertarik pada HR'],
  array['Mendukung administrasi rekrutmen', 'Menjadwalkan wawancara', 'Merapikan database'],
  'Rp1.800.000 / bulan', 'bulan', 'url', 'https://example.com/internship', false
);
