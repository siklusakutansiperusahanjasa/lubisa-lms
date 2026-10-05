import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';

// --- DATA DUMMY GLOBAL ---
const initialCourses = [
  { 
    id: 1, 
    category: "AKUNTANSI", 
    title: "E-Modul Siklus Akuntansi Perusahaan Dagang", 
    instructor: "Rei, S.E., M.Ak.", 
    rating: "4.9", 
    reviews: 128, 
    lessons: 24, 
    duration: "04:30:00", 
    oldPrice: "Rp250.000", 
    newPrice: "Rp50.000", 
    priceValue: 50000, 
    color: "from-indigo-500 to-violet-600", 
    icon: "📊", 
    status: "Published", 
    students: 128,
    description: "Dalam matakuliah ini Anda akan belajar tentang siklus akuntansi perusahaan dagang secara komprehensif. Dimulai dari analisis dokumen sumber, pencatatan transaksi ke dalam jurnal khusus, hingga penyusunan laporan keuangan akhir periode dengan pendekatan interaktif.",
    learningPoints: "Identifikasi karakteristik perusahaan dagang\nPencatatan 4 Jurnal Khusus\nPosting ke Buku Besar Utama & Pembantu\nPenyusunan Laporan Laba/Rugi & Neraca",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    sections: [
      {
        id: 'sec-init-1',
        title: 'Pengenalan Ruang Lingkup Materi',
        lessons: [
          { id: 'les-init-1', title: 'Tujuan Pembelajaran dan Lingkup Materi', type: 'youtube', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: '▶️', color: 'text-rose-500' },
          { id: 'les-init-2', title: 'Konsep Dasar Perusahaan Dagang', type: 'youtube', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: '▶️', color: 'text-rose-500' },
          { id: 'les-init-3', title: 'Identifikasi Dokumen Sumber', type: 'youtube', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: '▶️', color: 'text-rose-500' }
        ]
      },
      {
        id: 'sec-init-2',
        title: 'Pencatatan Jurnal Khusus',
        lessons: [
          { id: 'les-init-4', title: 'Jurnal Penjualan & Penerimaan Kas', type: 'youtube', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: '▶️', color: 'text-rose-500' },
          { id: 'les-init-5', title: 'Modul PDF: Format Neraca Lajur', type: 'pdf', fileName: 'Neraca_Lajur.pdf', icon: '📄', color: 'text-indigo-500' }
        ]
      }
    ]
  },
  { 
    id: 2, 
    category: "MANAJEMEN", 
    title: "Teori Pengambilan Keputusan: Dari Analisis ke Tindakan", 
    instructor: "Dr. Indra Fahrizal, MBA", 
    rating: "5.0", 
    reviews: 84, 
    lessons: 17, 
    duration: "01:00:38", 
    oldPrice: "Rp150.000", 
    newPrice: "Rp25.000", 
    priceValue: 25000, 
    color: "from-rose-400 to-orange-500", 
    icon: "💡", 
    status: "In Review", 
    students: 0,
    description: "Membahas kerangka kerja strategis dalam pengambilan keputusan bisnis berbasis data dan manajemen risiko terukur.",
    learningPoints: "Model Pengambilan Keputusan Rasional\nAnalisis SWOT & Matrix Keputusan\nMitigasi Risiko Strategis",
    trailerUrl: "",
    sections: []
  },
  { 
    id: 3, 
    category: "LOGISTIK", 
    title: "Manajemen Rantai Pasok Modern (Supply Chain)", 
    instructor: "Tim Lentera", 
    rating: "4.8", 
    reviews: 210, 
    lessons: 32, 
    duration: "06:15:00", 
    oldPrice: "Rp300.000", 
    newPrice: "Rp99.000", 
    priceValue: 99000, 
    color: "from-emerald-400 to-teal-500", 
    icon: "📦", 
    status: "Published", 
    students: 210,
    description: "Pendalaman tata kelola supply chain dari pengadaan bahan baku, integrasi logistik, hingga distribusi last-mile ke konsumen.",
    learningPoints: "Pengadaan & Inventory Control\nManajemen Pergudangan Modern\nOptimasi Distribusi & Fleet",
    trailerUrl: "",
    sections: []
  }
];

const initialUsers = [
  { id: 1, name: "Ahmad Budi", email: "ahmad@kampus.ac.id", role: "siswa", joinDate: "07 Sep 2026", status: "Active" },
  { id: 2, name: "Siti Nurhaliza", email: "siti@kampus.ac.id", role: "siswa", joinDate: "06 Sep 2026", status: "Active" },
  { id: 3, name: "Dr. Indra Fahrizal", email: "indra@lubisa.id", role: "instruktur", joinDate: "12 Agu 2026", status: "Active" },
  { id: 4, name: "Admin Utama", email: "adminbelajarai.zakki@gmail.com", role: "admin", joinDate: "01 Jan 2026", status: "Active" },
  { id: 5, name: "Budi Santoso", email: "budi.s@kampus.ac.id", role: "siswa", joinDate: "07 Sep 2026", status: "Pending" },
  { id: 6, name: "Dra. Rina Melati", email: "rina@lubisa.id", role: "instruktur", joinDate: "07 Sep 2026", status: "Pending" }
];

const initialEbooks = [
  { id: 1, title: "Panduan Praktis Akuntansi Dasar", category: "Akuntansi", price: "Rp35.000" },
  { id: 2, title: "Manajemen Resiko Logistik", category: "Logistik", price: "Rp45.000" }
];

const initialTicketsAdmin = [
  { id: 1, user: "Ahmad Budi", subject: "Video Modul 2 tidak bisa diputar", priority: "Tinggi", status: "Open" },
  { id: 2, user: "Siti Nurhaliza", subject: "Salah penulisan nama di sertifikat", priority: "Sedang", status: "Closed" }
];

const initialBlogs = [
  { id: 1, title: "Pentingnya Pembelajaran Konstruktivis di Era AI", author: "Rei, S.E., M.Ak.", date: "05 Sep 2026", category: "Edukasi", status: "Published", excerpt: "Membahas bagaimana teknologi AI dapat berkolaborasi dengan pedagogi konstruktivis untuk menciptakan interaksi belajar yang tidak membosankan..." },
  { id: 2, title: "Tren Manajemen Rantai Pasok Modern 2027", author: "Tim Lentera", date: "01 Sep 2026", category: "Logistik", status: "Published", excerpt: "Prediksi dan pemetaan tren terbaru dalam dunia logistik, e-commerce, dan otomatisasi supply chain secara global..." }
];

const initialSettings = {
  platformName: "LuBisa.id",
  heroTitle: "Aplikasi Belajar Kuliah No 1 di Indonesia",
  seoDesc: "Akses video dari dosen universitas top, sambil melihat pembahasan dan rangkuman soal, disertai AI untuk membantumu meraih IPK idaman.",
  primaryColor: "#9333EA",
  fontSize: "16px",
  logoUrl: "",
  heroBanner: "",
  adBannerUrl: "",
  adLink: ""
};

const initialInstructorProfile = {
  name: "Rei, S.E., M.Ak.",
  title: "Ketua Peneliti Lentera Mondial",
  bio: "Berpengalaman dalam pengembangan sistem informasi akuntansi dan E-Learning Management System (LMS).",
  avatar: ""
};

// --- KOMPONEN PUBLIK (NAVBAR & FOOTER) ---
const Navbar = ({ settings }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isHome ? 'bg-[#090D16]/90 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-[#090D16] border-b border-white/10'} text-white`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-3 transition-transform hover:scale-105">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="w-9 h-9 object-contain rounded-xl" />
            ) : (
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-sm shadow-lg shadow-purple-500/50 animate-pulse">⚡</span>
            )}
            {settings?.platformName || "LuBisa.id"}
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-300">
            <Link to="/" className="hover:text-purple-400 transition-colors">Kelas</Link>
            <Link to="/katalog" className="hover:text-purple-400 transition-colors">Try Out</Link>
            <Link to="/artikel" className="hover:text-purple-400 transition-colors">Perpustakaan</Link>
            <Link to="/dasbor" className="hover:text-purple-400 transition-colors">Ruang Belajar</Link>
          </nav>
        </div>
        <div className="flex space-x-4 items-center">
          <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white hidden md:block transition-colors">Masuk</Link>
          <Link to="/login" className="text-sm font-bold px-6 py-2.5 rounded-full text-white shadow-[0_8px_20px_rgba(147,51,234,0.3)] transition-all hover:-translate-y-1 hover:shadow-purple-500/50" style={{ background: 'linear-gradient(135deg, #9333EA 0%, #4F46E5 100%)' }}>Coba Gratis</Link>
        </div>
      </div>
    </header>
  );
};

const Footer = ({ settings }) => (
  <footer className="bg-[#060911] text-slate-400 py-20 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-2 space-y-4">
        <Link to="/" className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
          {settings?.logoUrl ? (
            <img src={settings.logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
          ) : (
            <span className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-xs">⚡</span>
          )}
          {settings?.platformName || "LuBisa.id"}
        </Link>
        <p className="text-sm leading-relaxed max-w-sm text-slate-400">Platform E-Modul & Pembelajaran Digital berstandar tinggi. Membantu meraih prestasi akademik terbaik melalui pendekatan interaktif.</p>
        <p className="text-xs font-bold tracking-widest uppercase opacity-40">© 2026 {settings?.platformName || "LuBisa.id"} Academy. All rights reserved.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 tracking-wide text-sm">Navigasi</h4>
        <ul className="space-y-3 text-sm font-medium">
          <li><Link to="/katalog" className="hover:text-purple-400 transition-colors">Katalog Modul</Link></li>
          <li><Link to="/artikel" className="hover:text-purple-400 transition-colors">Perpustakaan Artikel</Link></li>
          <li><Link to="/login" className="hover:text-purple-400 transition-colors">Portal Admin</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 tracking-wide text-sm">Dukungan</h4>
        <ul className="space-y-3 text-sm font-medium">
          <li><Link to="/bantuan" className="hover:text-purple-400 transition-colors">Bantuan & FAQ</Link></li>
          <li><Link to="/syarat" className="hover:text-purple-400 transition-colors">Syarat & Ketentuan</Link></li>
          <li><Link to="/privasi" className="hover:text-purple-400 transition-colors">Kebijakan Privasi</Link></li>
        </ul>
      </div>
    </div>
  </footer>
);

// --- HALAMAN PUSAT BANTUAN & DUKUNGAN ---
const SupportPage = ({ settings, type }) => {
  const content = {
    faq: { title: "Bantuan & Pertanyaan yang Sering Diajukan (FAQ)", body: "Di sini Anda dapat menemukan jawaban seputar cara pendaftaran akun, pemutaran modul video pembelajaran, kendala akses kuis, hingga panduan klaim sertifikat kelulusan ber-QR code." },
    terms: { title: "Syarat & Ketentuan Layanan", body: "Dengan mengakses platform ini, pengguna setuju untuk menjaga kerahasiaan akun, mematuhi etika akademik, serta menggunakan materi pembelajaran sesuai dengan ketentuan hak cipta yang berlaku." },
    privacy: { title: "Kebijakan Privasi & Perlindungan Data", body: "Kami berkomitmen untuk melindungi data pribadi Anda seperti nama, email, dan riwayat progress belajar dengan sistem keamanan digital terbaik." }
  };
  const current = content[type] || content.faq;

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-20 animate-fadeIn">
        <h1 className="text-4xl font-black mb-6 text-white">{current.title}</h1>
        <div className="bg-[#121826] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6 text-slate-300 leading-relaxed">
          <p className="text-lg">{current.body}</p>
        </div>
        <div className="mt-8">
          <Link to="/" className="text-purple-400 font-bold hover:underline">← Kembali ke Beranda</Link>
        </div>
      </div>
      <Footer settings={settings} />
    </div>
  );
};

const CourseCard = ({ course }) => (
  <div className="bg-[#121826] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl hover:border-purple-500/50 transition-all duration-500 flex flex-col group hover:-translate-y-2 cursor-pointer hover:shadow-purple-500/10">
    <div className={`h-48 bg-gradient-to-br ${course.color || 'from-teal-500 to-emerald-600'} relative flex flex-col justify-between p-6 overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      <div className="relative z-10 flex justify-between items-start">
        <span className="bg-white/20 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-md border border-white/20 text-white">{course.category}</span>
        <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md text-white border border-white/20 text-xs">🤍</span>
      </div>
      <div className="text-center text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300 relative z-10">{course.icon || '📚'}</div>
    </div>
    <div className="p-7 flex flex-col flex-1 bg-[#121826] text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex text-amber-400 text-sm">★★★★★</div>
        <span className="text-xs font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">{course.rating || '5.0'} ({course.reviews || 0})</span>
      </div>
      <h3 className="font-extrabold text-white text-xl leading-tight mb-3 flex-1 group-hover:text-purple-400 transition-colors line-clamp-2">{course.title}</h3>
      <p className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">👨‍🏫 {course.instructor}</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
        <div>
          <p className="text-xs font-bold text-slate-500 line-through mb-1">{course.old_price || course.oldPrice}</p>
          <p className="text-2xl font-black text-white tracking-tight">{course.new_price || course.newPrice}</p>
        </div>
        <Link to={`/detail/${course.id}`} className="px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #9333EA 0%, #4F46E5 100%)' }}>Detail Kelas</Link>
      </div>
    </div>
  </div>
);

const Home = ({ settings, courses }) => {
  const navigate = useNavigate();
  const displayedCourses = (courses || initialCourses).filter(c => c.status === 'Published');

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans selection:bg-purple-500 selection:text-white" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <main className="flex-1">
        <section className="pt-28 pb-36 px-6 relative overflow-hidden bg-[#090D16]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-8 text-left">
              <h1 className="text-5xl lg:text-[4.5rem] font-black leading-[1.08] tracking-tighter text-white">
                {settings?.heroTitle || "Aplikasi Belajar Kuliah No 1 di Indonesia"}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl font-medium">
                {settings?.seoDesc || "Akses video dari dosen universitas top, sambil melihat pembahasan dan rangkuman soal, disertai AI untuk membantumu meraih IPK idaman."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button onClick={() => navigate('/katalog')} className="px-8 py-4 rounded-2xl font-black text-lg text-white shadow-[0_10px_30px_rgba(147,51,234,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 hover:shadow-purple-500/60" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>
                  Coba Sekarang 🚀
                </button>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-[4/3] rounded-[3rem] p-3 shadow-2xl relative border border-white/10 bg-[#121826] overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-indigo-900/30 rounded-[2.5rem] animate-pulse"></div>
                {settings?.heroBanner ? (
                  <img src={settings.heroBanner} alt="Hero Banner" className="w-full h-full object-cover rounded-[2.5rem]" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-900/50 to-indigo-900/50 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center relative border border-white/10">
                    <span className="text-[120px] drop-shadow-2xl relative z-10 animate-bounce">🎓</span>
                    <div className="absolute bottom-8 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-xl font-bold text-white border border-white/10">Video & Ringkasan Materi Top</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {settings?.adBannerUrl && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#121826]">
              <a href={settings.adLink || '#'} target="_blank" rel="noopener noreferrer" className="block">
                <img src={settings.adBannerUrl} alt="Banner Sponsor" className="w-full h-56 md:h-72 object-cover hover:opacity-95 transition-opacity" />
              </a>
            </div>
          </section>
        )}

        <section className="py-24 px-6 bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-4">Semua yang kamu butuhkan untuk raih IPK idaman</h2>
            <p className="text-slate-400 font-medium">Tingkatkan pengalaman belajar dengan fitur-fitur kelas dunia.</p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#121826] p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-between shadow-xl hover:border-purple-500/50 transition-all hover:scale-[1.01]">
              <div className="space-y-4 mb-8">
                <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">Kelas</span>
                <h3 className="text-2xl font-black text-white">2.000+ Video Materi dari Dosen Top Universitas</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Diajarkan oleh dosen yang ahli di berbagai bidang dan jurusan kuliah Anda.</p>
              </div>
              <div className="bg-[#090D16] p-6 rounded-2xl border border-white/10 text-center text-4xl">📚</div>
            </div>

            <div className="bg-[#121826] p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-between shadow-xl hover:border-purple-500/50 transition-all hover:scale-[1.01]">
              <div className="space-y-4 mb-8">
                <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">Try Out</span>
                <h3 className="text-2xl font-black text-white">Try Out UTS dan UAS Materi Kuliah</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Latihan Soal yang dikurasi khusus buat nge-boost pemahaman dan nilai kuliahmu.</p>
              </div>
              <div className="bg-[#090D16] p-6 rounded-2xl border border-white/10 text-center text-4xl">📝</div>
            </div>
          </div>
        </section>

        <section className="py-28 px-6 bg-[#090D16] border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="max-w-2xl">
                <h2 className="text-sm font-extrabold text-purple-400 tracking-widest uppercase mb-4">Kelas Tersedia</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Pilih topik dan mulai upgrade skill hari ini.</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {displayedCourses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </div>
  );
};

const PublicArticleList = ({ settings }) => (
  <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
    <Navbar settings={settings} />
    <div className="bg-[#0B0F19] border-b border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Artikel & Perpustakaan</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">Temukan wawasan, pembaruan materi, dan pemikiran terbaru langsung dari para ahli dan instruktur di {settings?.platformName || "LuBisa.id"}.</p>
      </div>
    </div>
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {initialBlogs.map(blog => (
          <div key={blog.id} className="bg-[#121826] rounded-[2rem] border border-white/10 overflow-hidden shadow-sm p-8 flex flex-col cursor-pointer hover:border-purple-500/50 transition-all group">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest w-fit mb-4">{blog.category}</span>
            <h4 className="text-2xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors">{blog.title}</h4>
            <p className="text-slate-400 mb-6 leading-relaxed flex-1">{blog.excerpt}</p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 text-xs font-bold text-slate-500">
              <span>✍️ {blog.author}</span>
              <span>📅 {blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer settings={settings} />
  </div>
);

const Catalog = ({ settings, courses }) => {
  const displayedCourses = (courses || initialCourses).filter(c => c.status === 'Published');
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <div className="bg-[#0B0F19] border-b border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-black text-white mb-8 tracking-tight">Katalog Try Out & Kelas</h1>
          <div className="flex items-center border border-white/10 rounded-3xl overflow-hidden max-w-2xl mx-auto bg-[#121826] shadow-xl">
            <span className="pl-6 text-2xl opacity-50">🔍</span>
            <input type="text" placeholder="Cari skill yang ingin dipelajari..." className="flex-1 p-5 outline-none text-white font-bold placeholder-slate-500 bg-transparent text-lg" />
            <button className="px-8 text-white font-bold h-full transition-colors text-lg" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Cari</button>
          </div>
        </div>
      </div>
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedCourses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      </div>
      <Footer settings={settings} />
    </div>
  );
};

// --- KOMPONEN COURSE DETAIL DINAMIS & TERINTEGRASI ---
const CourseDetail = ({ settings, instructorProfile, courses, onEnroll }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const courseList = courses || initialCourses;
  const course = courseList.find(c => String(c.id) === String(id)) || courseList[0];

  const adminFee = 2000;
  const priceVal = course.price_value !== undefined ? course.price_value : (course.priceValue || 50000);
  const totalPayment = priceVal + adminFee;

  const handlePreview = (link) => {
    if (link) window.open(link, '_blank');
    else alert("Memuat pratinjau materi...");
  };

  const handleDirectCheckout = () => { setIsCheckoutOpen(true); setCheckoutStep(1); };
  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    alert(`Berhasil! "${course.title}" telah ditambahkan ke keranjang belanja Anda.`);
  };

  const handleProcessPayment = () => {
    if (!selectedPayment) return alert("Pilih metode pembayaran terlebih dahulu!");
    setCheckoutStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-white font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <div className="bg-[#0B0F19] border-b border-white/10 pt-16 pb-32 px-6 relative text-center">
        <div className="max-w-7xl mx-auto">
          <Link to="/katalog" className="text-sm text-purple-400 font-bold hover:text-white mb-6 inline-block transition-colors">← Kembali ke Katalog</Link>
          <div className="max-w-3xl mx-auto">
            <span className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-purple-400 mb-4 inline-block">{course.category}</span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{course.title}</h1>
            <p className="text-base text-slate-400 mb-8 max-w-2xl mx-auto">Kuasai materi perkuliahan secara komprehensif bersama dosen ahli.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 -mt-16 relative z-10 w-full flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-6">Apa yang akan Anda pelajari?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 text-sm font-medium">
              {course.learningPoints ? (
                course.learningPoints.split(/[\n,]+/).map((pt, idx) => (
                  <div key={idx} className="flex space-x-3 items-start">
                    <span className="text-green-400 font-bold">✓</span>
                    <p>{pt.trim()}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Identifikasi prinsip & regulasi topik terkait</p></div>
                  <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Analisis dokumen sumber & implementasi kasus riil</p></div>
                  <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Penyusunan berkas kerja mandiri terstruktur</p></div>
                  <div className="flex space-x-3"><span className="text-green-400 font-bold">✓</span><p>Evaluasi asesmen komprehensif berstandar</p></div>
                </>
              )}
            </div>
          </div>

          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-white mb-4">Deskripsi Matakuliah</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {course.description || "Dalam matakuliah ini Anda akan belajar tentang topik perkuliahan secara komprehensif melalui materi dan asesmen terpadu."}
            </p>
            <h3 className="text-lg font-bold text-white mb-3">Persyaratan</h3>
            <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
              <li>Memahami konsep dasar terkait topik perkuliahan.</li>
              <li>Telah menyelesaikan materi prasyarat program studi terkait.</li>
            </ul>
          </div>

          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm">
            <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Kurikulum pada kursus ini</h3>
                <p className="text-xs text-slate-400 mt-1">Silabus materi yang telah diunggah oleh dosen.</p>
              </div>
              <div className="text-right text-xs font-semibold text-slate-400">
                <span>{course.sections ? course.sections.length : 1} Bagian Pertemuan</span>
              </div>
            </div>

            {course.sections && course.sections.length > 0 ? (
              <div className="space-y-4">
                {course.sections.map((section, sIdx) => (
                  <div key={section.id || sIdx} className="border border-white/10 rounded-xl overflow-hidden mb-4 bg-[#090D16]">
                    <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                      <h4 className="font-bold text-white text-sm">{section.title}</h4>
                      <span className="text-xs font-semibold text-slate-400">{section.lessons ? section.lessons.length : 0} Sesi</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {section.lessons && section.lessons.map((lesson, lIdx) => (
                        <div key={lesson.id || lIdx} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                          <div className="flex items-center space-x-3 text-slate-300 font-medium text-sm">
                            <span>{lesson.icon || '▶️'}</span>
                            <div>
                              <span>{lesson.title}</span>
                              {lesson.desc && <p className="text-[11px] text-slate-400 mt-0.5">{lesson.desc}</p>}
                            </div>
                          </div>
                          {lesson.link && (
                            <button onClick={() => handlePreview(lesson.link)} className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded hover:bg-purple-500/20 transition-colors">
                              Preview
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-sm border border-dashed border-white/10 rounded-xl">
                Struktur kurikulum sesi sedang disusun oleh dosen pengampu.
              </div>
            )}
          </div>

          <div className="bg-[#121826] p-8 rounded-[2rem] border border-white/10 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="w-24 h-24 shrink-0 bg-purple-900/30 rounded-full overflow-hidden border-2 border-purple-500/30 flex items-center justify-center text-3xl">
              {instructorProfile?.avatar ? <img src={instructorProfile.avatar} alt="Instruktur" className="w-full h-full object-cover" /> : "👨‍🏫"}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="font-bold text-white text-lg">{course.instructor || instructorProfile?.name || "Rei, S.E., M.Ak."}</h4>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">{instructorProfile?.title || "Ketua Peneliti Lentera Mondial"}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{instructorProfile?.bio || "Berpengalaman dalam pengembangan sistem informasi akuntansi dan E-Learning Management System (LMS)."}</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[360px] shrink-0">
          <div className="bg-[#121826] rounded-[2rem] border border-white/10 shadow-xl p-6 sticky top-28 space-y-6">
            <div>
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-wider block mb-2">Video Overview Modul</span>
              <div className="w-full aspect-video bg-[#090D16] rounded-2xl overflow-hidden border border-white/10 relative flex items-center justify-center group shadow-inner">
                {course.trailerUrl ? (
                  <iframe 
                    src={
                      course.trailerUrl.includes("youtube.com/watch?v=") 
                        ? `https://www.youtube.com/embed/${course.trailerUrl.split("watch?v=")[1]?.split("&")[0]}`
                        : course.trailerUrl.includes("youtu.be/")
                        ? `https://www.youtube.com/embed/${course.trailerUrl.split("youtu.be/")[1]?.split("?")[0]}`
                        : course.trailerUrl.includes("embed/")
                        ? course.trailerUrl
                        : "https://www.youtube.com/embed/dQw4w9WgXcQ"
                    } 
                    title="Course Overview"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div onClick={() => alert("Video pengantar sedang disiapkan dosen.")} className="flex flex-col items-center justify-center text-slate-400 cursor-pointer p-4 text-center hover:text-white transition-colors">
                    <span className="text-4xl mb-2">🎬</span>
                    <span className="text-xs font-bold">Tonton Video Pengantar</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-white mb-1">{course.new_price || course.newPrice || (priceVal > 0 ? `Rp${priceVal.toLocaleString('id-ID')}` : 'Gratis')}</h3>
              <p className="text-slate-500 line-through text-sm font-medium">{course.old_price || course.oldPrice || 'Rp250.000'}</p>
            </div>

            <div className="space-y-3">
              <button onClick={handleDirectCheckout} className="w-full text-white font-bold py-3.5 rounded-xl shadow-md transition-colors" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Daftar Kelas Ini</button>
              <button onClick={handleAddToCart} className="w-full bg-white/5 text-purple-400 font-bold py-3.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 relative">
                Tambahkan ke Keranjang
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black shadow">{cartCount}</span>}
              </button>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="font-bold text-white text-sm mb-3">Kursus ini termasuk:</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-medium">
                <li className="flex items-center space-x-2"><span>🎥</span><span>{course.duration || '02:00:00'} Video On-Demand</span></li>
                <li className="flex items-center space-x-2"><span>📚</span><span>{course.sections ? course.sections.length : 1} Bagian Pertemuan</span></li>
                <li className="flex items-center space-x-2"><span>♾️</span><span>Akses selamanya</span></li>
                <li className="flex items-center space-x-2"><span>🏆</span><span>Sertifikat kelulusan ber-QR code</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer settings={settings} />

      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#121826] text-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl relative border border-white/10">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white font-bold text-xl">✕</button>
            
            {checkoutStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white border-b border-white/10 pb-4">Konfirmasi Pendaftaran Kelas</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-3xl shrink-0">📊</div>
                  <div>
                    <h4 className="font-bold text-white text-lg leading-tight">{course.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">Oleh: {course.instructor}</p>
                  </div>
                </div>
                <div className="bg-[#090D16] p-5 rounded-xl border border-white/10 space-y-3">
                  <div className="flex justify-between text-sm font-semibold text-slate-300"><span>Harga Modul</span><span>{course.new_price || course.newPrice || 'Gratis'}</span></div>
                  <div className="flex justify-between text-sm font-semibold text-slate-300"><span>Biaya Admin (Platform)</span><span>Rp2.000</span></div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-end">
                    <span className="font-bold text-white">Total Pembayaran</span>
                    <span className="text-2xl font-black text-purple-400">Rp{(totalPayment).toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <button onClick={() => setCheckoutStep(2)} className="w-full text-white font-bold py-4 rounded-xl shadow-lg transition-colors" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Lanjut Pilih Pembayaran →</button>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white border-b border-white/10 pb-4">Pilih Metode Pembayaran</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="col-span-full"><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dompet Digital & Integrasi</p></div>
                  <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPayment === 'lynk' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center gap-3"><input type="radio" name="payment" value="lynk" checked={selectedPayment === 'lynk'} onChange={() => setSelectedPayment('lynk')} className="w-5 h-5 accent-purple-600" /><span className="font-bold text-white">Lynk.id (Rekomendasi)</span></div>
                  </label>
                  <label className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPayment === 'qris' ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center gap-3"><input type="radio" name="payment" value="qris" checked={selectedPayment === 'qris'} onChange={() => setSelectedPayment('qris')} className="w-5 h-5 accent-purple-600" /><span className="font-bold text-white">QRIS (Semua E-Wallet)</span></div>
                  </label>
                </div>
                <div className="flex space-x-3 pt-4 border-t border-white/10">
                  <button onClick={() => setCheckoutStep(1)} className="px-6 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors">Kembali</button>
                  <button onClick={handleProcessPayment} className="flex-1 text-white font-bold py-4 rounded-xl shadow-md transition-colors" style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}>Bayar Rp{(totalPayment).toLocaleString('id-ID')}</button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="space-y-6 text-center py-10">
                <span className="text-7xl mb-6 block animate-bounce drop-shadow-xl">🎉</span>
                <h2 className="text-3xl font-black text-white mb-2">Pendaftaran Dikonfirmasi!</h2>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto font-medium">Pembayaran Anda berhasil dikonfirmasi. Modul pembelajaran kini telah ditambahkan ke ruang belajar Anda.</p>
                <button 
                  onClick={() => {
                    if (onEnroll) onEnroll(course);
                    setIsCheckoutOpen(false);
                    navigate(`/belajar/${course.id}`);
                  }} 
                  className="text-white px-10 py-4 rounded-xl font-black shadow-lg transition-transform hover:-translate-y-1 w-full" 
                  style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}
                >
                  Mulai Belajar Sekarang 🚀
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- HALAMAN LOGIN DENGAN TOMBOL PILIHAN PERAN OTOMATIS & VALIDASI ---
const Login = ({ settings }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const ADMIN_EMAILS = ["adminbelajarai.zakki@gmail.com", "rheynalddue@gmail.com"];

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email dan kata sandi wajib diisi!");
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        alert("Nama lengkap dan gelar wajib diisi!");
        return;
      }
      alert("Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan (Approval) dari Admin.");
      setIsRegister(false);
      setName('');
      setEmail('');
      setPassword('');
    } else {
      const lowerEmail = email.trim().toLowerCase();

      // Validasi ketat berdasarkan email
      if (ADMIN_EMAILS.includes(lowerEmail)) {
        navigate('/admin/dasbor');
      } else if (lowerEmail.includes('indra') || lowerEmail.includes('rei') || lowerEmail.includes('instruktur') || lowerEmail.includes('lubisa.id')) {
        navigate('/instruktur/courses');
      } else {
        navigate('/dasbor');
      }
    }
  };

  // Tombol pilihan peran untuk mengisi email otomatis lalu tekan "Masuk ke Sistem"
  const handleSelectRole = (role) => {
    if (role === 'admin') {
      setEmail("adminbelajarai.zakki@gmail.com");
      setPassword("admin123");
    } else if (role === 'instruktur') {
      setEmail("rei@lubisa.id");
      setPassword("dosen123");
    } else {
      setEmail("ahmad@kampus.ac.id");
      setPassword("siswa123");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#090D16] text-white relative overflow-hidden font-sans" style={{ fontSize: settings?.fontSize || '16px' }}>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <Link to="/" className="absolute top-10 left-10 text-2xl font-black tracking-tighter text-white flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-xs">⚡</span>
        {settings?.platformName || "LuBisa.id"}.
      </Link>
      
      <div className="bg-[#121826] p-10 rounded-[3rem] shadow-2xl border border-white/10 w-full max-w-md relative z-10 animate-fadeIn">
        <div className="text-center mb-6">
          <span className="text-4xl mb-2 block">👋</span>
          <h2 className="text-2xl font-black text-white mb-1 tracking-tight">{isRegister ? "Daftar Instruktur Baru" : "Selamat Datang"}</h2>
          <p className="text-slate-400 font-bold text-xs">Pilih peran di bawah atau masukkan email Anda.</p>
        </div>

        {/* Tombol Pintas Pilihan Peran */}
        {!isRegister && (
          <div className="mb-6 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">Klik Peran untuk Mengisi Otomatis:</p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button" 
                onClick={() => handleSelectRole('siswa')}
                className="py-2.5 px-2 bg-purple-600/20 border border-purple-500/40 rounded-xl text-xs font-bold text-purple-300 hover:bg-purple-600/30 transition-all shadow"
              >
                👨‍🎓 Mahasiswa
              </button>
              <button 
                type="button" 
                onClick={() => handleSelectRole('instruktur')}
                className="py-2.5 px-2 bg-teal-600/20 border border-teal-500/40 rounded-xl text-xs font-bold text-teal-300 hover:bg-teal-600/30 transition-all shadow"
              >
                👨‍🏫 Instruktur
              </button>
              <button 
                type="button" 
                onClick={() => handleSelectRole('admin')}
                className="py-2.5 px-2 bg-blue-600/20 border border-blue-500/40 rounded-xl text-xs font-bold text-blue-300 hover:bg-blue-600/30 transition-all shadow"
              >
                🛠️ Admin
              </button>
            </div>
          </div>
        )}
        
        <form onSubmit={handleAuthSubmit} className="space-y-3 mb-4">
          {isRegister && (
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Nama Lengkap & Gelar</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Dr. Budi, M.Ak." className="w-full p-3 rounded-xl border border-white/10 bg-[#090D16] text-white outline-none focus:border-purple-500 text-xs font-bold" />
            </div>
          )}
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Email / Username</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contoh@kampus.ac.id" className="w-full p-3 rounded-xl border border-white/10 bg-[#090D16] text-white outline-none focus:border-purple-500 text-xs font-bold" required />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Kata Sandi</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-3 rounded-xl border border-white/10 bg-[#090D16] text-white outline-none focus:border-purple-500 text-xs font-bold" required />
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl font-black text-sm text-white shadow-xl transition-transform hover:-translate-y-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/50">
            {isRegister ? "Kirim Pendaftaran Instruktur" : "Masuk ke Sistem"}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-white/10">
          <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-xs font-bold text-purple-400 hover:underline">
            {isRegister ? "Sudah punya akun? Masuk di sini" : "Ingin bergabung sebagai Instruktur baru? Daftar di sini"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ settings, enrolledCourses }) => {
  const navigate = useNavigate();
  const myCourses = enrolledCourses && enrolledCourses.length > 0 ? enrolledCourses : [initialCourses[0]];

  return (
    <div className="min-h-screen bg-[#090D16] text-white font-sans flex flex-col selection:bg-purple-500" style={{ fontSize: settings?.fontSize || '16px' }}>
      <Navbar settings={settings} />
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/10" style={{ background: `linear-gradient(135deg, ${settings?.primaryColor || '#9333EA'} 0%, #121826 100%)` }}>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]"></div>
          <div className="relative z-10 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                <span>🏅</span> Lencana Pelajar Aktif (XP Badge)
              </span>
            </div>
            <h1 className="text-4xl font-black mb-3">Siap beraksi hari ini, Mahasiswa? 🚀</h1>
            <p className="text-purple-200 font-bold text-lg">Kamu memiliki {myCourses.length} kelas aktif di akun belajarmu.</p>
          </div>
          <div className="mt-8 md:mt-0 relative z-10 flex gap-4">
            <div className="bg-black/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center"><p className="text-xs font-black text-purple-200 uppercase tracking-wider mb-1">Total Poin</p><p className="text-3xl font-black text-white text-yellow-400">1,250 <span className="text-lg text-white">XP</span></p></div>
            <div className="bg-black/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-center"><p className="text-xs font-black text-purple-200 uppercase tracking-wider mb-1">Api Streak</p><p className="text-3xl font-black text-white text-orange-400">3 <span className="text-lg text-white">Hari</span> 🔥</p></div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/sertifikat" className="bg-[#121826] p-6 rounded-3xl border border-white/10 flex items-center justify-between hover:border-purple-500/50 transition-all hover:scale-[1.02] group shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🎓</div>
              <div>
                <h4 className="font-extrabold text-white text-base">Sertifikat Saya</h4>
                <p className="text-xs text-slate-400">Lihat & unduh sertifikat lulus</p>
              </div>
            </div>
            <span className="text-purple-400 font-bold text-lg">→</span>
          </Link>
          <Link to="/katalog" className="bg-[#121826] p-6 rounded-3xl border border-white/10 flex items-center justify-between hover:border-purple-500/50 transition-all hover:scale-[1.02] group shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📚</div>
              <div>
                <h4 className="font-extrabold text-white text-base">Katalog Modul</h4>
                <p className="text-xs text-slate-400">Jelajahi materi perkuliahan baru</p>
              </div>
            </div>
            <span className="text-indigo-400 font-bold text-lg">→</span>
          </Link>
          <button onClick={() => navigate(`/belajar/${myCourses[0].id}`)} className="bg-[#121826] p-6 rounded-3xl border border-white/10 flex items-center justify-between hover:border-purple-500/50 transition-all hover:scale-[1.02] group shadow-xl text-left">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">⚡</div>
              <div>
                <h4 className="font-extrabold text-white text-base">Ruang Belajar Aktif</h4>
                <p className="text-xs text-slate-400">Lanjutkan progress perkuliahan</p>
              </div>
            </div>
            <span className="text-emerald-400 font-bold text-lg">→</span>
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">📚 Kelas Perkuliahan Saya ({myCourses.length})</h2>
          <div className="space-y-4">
            {myCourses.map((item, idx) => (
              <div key={item.id || idx} className="bg-[#121826] p-8 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-8 group hover:border-purple-500/50 transition-colors">
                <div className="w-28 h-28 bg-purple-900/20 rounded-[2rem] flex items-center justify-center text-5xl shrink-0 group-hover:scale-105 transition-transform duration-300 border border-purple-500/30 shadow-inner">
                  {item.icon || '📊'}
                </div>
                <div className="flex-1 w-full">
                  <span className="text-xs font-black text-purple-400 uppercase tracking-widest mb-2 block bg-purple-500/10 w-fit px-3 py-1 rounded-lg border border-purple-500/20">
                    {item.category || 'Mata Kuliah'}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">Dosen Pengampu: {item.instructor || 'Dosen Ahli'}</p>
                  <div className="flex items-center gap-4 max-w-md">
                    <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden border border-white/10">
                      <div className="h-full rounded-full bg-emerald-500 w-[100%] transition-all duration-1000"></div>
                    </div>
                    <span className="font-bold text-xs text-emerald-400">Terdaftar</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/belajar/${item.id}`)}
                  className="w-full md:w-auto text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl text-center shrink-0 hover:-translate-y-1 hover:shadow-purple-500/50" 
                  style={{ backgroundColor: settings?.primaryColor || '#9333EA' }}
                >
                  Masuk Belajar ▶
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- RUANG BELAJAR (LEARNING ROOM) ---
const LearningRoom = ({ enrolledCourses, courses }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const allCourses = courses || initialCourses;
  const courseId = id ? parseInt(id, 10) : (enrolledCourses?.[0]?.id || 1);
  const currentCourse = allCourses.find(c => String(c.id) === String(courseId)) || enrolledCourses?.find(c => String(c.id) === String(courseId)) || allCourses[0];

  const isEnrolled = enrolledCourses?.some(c => String(c.id) === String(currentCourse.id));

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const sectionsData = useMemo(() => {
    if (currentCourse.sections && currentCourse.sections.length > 0) {
      return currentCourse.sections.map((sec, sIdx) => ({
        id: sec.id || `sec-${sIdx}`,
        title: sec.title,
        lessons: (sec.lessons || []).map((les, lIdx) => ({
          ...les,
          id: les.id || `${sIdx}-${lIdx}`,
          sectionTitle: sec.title,
          category: currentCourse.category || "Kuliah",
          embedLink: les.link ? getEmbedUrl(les.link) : (currentCourse.trailerUrl ? getEmbedUrl(currentCourse.trailerUrl) : "")
        }))
      }));
    }

    return [
      {
        id: 'sec-1',
        title: `Pertemuan 1: Pengantar ${currentCourse.title}`,
        lessons: [
          { id: 'les-1', title: `Video Pembahasan: ${currentCourse.title}`, type: 'youtube', embedLink: getEmbedUrl(currentCourse.trailerUrl) || "https://www.youtube.com/embed/dQw4w9WgXcQ", duration: "12:00" },
          { id: 'les-2', title: 'Modul PDF: Bahan Ajar Terpadu', type: 'pdf', fileName: 'Materi_Kuliah.pdf', duration: "15:00" }
        ]
      },
      {
        id: 'sec-2',
        title: 'Pertemuan 2: Evaluasi & Tugas Studi Kasus',
        lessons: [
          { id: 'les-3', title: 'Tugas Asesmen: Analisis Nilai Kasus', type: 'assignment', desc: 'Selesaikan studi kasus transaksi secara mandiri.', passingGrade: 75 }
        ]
      }
    ];
  }, [currentCourse]);

  const allLessons = useMemo(() => {
    return sectionsData.flatMap(sec => sec.lessons);
  }, [sectionsData]);

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem(`lubisa_progress_${currentCourse.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentVideo, setCurrentVideo] = useState(allLessons[0] || null);
  const [openSections, setOpenSections] = useState({ [sectionsData[0]?.id]: true });
  const [searchLessonQuery, setSearchLessonQuery] = useState('');
  const [lockedModalNotice, setLockedModalNotice] = useState(null);

  const [isTakingAssessment, setIsTakingAssessment] = useState(false);
  const [essayAnswer, setEssayAnswer] = useState('');
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  const toggleSection = (secId) => {
    setOpenSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  const checkCurrentSubmission = (lesson) => {
    if (!lesson) return;
    const existing = JSON.parse(localStorage.getItem('lubisa_submissions') || '[]');
    const found = existing.find(s => 
      s.courseTitle === currentCourse.title && 
      s.assessmentTitle === lesson.title &&
      s.studentEmail === "ahmad@kampus.ac.id"
    );
    setCurrentSubmission(found || null);
    if (found) {
      setAssessmentSubmitted(true);
      setEssayAnswer(found.answerText || '');
    } else {
      setAssessmentSubmitted(false);
      setEssayAnswer('');
    }
  };

  useEffect(() => {
    if (allLessons.length > 0) {
      setCurrentVideo(allLessons[0]);
      setIsTakingAssessment(false);
      checkCurrentSubmission(allLessons[0]);
      if (sectionsData[0]) {
        setOpenSections({ [sectionsData[0].id]: true });
      }
    }
  }, [sectionsData]);

  const isLessonAccessible = (lessonIndex) => {
    if (!isEnrolled) {
      return lessonIndex === 0;
    }
    if (lessonIndex === 0) return true;
    const previousLesson = allLessons[lessonIndex - 1];
    return completedLessons.includes(previousLesson?.id);
  };

  const handleSelectLesson = (item, index) => {
    if (!isLessonAccessible(index)) {
      if (!isEnrolled) {
        setLockedModalNotice({
          title: "Materi Terkunci (Khusus Berlangganan)",
          message: "Anda sedang dalam mode Coba Gratis. Buka akses penuh ke seluruh video, bahan ajar, dan tugas asesmen dengan mendaftar kelas ini sekarang!"
        });
      } else {
        setLockedModalNotice({
          title: "Selesaikan Pertemuan Sebelumnya",
          message: "Pertemuan ini masih terkunci! Anda wajib menyelesaikan materi atau mengirimkan tugas penugasan pada materi sebelumnya terlebih dahulu."
        });
      }
      return;
    }

    setCurrentVideo(item);
    setIsTakingAssessment(false);
    checkCurrentSubmission(item);
  };

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem(`lubisa_progress_${currentCourse.id}`, JSON.stringify(updated));
    }
  };

  const progressPercent = Math.round((completedLessons.length / (allLessons.length || 1)) * 100);

  const [messages, setMessages] = useState([
    { sender: 'ai', text: `Halo! Saya Tutor AI untuk mata kuliah "${currentCourse.title}". Silakan tanyakan materi kuliah atau tugas yang sedang Anda pelajari!` }
  ]);
  const [input, setInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSendAI = async () => {
    if (!input.trim() || isAiLoading) return;
    const userText = input;
    setInput('');

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsAiLoading(true);

   
    const promptText = `Peran: Kamu adalah Tutor AI cerdas untuk mata kuliah "${currentCourse.title}" di platform LuBisa.id (Kategori: ${currentCourse.category || 'Akademik'}). Dosen pengampu: ${currentCourse.instructor || 'Dosen Pengampu'}.
Pertanyaan Mahasiswa: ${userText}
Instruksi: Jawab dengan ramah, akademis, ringkas (1-2 paragraf), dan solutif dalam bahasa Indonesia.`;

    try {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
  });

  const data = await response.json();

  if (data && data.error) {
    setMessages(prev => [...prev, { sender: 'ai', text: `[Info API] ${data.error.message || 'Kunci API atau kuota belum aktif.'}` }]);
    return;
  }

  const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (aiReply) {
    setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
  } else {
    setMessages(prev => [...prev, { sender: 'ai', text: "Halo! Terkait materi ini, silakan tanyakan konsep atau studi kasus yang ingin didiskusikan." }]);
  }
} catch (err) {
  setMessages(prev => [...prev, { sender: 'ai', text: "Gagal terhubung ke server AI. Periksa koneksi internet Anda." }]);
} finally {
  setIsAiLoading(false);
}

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans flex flex-col">
      <header className="bg-[#0c1017] border-b border-white/10 px-6 py-3.5 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-center space-x-5">
          <button onClick={() => navigate('/dasbor')} className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-white/5 px-3.5 py-1.5 rounded-lg border border-white/10 transition-all">
            ← Kembali ke Dasbor
          </button>
          <h1 className="text-base font-bold tracking-tight text-white">{currentCourse.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {!isEnrolled && (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
              ⭐ Mode Coba Gratis (1 Materi)
            </span>
          )}
          <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            {currentCourse.category || 'Mata Kuliah'}
          </span>
          <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xs font-bold">M</div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <div className="lg:col-span-8 p-6 md:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          {progressPercent === 100 && isEnrolled && (
            <div className="bg-gradient-to-r from-emerald-600/20 to-purple-600/20 p-5 rounded-2xl border border-emerald-500/30 flex items-center justify-between shadow-lg">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🏆</span> Selamat, Anda Telah Lulus!
                </h3>
                <p className="text-xs text-slate-300">Semua materi telah diselesaikan dengan capaian 100%.</p>
              </div>
              <button onClick={() => navigate('/sertifikat')} className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all uppercase tracking-wider">
                Klaim Sertifikat 🎓
              </button>
            </div>
          )}

          <div className="bg-[#0f141f] border border-white/10 rounded-2xl aspect-video relative flex items-center justify-center overflow-hidden shadow-2xl">
            {currentVideo?.type === 'youtube' && currentVideo?.embedLink ? (
              <div className="w-full h-full relative">
                <iframe
                  src={currentVideo.embedLink}
                  title={currentVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : currentVideo?.type === 'pdf' || currentVideo?.type === 'doc' ? (
              <div className="text-center p-8 space-y-4">
                <span className="text-6xl block">📄</span>
                <h3 className="text-xl font-bold text-white">{currentVideo.title}</h3>
                <p className="text-sm text-slate-400">Berkas Bahan Ajar: {currentVideo.fileName || 'Modul_Kuliah.pdf'}</p>
                <button 
                  onClick={() => {
                    markLessonComplete(currentVideo.id);
                    alert(`Mengunduh berkas: ${currentVideo.fileName || currentVideo.title}. Materi ini telah ditandai selesai!`);
                  }} 
                  className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  Buka Dokumen & Selesai Baca 📖
                </button>
              </div>
            ) : currentVideo?.type === 'quiz' || currentVideo?.type === 'assignment' ? (
              <div className="w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                {currentSubmission && currentSubmission.score !== null ? (
                  <div className="m-auto w-full max-w-lg bg-[#0c1017] border border-emerald-500/30 p-6 rounded-2xl text-center space-y-4 shadow-xl">
                    <span className="text-3xl block">🎉</span>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        Hasil Penilaian Dosen
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">{currentVideo.title}</h3>
                      <p className="text-xs text-slate-400">Diperiksa oleh: <strong>{currentCourse.instructor}</strong></p>
                    </div>

                    <div className="bg-[#141b29] border border-white/5 rounded-xl p-4 flex items-center justify-around">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Nilai Anda</p>
                        <p className="text-3xl font-black text-emerald-400">{currentSubmission.score}<span className="text-xs text-slate-400"> / 100</span></p>
                      </div>
                      <div className="h-8 w-px bg-white/10"></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                        <p className="text-xs font-bold text-white mt-1">
                          {currentSubmission.score >= (currentVideo.passingGrade || 75) ? (
                            <span className="text-emerald-400 font-bold">LULUS ✅</span>
                          ) : (
                            <span className="text-amber-400 font-bold">REVISI ⚠️</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {currentSubmission.feedback && (
                      <div className="text-left bg-purple-600/10 border border-purple-500/20 p-3 rounded-lg text-xs">
                        <p className="font-bold text-purple-300 mb-1">Catatan Dosen:</p>
                        <p className="text-slate-200 italic">"{currentSubmission.feedback}"</p>
                      </div>
                    )}
                  </div>
                ) : !isTakingAssessment ? (
                  <div className="text-center m-auto space-y-4 max-w-md">
                    <span className="text-5xl block">📝</span>
                    <h3 className="text-xl font-bold text-white">{currentVideo.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentVideo.desc || 'Kerjakan tugas analisis dan evaluasi studi kasus di bawah ini dengan seksama.'}</p>
                    <div className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                      Passing Grade: {currentVideo.passingGrade || 75}%
                    </div>
                    <div>
                      {currentSubmission ? (
                        <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 px-4 py-2 rounded-xl text-xs font-bold">
                          ⏳ Jawaban sudah dikirim. Menunggu penilaian dosen...
                        </span>
                      ) : (
                        <button 
                          onClick={() => setIsTakingAssessment(true)} 
                          className="mt-2 bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg text-white"
                        >
                          Mulai Kerjakan Asesmen ✍️
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-left w-full max-w-2xl mx-auto py-2">
                    <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                      <h4 className="font-bold text-sm text-white">{currentVideo.title}</h4>
                      <button onClick={() => setIsTakingAssessment(false)} className="text-xs text-slate-400 hover:text-white">Tutup</button>
                    </div>
                    <div className="bg-[#0c1017] p-3 rounded-lg border border-white/10 text-xs text-slate-200">
                      <span className="font-bold text-purple-400 block mb-1">Instruksi Soal:</span>
                      {currentVideo.desc || "Uraikan pemahaman dan contoh implementasi kasus nyata materi ini."}
                    </div>
                    <textarea
                      rows="6"
                      value={essayAnswer}
                      onChange={(e) => setEssayAnswer(e.target.value)}
                      placeholder="Tulis jawaban esai Anda di sini..."
                      className="w-full bg-[#0c1017] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500 resize-none font-sans"
                    ></textarea>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsTakingAssessment(false)} className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg text-xs">Batal</button>
                      <button 
                        onClick={() => {
                          if (!essayAnswer.trim()) return alert("Jawaban tidak boleh kosong!");
                          const newSubmission = {
                            id: Date.now(),
                            studentName: "Ahmad Budi",
                            studentEmail: "ahmad@kampus.ac.id",
                            courseTitle: currentCourse.title,
                            assessmentTitle: currentVideo.title,
                            answerText: essayAnswer,
                            submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
                            score: null,
                            feedback: ""
                          };
                          const existing = JSON.parse(localStorage.getItem('lubisa_submissions') || '[]');
                          const filtered = existing.filter(s => !(s.courseTitle === currentCourse.title && s.assessmentTitle === currentVideo.title && s.studentEmail === "ahmad@kampus.ac.id"));
                          localStorage.setItem('lubisa_submissions', JSON.stringify([newSubmission, ...filtered]));
                          
                          markLessonComplete(currentVideo.id);

                          setCurrentSubmission(newSubmission);
                          setAssessmentSubmitted(true);
                          setIsTakingAssessment(false);
                          alert("Jawaban berhasil dikirim! Pertemuan berikutnya kini telah terbuka.");
                        }}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow"
                      >
                        Kirim Jawaban 🚀
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{currentVideo?.title || currentCourse.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{currentCourse.title} • {currentCourse.category}</p>
              </div>
              <div className="flex items-center gap-3">
                {currentVideo && !completedLessons.includes(currentVideo.id) && currentVideo.type !== 'assignment' && (
                  <button
                    onClick={() => {
                      markLessonComplete(currentVideo.id);
                      alert("Materi telah diselesaikan! Sesi berikutnya sekarang telah terbuka.");
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>✓</span> Tandai Selesai & Buka Sesi Selanjutnya
                  </button>
                )}
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                  ★ {currentCourse.rating || '4.9'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button onClick={() => alert("Transkrip otomatis sesi ini sedang diproses.")} className="px-3.5 py-1.5 bg-[#141a29] hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors">
                <span>📄</span> Transcript
              </button>
              <button onClick={() => alert("Terima kasih atas rating Anda!")} className="px-3.5 py-1.5 bg-[#141a29] hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors">
                <span>⭐</span> Rating
              </button>
              <button onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert("Tautan disalin!"))} className="px-3.5 py-1.5 bg-[#141a29] hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors">
                <span>🔗</span> Bagikan
              </button>
              <button onClick={() => { const el = document.getElementById('ai-chat-input'); if(el) el.focus(); }} className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-all">
                <span>🤖</span> Tanya Tutor AI
              </button>
            </div>

            <div className="bg-[#0c1017] p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-lg">👨‍🏫</div>
                <div>
                  <h4 className="font-bold text-sm text-white">{currentCourse.instructor}</h4>
                  <p className="text-[11px] text-slate-400">Dosen Pengampu Mata Kuliah • LuBisa.id Faculty</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                {currentCourse.description || "Video dan rangkaian materi ini membahas topik pembelajaran komprehensif berstandar universitas."}
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Silabus Accordion dengan Kunci 🔒 */}
        <div className="lg:col-span-4 bg-[#0a0d14] border-l border-white/10 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-[#0c1017] space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-white">{currentCourse.title}</h3>
              <span className="text-xs font-bold text-emerald-400">{progressPercent}%</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {completedLessons.length} dari {allLessons.length} Materi Selesai
            </p>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-500">🔍</span>
              <input
                type="text"
                value={searchLessonQuery}
                onChange={(e) => setSearchLessonQuery(e.target.value)}
                placeholder="Cari materi..."
                className="w-full bg-[#121824] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {sectionsData.map((section, sIdx) => {
              const isOpen = openSections[section.id];
              const filteredLessons = section.lessons.filter(l => 
                l.title.toLowerCase().includes(searchLessonQuery.toLowerCase())
              );

              if (searchLessonQuery && filteredLessons.length === 0) return null;

              return (
                <div key={section.id || sIdx} className="bg-[#0f141f] border border-white/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-xs text-slate-200 flex-1 pr-2">
                      {section.title} ({section.lessons.length})
                    </span>
                    <span className={`text-xs text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/5 divide-y divide-white/5 bg-[#090d14]">
                      {filteredLessons.map((item) => {
                        const globalIndex = allLessons.findIndex(l => l.id === item.id);
                        const isUnlocked = isLessonAccessible(globalIndex);
                        const isActive = currentVideo?.id === item.id;
                        const isDone = completedLessons.includes(item.id);

                        return (
                          <div
                            key={item.id}
                            onClick={() => handleSelectLesson(item, globalIndex)}
                            className={`p-3 flex items-center justify-between text-xs transition-colors ${
                              !isUnlocked
                                ? 'opacity-40 cursor-not-allowed bg-black/20 text-slate-500'
                                : isActive
                                ? 'bg-purple-600/20 text-purple-300 font-bold border-l-4 border-purple-500 pl-2.5 cursor-pointer'
                                : 'text-slate-300 hover:bg-white/5 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 mr-2">
                              <span className="text-xs">
                                {!isUnlocked ? '🔒' : isActive ? '📶' : item.type === 'youtube' ? '▶️' : item.type === 'pdf' ? '📄' : '📝'}
                              </span>
                              <span className="line-clamp-2 leading-snug">{item.title}</span>
                            </div>

                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[9px] ${
                              !isUnlocked ? 'border-slate-600 bg-black/40 text-slate-600' : isDone ? 'border-purple-500 bg-purple-600 text-white' : 'border-white/20'
                            }`}>
                              {!isUnlocked ? '🔒' : isDone ? '✓' : ''}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-[#0c1017] border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🤖</span> Tutor AI ({currentCourse.category})
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar text-[11px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-purple-600 text-white ml-4' : 'bg-[#141a26] text-slate-300 mr-4'}`}>
                  {msg.text}
                </div>
              ))}
              {isAiLoading && (
                <div className="p-2 rounded-lg bg-[#141a26] text-purple-300 text-[10px] animate-pulse">
                  Tutor AI sedang berpikir... ⏳
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 bg-[#121824] border border-white/10 rounded-xl p-1">
              <input
                id="ai-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAI()}
                placeholder={`Tanya materi ini ke AI...`}
                disabled={isAiLoading}
                className="flex-1 bg-transparent px-2 text-xs font-medium text-white outline-none placeholder-slate-500"
              />
              <button
                onClick={handleSendAI}
                disabled={isAiLoading}
                className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow hover:scale-105 disabled:opacity-50"
              >
                {isAiLoading ? '...' : '➤'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {lockedModalNotice && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#121826] border border-purple-500/30 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto text-3xl">
              🔒
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{lockedModalNotice.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{lockedModalNotice.message}</p>
            </div>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setLockedModalNotice(null)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold"
              >
                Mengerti
              </button>
              {!isEnrolled && (
                <button
                  onClick={() => {
                    setLockedModalNotice(null);
                    navigate(`/detail/${currentCourse.id}`);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-black shadow-lg"
                >
                  Daftar Kelas Ini 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Assessment = () => (<div className="min-h-screen bg-[#090D16] text-white flex flex-col items-center justify-center p-6 text-center"><div className="bg-[#121826] border border-white/10 p-16 rounded-[3rem] shadow-2xl max-w-2xl w-full"><span className="text-7xl mb-8 block drop-shadow-lg">📝</span><h1 className="text-4xl font-black mb-4 text-white tracking-tight">Latihan Terakhir</h1><p className="font-bold text-slate-400 mb-10">Uji pemahamanmu sebelum meraih sertifikat kelulusan.</p><Link to="/sertifikat" className="bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black text-xl block w-full shadow-xl hover:-translate-y-1 transition-transform">Kumpul & Klaim Sertifikat 🏆</Link></div></div>);

// --- HALAMAN SERTIFIKAT KELULUSAN ---
const Certificate = () => {
  const navigate = useNavigate();

  const handleDownloadCertificate = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#060911] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 w-full p-4 flex justify-between items-center max-w-5xl">
        <button onClick={() => navigate('/belajar')} className="text-sm font-bold text-slate-400 hover:text-white bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          ← Kembali ke Ruang Belajar
        </button>
      </div>

      <div className="bg-[#121826] border border-purple-500/30 p-12 md:p-20 rounded-[3rem] text-center max-w-4xl w-full shadow-2xl relative z-10 space-y-8 animate-fadeIn">
        <span className="text-6xl block animate-bounce">🎓</span>
        <div>
          <span className="text-xs font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">Sertifikat Resmi Kelulusan</span>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-white mt-4 mb-2">Sertifikat Kelulusan</h1>
          <p className="text-sm text-slate-400">Diberikan kepada mahasiswa atas keberhasilan menuntaskan seluruh kurikulum pembelajaran.</p>
        </div>

        <div className="py-6 border-y border-white/10 space-y-2">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Nama Peserta</p>
          <h3 className="text-2xl md:text-3xl font-black text-purple-300">Ahmad Budi</h3>
          <p className="text-xs text-slate-400 mt-2">Telah menyelesaikan matakuliah <strong className="text-white">Pengantar Akuntansi (Perusahaan Dagang)</strong> dengan predikat Memuaskan.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button onClick={handleDownloadCertificate} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
            📥 Download / Cetak Sertifikat (PDF)
          </button>
          <button onClick={() => navigate('/dasbor')} className="w-full sm:w-auto bg-white/5 text-slate-300 hover:text-white px-8 py-4 rounded-2xl font-bold border border-white/10 transition-colors">
            Kembali ke Dasbor
          </button>
        </div>

        <div className="text-[10px] text-slate-500 tracking-wider uppercase">
          Verifikasi ID: LuBisa.id-CERT-2026-9984 • Terbit resmi oleh LuBisa.id Academy Institute
        </div>
      </div>
    </div>
  );
};

// --- ADMIN PORTAL UTUH LENGKAP ---
const AdminLayout = ({ settings, setSettings, courses, onApproveCourse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);
  
  const adminCourses = courses || initialCourses;
  const [users, setUsers] = useState(initialUsers);
  const [ebooks, setEbooks] = useState(initialEbooks);
  const [tickets, setTickets] = useState(initialTicketsAdmin);
  const [blogs, setBlogs] = useState(initialBlogs);

  const [activeMoocTab, setActiveMoocTab] = useState('kursus');
  const [activeUserTab, setActiveUserTab] = useState('siswa');
  const [activeSettingTab, setActiveSettingTab] = useState('umum');
  const [searchQuery, setSearchQuery] = useState('');

  const [tempSettings, setTempSettings] = useState(settings);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'AKUNTANSI', customCategory: '' });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'siswa' });

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'siswa' });

  const [coupons, setCoupons] = useState([
    { id: 1, code: "LuBisa.id2026", discount: "20%", expiry: "31 Des 2026", status: "Active" },
    { id: 2, code: "AKUNTANSIMODEN", discount: "Rp15.000", expiry: "15 Okt 2026", status: "Active" }
  ]);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({ code: '', discount: '', expiry: '' });

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: '', category: 'Edukasi', customCategory: '', excerpt: '', author: 'Admin Utama' });

  const actionAlert = (action, item) => alert(`Fungsi ${action} untuk ${item} berhasil dipanggil!`);
  const handleDeleteItem = (setState, stateArray, id) => {
    if(window.confirm("Yakin ingin menghapus data ini?")) {
      setState(stateArray.filter(item => item.id !== id));
    }
  };

  const handleOpenEditUser = (u) => {
    setEditUser(u.id);
    setUserForm({ name: u.name, email: u.email, role: u.role });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name.trim() || !userForm.email.trim()) return alert("Nama dan Email wajib diisi!");
    setUsers(users.map(u => u.id === editUser ? { ...u, ...userForm } : u));
    setIsUserModalOpen(false);
    alert("Data pengguna berhasil diperbarui!");
  };

  const handleSaveNewUser = () => {
    if (!newUserForm.name.trim() || !newUserForm.email.trim()) return alert("Nama dan Email wajib diisi!");
    const createdUser = {
      id: Date.now(),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      joinDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "Active"
    };
    setUsers([createdUser, ...users]);
    setIsAddUserModalOpen(false);
    setNewUserForm({ name: '', email: '', role: 'siswa' });
    alert("Pengguna baru berhasil ditambahkan!");
  };

  const handleSaveCoupon = () => {
    if (!couponForm.code.trim() || !couponForm.discount.trim()) return alert("Kode kupon dan diskon wajib diisi!");
    const newC = {
      id: Date.now(),
      code: couponForm.code.toUpperCase(),
      discount: couponForm.discount,
      expiry: couponForm.expiry || "30 Hari ke depan",
      status: "Active"
    };
    setCoupons([newC, ...coupons]);
    setIsCouponModalOpen(false);
    setCouponForm({ code: '', discount: '', expiry: '' });
    alert("Kupon diskon berhasil dibuat!");
  };

  const handleSaveSettings = () => {
    setSettings(tempSettings);
    alert("Pengaturan sistem web berhasil diperbarui!");
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempSettings({ ...tempSettings, [field]: imageUrl });
    }
  };

  const handleApproveUser = (id) => { setUsers(users.map(u => u.id === id ? { ...u, status: 'Active' } : u)); };
  const handleRejectUser = (id) => { if(window.confirm("Tolak dan hapus pendaftaran pengguna ini?")) { setUsers(users.filter(u => u.id !== id)); } };

  const filteredCourses = adminCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => { setEditId(null); setFormData({ title: '', category: 'AKUNTANSI', customCategory: '' }); setIsModalOpen(true); };
  const handleEdit = (course) => { 
    setEditId(course.id); 
    const isStandard = ["AKUNTANSI", "MANAJEMEN", "LOGISTIK"].includes(course.category);
    setFormData({ title: course.title, category: isStandard ? course.category : 'Lainnya', customCategory: isStandard ? '' : course.category }); 
    setIsModalOpen(true); 
  };
  
  const handleSave = () => {
    if (!formData.title.trim()) return alert("Judul tidak boleh kosong!");
    setIsModalOpen(false);
  };

  const handleOpenBlogModal = (blog = null) => {
    if (blog) {
      setEditBlogId(blog.id);
      const isStandard = ["Edukasi", "Logistik", "Manajemen", "Akuntansi", "Umum"].includes(blog.category);
      setBlogForm({ title: blog.title, category: isStandard ? blog.category : 'Lainnya', customCategory: isStandard ? '' : blog.category, excerpt: blog.excerpt, author: blog.author });
    } else {
      setEditBlogId(null);
      setBlogForm({ title: '', category: 'Edukasi', customCategory: '', excerpt: '', author: 'Admin Utama' });
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = () => {
    if (!blogForm.title.trim() || !blogForm.excerpt.trim()) return alert("Judul dan ringkasan artikel wajib diisi!");
    const finalCategory = blogForm.category === 'Lainnya' ? (blogForm.customCategory || 'Umum') : blogForm.category;

    if (editBlogId) {
      setBlogs(blogs.map(b => b.id === editBlogId ? { ...b, ...blogForm, category: finalCategory } : b));
    } else {
      const newBlog = { id: Date.now(), ...blogForm, category: finalCategory, date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'Published' };
      setBlogs([newBlog, ...blogs]);
    }
    setIsBlogModalOpen(false);
  };

  const renderDashboard = () => (
    <>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Ikhtisar Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">TOTAL MAHASISWA</p><p className="text-3xl font-extrabold text-slate-900">{users.filter(u => u.role === 'siswa' && u.status === 'Active').length}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">MODUL AKTIF</p><p className="text-3xl font-extrabold text-slate-900">{adminCourses.filter(c => c.status === 'Published').length}</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">PENDAPATAN BULAN INI</p><p className="text-3xl font-extrabold text-green-600">Rp 12.4M</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500"><p className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-widest">MENUNGGU REVIEW</p><p className="text-3xl font-extrabold text-slate-900">{users.filter(u => u.status === 'Pending').length + adminCourses.filter(c => c.status === 'In Review').length}</p></div>
      </div>
    </>
  );

  const renderManajemenMOOC = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Manajemen MOOC</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Tambah Data</button>
      </div>
      <div className="flex space-x-2 border-b border-slate-200 mb-6">
        <button onClick={() => setActiveMoocTab('kursus')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeMoocTab === 'kursus' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Daftar Kursus</button>
        <button onClick={() => setActiveMoocTab('review')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeMoocTab === 'review' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Review Modul <span className="ml-2 bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[10px]">{adminCourses.filter(c => c.status === 'In Review').length}</span></button>
        <button onClick={() => setActiveMoocTab('kategori')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeMoocTab === 'kategori' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Kategori Topik</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {activeMoocTab !== 'review' && (
          <div className="p-4 bg-slate-50 border-b border-slate-200"><input type="text" placeholder="Cari kursus..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-200 outline-none text-sm focus:border-blue-500" /></div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
            <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">{activeMoocTab === 'kategori' ? 'NAMA KATEGORI' : 'JUDUL MODUL'}</th>
                {activeMoocTab !== 'kategori' && <th className="px-6 py-4 font-bold">KATEGORI</th>}
                {activeMoocTab !== 'kategori' && <th className="px-6 py-4 font-bold">STATUS</th>}
                <th className="px-6 py-4 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeMoocTab === 'kursus' && filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50">
                  <td className="px-6 py-5 font-bold text-slate-800">{course.title}</td>
                  <td className="px-6 py-5"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-bold">{course.category}</span></td>
                  <td className="px-6 py-5"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{course.status}</span></td>
                  <td className="px-6 py-5 text-center space-x-4"><button onClick={() => handleEdit(course)} className="text-blue-600 font-bold hover:underline">Edit</button><button onClick={() => handleDeleteItem(null, null, course.id)} className="text-red-500 font-bold hover:underline">Hapus</button></td>
                </tr>
              ))}
              {activeMoocTab === 'review' && adminCourses.filter(c => c.status === 'In Review').map((course) => (
                <tr key={course.id} className="hover:bg-slate-50">
                  <td className="px-6 py-5 font-bold text-slate-800"><p>{course.title}</p><p className="text-xs font-medium text-slate-400 mt-1">Oleh: {course.instructor}</p></td>
                  <td className="px-6 py-5"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-bold">{course.category}</span></td>
                  <td className="px-6 py-5"><span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded text-[10px] font-bold uppercase">In Review</span></td>
                  <td className="px-6 py-5 text-center space-x-3">
                    <button onClick={() => onApproveCourse && onApproveCourse(course.id)} className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:bg-green-600">Setujui & Publish</button>
                    <button onClick={() => actionAlert('Revisi', course.title)} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200">Minta Revisi</button>
                  </td>
                </tr>
              ))}
              {activeMoocTab === 'review' && adminCourses.filter(c => c.status === 'In Review').length === 0 && (
                <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-400 font-medium">Semua modul sudah di-review. Tidak ada antrean pengajuan baru.</td></tr>
              )}
              {activeMoocTab === 'kategori' && (
                <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">Akuntansi</td><td className="px-6 py-4 text-center space-x-4"><button className="text-blue-600 font-bold hover:underline">Edit</button></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">{editId ? `Edit ${activeMoocTab}` : `Tambah ${activeMoocTab} Baru`}</h3><button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button></div>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cover / Thumbnail Modul</label><input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline-none cursor-pointer border border-slate-200 rounded-xl" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Nama Kursus</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Masukkan judul..." className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
              {activeMoocTab === 'kursus' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Kategori</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold text-slate-700 bg-slate-50 mb-3">
                    <option value="AKUNTANSI">Akuntansi</option><option value="MANAJEMEN">Manajemen</option><option value="LOGISTIK">Logistik</option><option value="Lainnya">Lainnya (Ketik Sendiri)</option>
                  </select>
                  {formData.category === 'Lainnya' && (
                    <input type="text" value={formData.customCategory} onChange={(e) => setFormData({...formData, customCategory: e.target.value.toUpperCase()})} placeholder="Contoh: PARIWISATA" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-3 pt-4 border-t border-slate-100"><button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Batal</button><button onClick={handleSave} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-colors">Simpan</button></div>
          </div>
        </div>
      )}
    </>
  );

  const renderPengguna = () => {
    let filteredUsers;
    if (activeUserTab === 'persetujuan') { filteredUsers = users.filter(u => u.status === 'Pending'); } 
    else { filteredUsers = users.filter(u => u.role === activeUserTab && u.status === 'Active'); }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Data Pengguna</h1>
          <button onClick={() => setIsAddUserModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Tambah Pengguna</button>
        </div>
        <div className="flex space-x-2 border-b border-slate-200 mb-6">
          <button onClick={() => setActiveUserTab('siswa')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'siswa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Data Siswa</button>
          <button onClick={() => setActiveUserTab('instruktur')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'instruktur' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Data Instruktur</button>
          <button onClick={() => setActiveUserTab('admin')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'admin' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Data Admin</button>
          <button onClick={() => setActiveUserTab('persetujuan')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeUserTab === 'persetujuan' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Persetujuan Akun <span className="ml-2 bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[10px]">{users.filter(u => u.status === 'Pending').length}</span></button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                <tr><th className="px-6 py-4 font-bold">NAMA LENGKAP</th><th className="px-6 py-4 font-bold">EMAIL</th><th className="px-6 py-4 font-bold">TGL DAFTAR</th><th className="px-6 py-4 font-bold">STATUS</th><th className="px-6 py-4 font-bold text-center">AKSI</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-6 py-5 font-bold text-slate-800"><p>{u.name}</p>{activeUserTab === 'persetujuan' && <p className="text-[10px] text-slate-400 mt-1 uppercase">Mendaftar sebagai: {u.role}</p>}</td>
                    <td className="px-6 py-5">{u.email}</td>
                    <td className="px-6 py-5">{u.joinDate}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{u.status}</span>
                    </td>
                    <td className="px-6 py-5 text-center space-x-3">
                      {activeUserTab === 'persetujuan' ? (
                        <>
                          <button onClick={() => handleApproveUser(u.id)} className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:bg-green-600">Approve</button>
                          <button onClick={() => handleRejectUser(u.id)} className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200">Tolak</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => actionAlert('Kirim Pesan', u.name)} className="text-indigo-600 font-bold hover:underline">Pesan</button>
                          <button onClick={() => handleOpenEditUser(u)} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteItem(setUsers, users, u.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">Tidak ada data pengguna di kategori ini.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {isAddUserModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">Tambah Pengguna Baru</h3><button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 font-bold">✕</button></div>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Lengkap & Gelar</label><input type="text" value={newUserForm.name} onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})} placeholder="Contoh: Budi Santoso" className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email / Username</label><input type="email" value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} placeholder="budi@kampus.ac.id" className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Peran (Role)</label>
                  <select value={newUserForm.role} onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})} className="w-full p-4 rounded-xl border bg-slate-50 font-semibold">
                    <option value="siswa">Siswa</option><option value="instruktur">Instruktur</option><option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4 border-t"><button onClick={() => setIsAddUserModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveNewUser} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold">Simpan</button></div>
            </div>
          </div>
        )}

        {isUserModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
              <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">Edit Data Pengguna</h3><button onClick={() => setIsUserModalOpen(false)} className="text-slate-400 font-bold">✕</button></div>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Lengkap</label><input type="text" value={userForm.name} onChange={(e) => setUserForm({...userForm, name: e.target.value})} className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email</label><input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} className="w-full p-4 rounded-xl border font-semibold" /></div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Peran (Role)</label>
                  <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value})} className="w-full p-4 rounded-xl border bg-slate-50 font-semibold">
                    <option value="siswa">Siswa</option><option value="instruktur">Instruktur</option><option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4 border-t"><button onClick={() => setIsUserModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveUser} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold">Simpan</button></div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderEbook = () => (
    <>
      <div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-extrabold text-slate-900">Manajemen E-Book</h1><button onClick={() => actionAlert('Tambah', 'E-Book')} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Tambah E-Book</button></div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600"><thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider"><tr><th className="px-6 py-4 font-bold">Judul Buku</th><th className="px-6 py-4 font-bold">Kategori</th><th className="px-6 py-4 font-bold">Harga</th><th className="px-6 py-4 font-bold text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">
            {ebooks.map((b) => (<tr key={b.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">{b.title}</td><td className="px-6 py-4">{b.category}</td><td className="px-6 py-4 font-semibold text-slate-900">{b.price}</td><td className="px-6 py-4 text-center space-x-4"><button onClick={() => actionAlert('Edit', b.title)} className="text-blue-600 font-bold hover:underline">Edit</button><button onClick={() => handleDeleteItem(setEbooks, ebooks, b.id)} className="text-red-500 font-bold hover:underline">Hapus</button></td></tr>))}
          </tbody></table>
        </div>
      </div>
    </>
  );

  const renderKeuangan = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Keuangan & Manajemen Kupon</h1>
        <button onClick={() => setIsCouponModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">+ Buat Kupon</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Admin Revenue</p><p className="text-3xl font-extrabold text-slate-900">Rp 8.500.000</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Instructor Revenue</p><p className="text-3xl font-extrabold text-slate-900">Rp 3.900.000</p></div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-lg">Daftar Kupon Diskon Aktif</h3>
          <span className="text-xs font-bold text-slate-400">{coupons.length} Kupon Tersedia</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">KODE KUPON</th>
                <th className="px-6 py-4 font-bold">BESAR DISKON</th>
                <th className="px-6 py-4 font-bold">MASA BERLAKU</th>
                <th className="px-6 py-4 font-bold">STATUS</th>
                <th className="px-6 py-4 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-black text-blue-600 tracking-wide">{c.code}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{c.discount}</td>
                  <td className="px-6 py-4">{c.expiry}</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2.5 py-1 rounded text-[10px] font-bold uppercase">{c.status}</span></td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleDeleteItem(setCoupons, coupons, c.id)} className="text-red-500 font-bold hover:underline">Hapus Kupon</button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">Belum ada kupon diskon aktif.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCouponModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl space-y-6">
            <div className="flex justify-between items-center"><h3 className="text-2xl font-black text-slate-900">Buat Kupon Diskon Baru</h3><button onClick={() => setIsCouponModalOpen(false)} className="text-slate-400 font-bold">✕</button></div>
            <div className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kode Kupon</label><input type="text" value={couponForm.code} onChange={(e) => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} placeholder="Contoh: LuBisa.idPROMO" className="w-full p-4 rounded-xl border font-bold uppercase" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Besar Diskon</label><input type="text" value={couponForm.discount} onChange={(e) => setCouponForm({...couponForm, discount: e.target.value})} placeholder="Contoh: 25%" className="w-full p-4 rounded-xl border font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Masa Berlaku</label><input type="text" value={couponForm.expiry} onChange={(e) => setCouponForm({...couponForm, expiry: e.target.value})} placeholder="Contoh: 31 Des 2026" className="w-full p-4 rounded-xl border font-semibold" /></div>
            </div>
            <div className="flex space-x-3 pt-4 border-t"><button onClick={() => setIsCouponModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={handleSaveCoupon} className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold">Simpan</button></div>
          </div>
        </div>
      )}
    </>
  );

  const renderTiket = () => (
    <>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Tiket Support</h1>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600"><thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider"><tr><th className="px-6 py-4 font-bold">Pengguna</th><th className="px-6 py-4 font-bold">Subjek Masalah</th><th className="px-6 py-4 font-bold">Prioritas</th><th className="px-6 py-4 font-bold text-center">Status</th><th className="px-6 py-4 font-bold text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">
            {tickets.map((t) => (<tr key={t.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-slate-800">{t.user}</td><td className="px-6 py-4">{t.subject}</td><td className="px-6 py-4"><span className={`font-bold ${t.priority === 'Tinggi' ? 'text-red-600' : 'text-amber-600'}`}>{t.priority}</span></td><td className="px-6 py-4 text-center"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{t.status}</span></td><td className="px-6 py-4 text-center space-x-3"><button onClick={() => actionAlert('Balas Macro', t.subject)} className="text-blue-600 font-bold hover:underline">Balas</button><button onClick={() => setTickets(tickets.map(x => x.id === t.id ? {...x, status: 'Closed'} : x))} className="text-slate-500 font-bold hover:underline">Tutup</button></td></tr>))}
          </tbody></table>
        </div>
      </div>
    </>
  );

  const renderBlog = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Artikel & Blog</h1>
        <button onClick={() => handleOpenBlogModal()} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700">+ Tulis Artikel</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr><th className="px-6 py-4 font-bold">JUDUL ARTIKEL</th><th className="px-6 py-4 font-bold">PENULIS</th><th className="px-6 py-4 font-bold">TGL PUBLIKASI</th><th className="px-6 py-4 font-bold">STATUS</th><th className="px-6 py-4 font-bold text-center">AKSI</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-6 py-5 font-bold text-slate-800 max-w-xs truncate" title={b.title}>{b.title}</td>
                  <td className="px-6 py-5">{b.author}</td>
                  <td className="px-6 py-5">{b.date}</td>
                  <td className="px-6 py-5"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${b.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span></td>
                  <td className="px-6 py-5 text-center space-x-3">
                    <button onClick={() => handleOpenBlogModal(b)} className="text-blue-600 font-bold hover:underline">Edit</button>
                    <button onClick={() => handleDeleteItem(setBlogs, blogs, b.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">Belum ada artikel yang dipublikasikan.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderPengaturan = () => {
    return (
      <div className="max-w-5xl mx-auto pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Pengaturan Sistem Web</h1>
          <button onClick={handleSaveSettings} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-blue-700 transition-colors">Simpan Perubahan</button>
        </div>
        <div className="flex space-x-8 border-b border-slate-200 mb-8 overflow-x-auto">
          <button onClick={() => setActiveSettingTab('umum')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'umum' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Identitas Web</button>
          <button onClick={() => setActiveSettingTab('tampilan')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'tampilan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Tampilan & Tema</button>
          <button onClick={() => setActiveSettingTab('pembelajaran')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'pembelajaran' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Sistem Pembelajaran</button>
          <button onClick={() => setActiveSettingTab('pembayaran')} className={`pb-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeSettingTab === 'pembayaran' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Payment Gateway</button>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          {activeSettingTab === 'umum' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Platform</label><input type="text" value={tempSettings.platformName} onChange={(e) => setTempSettings({...tempSettings, platformName: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email Dukungan (Support)</label><input type="email" defaultValue="support@lubisa.id" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
              </div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Judul Utama Hero (Landing Page)</label><input type="text" value={tempSettings.heroTitle} onChange={(e) => setTempSettings({...tempSettings, heroTitle: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Deskripsi SEO Singkat</label><textarea value={tempSettings.seoDesc} onChange={(e) => setTempSettings({...tempSettings, seoDesc: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold h-24 resize-none"></textarea></div>
            </div>
          )}
          {activeSettingTab === 'tampilan' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Warna Utama (Primary Color)</label>
                  <input type="color" value={tempSettings.primaryColor} onChange={(e) => setTempSettings({...tempSettings, primaryColor: e.target.value})} className="w-full h-12 p-1 rounded-xl border border-slate-200 cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Ukuran Font Dasar</label>
                  <select value={tempSettings.fontSize} onChange={(e) => setTempSettings({...tempSettings, fontSize: e.target.value})} className="w-full p-3.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold bg-slate-50">
                    <option value="14px">14px (Kecil)</option>
                    <option value="16px">16px (Normal)</option>
                    <option value="18px">18px (Besar)</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Upload Logo Platform</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logoUrl')} className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 outline-none cursor-pointer border border-slate-200 rounded-xl mb-2" />
              </div>
            </div>
          )}
          {activeSettingTab === 'pembelajaran' && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Standar Kelulusan Passing Grade (%)</label>
                <input type="number" defaultValue="75" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kebijakan Sesi Ujian Ulang (Retake Limit)</label>
                <input type="number" defaultValue="3" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
              </div>
            </div>
          )}
          {activeSettingTab === 'pembayaran' && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Merchant ID (Lynk.id / Midtrans)</label>
                <input type="text" defaultValue="LuBisa.id-PAY-88291" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Biaya Layanan Platform (Admin Fee Rp)</label>
                <input type="number" defaultValue="2000" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-semibold" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800/50"><Link to="/" className="text-2xl font-serif font-bold text-white mb-1 block">LuBisa.id<span className="text-blue-500">Admin</span></Link><div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Management Console</div></div>
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <button onClick={() => navigate('/admin/dasbor')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('dasbor') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📊 Dashboard</button>
          <div className="px-6 py-3 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pembelajaran</div>
          <button onClick={() => { navigate('/admin/mooc'); setActiveMoocTab('kursus'); }} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('mooc') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📚 Manajemen MOOC</button>
          <button onClick={() => navigate('/admin/ebook')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('ebook') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📖 E-Book Digital</button>
          <div className="px-6 py-3 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operasional</div>
          <button onClick={() => { navigate('/admin/pengguna'); setActiveUserTab('siswa'); }} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('pengguna') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>👥 Data Pengguna</button>
          <button onClick={() => navigate('/admin/keuangan')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('keuangan') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>💰 Keuangan & Kupon</button>
          <div className="px-6 py-3 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dukungan & Sistem</div>
          <button onClick={() => navigate('/admin/tiket')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('tiket') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>🎧 Tiket Support</button>
          <button onClick={() => navigate('/admin/blog')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('blog') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>📝 Artikel & Blog</button>
          <button onClick={() => navigate('/admin/pengaturan')} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isActive('pengaturan') ? 'text-white bg-blue-600/20 border-l-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800 border-l-4 border-transparent'}`}>⚙️ Pengaturan Web</button>
        </nav>
        <div className="p-6 border-t border-slate-800/50"><button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center">← Keluar (Log Out)</button></div>
      </aside>
      <div className="flex-1 p-10 overflow-y-auto relative">
        {isActive('dasbor') && renderDashboard()}
        {isActive('mooc') && renderManajemenMOOC()}
        {isActive('pengguna') && renderPengguna()}
        {isActive('ebook') && renderEbook()}
        {isActive('keuangan') && renderKeuangan()}
        {isActive('tiket') && renderTiket()}
        {isActive('blog') && renderBlog()}
        {isActive('pengaturan') && renderPengaturan()}
      </div>
    </div>
  );
};

// --- WIZARD COURSE BUILDER ---
// --- WIZARD COURSE BUILDER DENGAN AI GENERATOR ---
const CourseBuilderWizard = ({ onGoBack, onAddCourse }) => {
  const [step, setStep] = useState(1);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [courseData, setCourseData] = useState({  
    title: '',  
    category: 'AKUNTANSI',  
    customCategory: '',  
    price: '',  
    description: '',
    trailerUrl: '',  
    learningPoints: ''
  });

  // --- FUNGSI AI AUTO-GENERATE MODUL ---
  const handleAutoGenerateByAI = async () => {
    const topic = prompt("Masukkan topik atau mata kuliah yang ingin dibuatkan AI secara otomatis:");
    if (!topic) return;

    setIsAiGenerating(true);
    alert(`🤖 AI sedang meriset kurikulum untuk topik "${topic}", silakan tunggu sebentar...`);

    const GEMINI_API_KEY = "";
    const promptText = `
      Bertindaklah sebagai profesor ahli kurikulum universitas. Buatlah sebuah modul kursus e-learning mengenai topik: "${topic}".
      Berikan hasil dalam format JSON murni TANPA markdown block (tanpa backtick json), dengan struktur berikut:
      {
        "title": "Judul Modul Kursus",
        "category": "Kategori (AKUNTANSI/MANAJEMEN/LOGISTIK/HUKUM)",
        "description": "Deskripsi lengkap modul (2 paragraf).",
        "learningPoints": "Poin 1\\nPoin 2\\nPoin 3",
        "priceValue": 50000
      }
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
      let textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (textResult) {
        textResult = textResult.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
        const aiCourse = JSON.parse(textResult);

        setCourseData({
          ...courseData,
          title: aiCourse.title,
          category: aiCourse.category || 'AKUNTANSI',
          description: aiCourse.description,
          learningPoints: aiCourse.learningPoints,
          price: aiCourse.priceValue
        });
        alert(`✨ Berhasil! AI telah merancang modul "${aiCourse.title}". Silakan periksa dan lanjut ke langkah berikutnya!`);
      }
    } catch (err) {
      alert("Gagal menghasilkan konten otomatis oleh AI. Periksa koneksi internet Anda.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const [sections, setSections] = useState([
    {  
      id: 'sec-1',  
      title: 'Bagian 1: Pengantar & Landasan Teori',  
      lessons: [
        { id: 'les-1', title: 'Video Pembelajaran: Ruang Lingkup Materi', type: 'youtube', link: '[https://www.youtube.com](https://www.youtube.com)', icon: '▶️', color: 'text-rose-500' },
        { id: 'les-2', title: 'Modul PDF: Ringkasan Materi Pokok', type: 'pdf', fileName: 'Modul_01.pdf', icon: '📄', color: 'text-blue-500' },
        { id: 'les-3', title: 'Asesmen 1: Evaluasi & Tugas Mandiri', type: 'assignment', desc: 'Selesaikan studi kasus transaksi dan unggah hasilnya.', passingGrade: 75, icon: '📋', color: 'text-emerald-500' }
      ]  
    }
  ]);
  const [draggedLesson, setDraggedLesson] = useState(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);

  const [lessonForm, setLessonForm] = useState({
    title: '',
    type: 'youtube',
    link: '',
    fileName: '',
    desc: '',
    passingGrade: 75
  });

  const handleAddSection = () => setSections([...sections, { id: `sec-${Date.now()}`, title: `Bagian ${sections.length + 1}: Topik Perkuliahan Baru`, lessons: [] }]);
  
  const openLessonModal = (sectionId) => {  
    setActiveSectionId(sectionId);  
    setLessonForm({ title: '', type: 'youtube', link: '', fileName: '', desc: '', passingGrade: 75 });  
    setIsLessonModalOpen(true);  
  };

  const submitLesson = () => {
    if(!lessonForm.title.trim()) return alert("Judul materi atau asesmen wajib diisi!");
    
    let icon = '📄';  
    let color = 'text-blue-500';

    if(lessonForm.type === 'youtube' || lessonForm.type === 'video') { icon = '▶️'; color = 'text-rose-500'; }
    else if(lessonForm.type === 'pdf' || lessonForm.type === 'doc') { icon = '📄'; color = 'text-indigo-500'; }
    else if(lessonForm.type === 'quiz') { icon = '📝'; color = 'text-amber-500'; }
    else if(lessonForm.type === 'assignment') { icon = '📋'; color = 'text-emerald-500'; }

    const newLessonObj = {
      id: `les-${Date.now()}`,
      title: lessonForm.title,
      type: lessonForm.type,
      link: lessonForm.link,
      fileName: lessonForm.fileName || 'Berkas_Materi.pdf',
      desc: lessonForm.desc,
      passingGrade: lessonForm.passingGrade,
      icon,
      color
    };

    setSections(sections.map(sec =>  
      sec.id === activeSectionId  
        ? { ...sec, lessons: [...sec.lessons, newLessonObj] }  
        : sec
    ));
    setIsLessonModalOpen(false);
  };

  const handleDeleteLesson = (sectionId, lessonId) => { if(window.confirm("Hapus materi ini?")) setSections(sections.map(sec => sec.id === sectionId ? { ...sec, lessons: sec.lessons.filter(l => l.id !== lessonId) } : sec)); };
  const handleDragStart = (e, sectionId, lessonIndex) => { setDraggedLesson({ sectionId, lessonIndex }); };
  const handleDragOver = (e) => { e.preventDefault(); };
  const handleDrop = (e, targetSectionId, targetLessonIndex) => {
    e.preventDefault();
    if (!draggedLesson) return;
    const newSections = JSON.parse(JSON.stringify(sections));
    const sourceSection = newSections.find(s => s.id === draggedLesson.sectionId);
    const targetSection = newSections.find(s => s.id === targetSectionId);
    const [movedLesson] = sourceSection.lessons.splice(draggedLesson.lessonIndex, 1);
    if (targetLessonIndex === undefined) targetSection.lessons.push(movedLesson); else targetSection.lessons.splice(targetLessonIndex, 0, movedLesson);
    setSections(newSections);
    setDraggedLesson(null);
  };

  const handleFinalSubmit = async () => {
    if (!courseData.title.trim()) {
      alert("Harap isi Judul Modul di Tahap 1 terlebih dahulu!");
      setStep(1);
      return;
    }

    const finalCategory = courseData.category === 'Lainnya (Ketik Sendiri)' 
      ? (courseData.customCategory.trim().toUpperCase() || 'UMUM') 
      : courseData.category;

    const payload = {
      title: courseData.title,
      category: finalCategory,
      description: courseData.description,
      trailerUrl: courseData.trailerUrl,
      learningPoints: courseData.learningPoints,
      sections: sections,
      instructor: 'Rei, S.E., M.Ak.',
      price_value: Number(courseData.price || 0),
      status: 'In Review',
      duration: `${sections.length * 2}:00:00`
    };

    if (onAddCourse) {
      await onAddCourse(payload);
    }

    alert(`Modul "${courseData.title}" berhasil diajukan dan disimpan lengkap dengan Kurikulum & Asesmen! Statusnya saat ini "In Review" menunggu persetujuan Admin.`);
    onGoBack();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
        {[
          { num: 1, label: 'Informasi' },
          { num: 2, label: 'Kurikulum & Asesmen' },
          { num: 3, label: 'Review & Publish' }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${step === s.num ? 'bg-teal-600 text-white' : step > s.num ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{step > s.num ? '✓' : s.num}</div>
            <span className={`text-xs font-bold ${step === s.num ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-black text-slate-900">Informasi Dasar Modul</h2>
            <button 
              type="button" 
              onClick={handleAutoGenerateByAI}
              disabled={isAiGenerating}
              className="py-2.5 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1.5 disabled:opacity-50"
            >
              {isAiGenerating ? '🤖 Meriset...' : '✨ Auto-Generate by AI'}
            </button>
          </div>

          <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cover / Thumbnail Modul</label><input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-teal-50 file:text-teal-700 font-medium border border-slate-200 rounded-xl p-3" /></div>
          <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Judul Modul</label><input type="text" value={courseData.title} onChange={e => setCourseData({...courseData, title: e.target.value})} placeholder="Contoh: Pengantar Hukum Perdata" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kategori</label>
              <select value={courseData.category} onChange={e => setCourseData({...courseData, category: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 mb-3">
                <option value="AKUNTANSI">Akuntansi</option><option value="MANAJEMEN">Manajemen</option><option value="LOGISTIK">Logistik</option>
                <option value="HUKUM">Hukum</option>
                <option value="Lainnya (Ketik Sendiri)">Lainnya (Ketik Sendiri)</option>
              </select>
              {courseData.category === 'Lainnya (Ketik Sendiri)' && (
                <input type="text" value={courseData.customCategory} onChange={e => setCourseData({...courseData, customCategory: e.target.value.toUpperCase()})} placeholder="Contoh: PARIWISATA" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500" />
              )}
            </div>
            <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Harga (Rp)</label><input type="number" value={courseData.price} onChange={e => setCourseData({...courseData, price: e.target.value})} placeholder="0 (Gratis) / 250000" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500" /></div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Video Overview / Pengantar Modul (Link YouTube)</label>
            <input 
              type="url" 
              value={courseData.trailerUrl} 
              onChange={e => setCourseData({...courseData, trailerUrl: e.target.value})} 
              placeholder="[https://www.youtube.com/watch?v=](https://www.youtube.com/watch?v=)..." 
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 font-medium text-sm" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Deskripsi Singkat</label>
            <textarea rows="3" value={courseData.description} onChange={e => setCourseData({...courseData, description: e.target.value})} placeholder="Penjelasan singkat modul perkuliahan..." className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500"></textarea>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Poin-poin yang Akan Dipelajari (Pisahkan per baris)</label>
            <textarea 
              rows="3" 
              value={courseData.learningPoints} 
              onChange={e => setCourseData({...courseData, learningPoints: e.target.value})} 
              placeholder="Dasar-Dasar Hukum Perdata&#10;Subjek dan Objek Hukum&#10;Hukum Perjanjian dan Perikatan" 
              className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 font-medium text-sm"
            ></textarea>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button onClick={onGoBack} className="text-slate-500 font-bold hover:underline">Batalkan</button>
            <button onClick={() => setStep(2)} className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition">Lanjut ke Kurikulum & Asesmen →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 mb-2 text-center">Kurikulum & Asesmen Pembelajaran</h2>
          <p className="text-xs text-slate-500 text-center mb-6">Tarik icon ⠿ untuk memindahkan materi. Tambahkan video YouTube, berkas bahan ajar, serta kuis/tugas langsung per pertemuan.</p>
          {sections.map((section) => (
            <div key={section.id} className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <input 
                  type="text" 
                  value={section.title} 
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setSections(sections.map(s => s.id === section.id ? { ...s, title: newTitle } : s));
                  }} 
                  className="font-bold text-slate-800 bg-transparent outline-none focus:bg-white px-2 py-1 rounded text-sm w-2/3" 
                />
                <button onClick={() => openLessonModal(section.id)} className="bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition">
                  <span>+</span> Tambah Materi / Asesmen
                </button>
              </div>
              <div className="space-y-2">
                {section.lessons.map((lesson, idx) => (
                  <div key={lesson.id} draggable onDragStart={(e) => handleDragStart(e, section.id, idx)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, section.id, idx)} className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl cursor-move shadow-sm hover:border-teal-500 transition">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-black">⠿</span>
                      <span>{lesson.icon}</span>
                      <div>
                        <span className="text-sm font-semibold text-slate-800">{lesson.title}</span>
                        {lesson.type === 'youtube' && <span className="block text-[10px] text-rose-500 font-bold">Link: {lesson.link || 'Terhubung'}</span>}
                        {(lesson.type === 'pdf' || lesson.type === 'doc') && <span className="block text-[10px] text-indigo-500 font-bold">File: {lesson.fileName}</span>}
                        {(lesson.type === 'quiz' || lesson.type === 'assignment') && <span className="block text-[10px] text-emerald-600 font-bold">Asesmen Terintegrasi • Passing Grade: {lesson.passingGrade || 75}%</span>}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteLesson(section.id, lesson.id)} className="text-rose-500 text-xs font-bold hover:underline">HAPUS</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleAddSection} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl font-bold text-slate-500 hover:border-teal-500 hover:text-teal-600 transition">+ Tambah Bagian Baru</button>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button onClick={() => setStep(1)} className="text-slate-500 font-bold hover:underline">← Kembali</button>
            <button onClick={() => setStep(3)} className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition">Lanjut ke Review & Publish →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12 space-y-6">
          <div className="text-6xl animate-bounce">🚀</div>
          <h2 className="text-3xl font-black text-slate-900">Siap untuk dipublikasikan?</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">Modul <strong className="text-slate-800">{courseData.title || 'Modul Baru'}</strong> akan masuk ke status <strong>"In Review"</strong> di tab Course Saya dan akan diperiksa oleh Admin sebelum tampil di Katalog Publik.</p>
          <div className="pt-4 flex justify-center gap-4">
            <button onClick={() => setStep(2)} className="px-6 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100">← Kembali</button>
            <button onClick={handleFinalSubmit} className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-xl font-extrabold text-base shadow-lg shadow-teal-600/30 transition transform hover:-translate-y-0.5">Submit for Review</button>
          </div>
        </div>
      )}

      {isLessonModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-black text-lg text-slate-900">Tambah Sesi Pembelajaran / Asesmen</h3>
              <button onClick={() => setIsLessonModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Judul Sesi</label>
              <input type="text" value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} placeholder="Contoh: Video Pembahasan Kasus" className="w-full p-3 border rounded-xl font-semibold text-sm outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Tipe Sesi</label>
              <select value={lessonForm.type} onChange={e => setLessonForm({...lessonForm, type: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50 font-semibold text-sm outline-none focus:border-teal-500">
                <option value="youtube">Video YouTube (Link)</option>
                <option value="pdf">Dokumen Bacaan (PDF / Slide / Word)</option>
                <option value="quiz">Kuis Interaktif (Mandiri)</option>
                <option value="assignment">Tugas Asesmen (Upload Berkas)</option>
              </select>
            </div>

            {lessonForm.type === 'youtube' && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 space-y-1">
                <label className="text-xs font-bold text-rose-800 block">URL / Link Video YouTube</label>
                <input type="url" value={lessonForm.link} onChange={e => setLessonForm({...lessonForm, link: e.target.value})} placeholder="[https://www.youtube.com/watch?v=](https://www.youtube.com/watch?v=)..." className="w-full p-2.5 bg-white border border-rose-200 rounded-lg text-xs font-semibold outline-none" />
              </div>
            )}

            {lessonForm.type === 'pdf' && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 space-y-1">
                <label className="text-xs font-bold text-blue-800 block">Pilih Berkas Dokumen (PDF / PPT / Word)</label>
                <input type="file" onChange={e => { const f = e.target.files[0]; if (f) setLessonForm({...lessonForm, fileName: f.name}); }} className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white font-bold cursor-pointer" />
              </div>
            )}

            {(lessonForm.type === 'quiz' || lessonForm.type === 'assignment') && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
                <div>
                  <label className="text-xs font-bold text-emerald-800 block mb-1">Instruksi Asesmen</label>
                  <textarea rows="2" value={lessonForm.desc} onChange={e => setLessonForm({...lessonForm, desc: e.target.value})} placeholder="Tulis instruksi pengerjaan..." className="w-full p-2 bg-white border border-emerald-200 rounded-lg text-xs outline-none"></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-800 block mb-1">Passing Grade (%)</label>
                  <input type="number" value={lessonForm.passingGrade} onChange={e => setLessonForm({...lessonForm, passingGrade: Number(e.target.value)})} className="w-full p-2 bg-white border border-emerald-200 rounded-lg text-xs font-bold text-emerald-700 outline-none" />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button onClick={() => setIsLessonModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 font-bold rounded-xl text-slate-600 text-sm hover:bg-slate-200">Batal</button>
              <button onClick={submitLesson} className="flex-1 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-sm hover:bg-teal-700 shadow">Tambahkan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PORTAL INSTRUKTUR UTUH LENGKAP DENGAN PENILAIAN ESAI ---
const InstructorLayout = ({ instructorProfile, setInstructorProfile, courses, onAddCourse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);

  const instructorCourses = courses || initialCourses;
  const [activeTab, setActiveTab] = useState('courses');
  const [isBuildingCourse, setIsBuildingCourse] = useState(false);
  const [activeSettingTab, setActiveSettingTab] = useState('profil');
  const [tempProfile, setTempProfile] = useState(instructorProfile);

  const [materials, setMaterials] = useState([
    { id: 1, title: 'Modul Teori Siklus Akuntansi.pdf', type: 'PDF', size: '2.4 MB', course: 'Akuntansi Perusahaan Dagang', date: '01 Sep 2026' },
    { id: 2, title: 'Slide Presentasi Jurnal Khusus.pptx', type: 'PPT', size: '8.1 MB', course: 'Akuntansi Perusahaan Dagang', date: '03 Sep 2026' },
    { id: 3, title: 'Template Kertas Kerja Neraca Lajur.xlsx', type: 'Excel', size: '1.2 MB', course: 'Akuntansi Perusahaan Dagang', date: '05 Sep 2026' }
  ]);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [materialForm, setMaterialForm] = useState({ title: '', type: 'PDF', course: 'Akuntansi Perusahaan Dagang' });

  const [assessments, setAssessments] = useState([
    { id: 1, title: 'Kuis Evaluasi Modul 1: Jurnal Khusus', type: 'Pilihan Ganda', questionsCount: 15, duration: '30 Menit', passingGrade: 75 },
    { id: 2, title: 'Tugas Kasus: Penyusunan Neraca Lajur PT Mandiri', type: 'Upload Berkas', questionsCount: 1, duration: '7 Hari', passingGrade: 80 }
  ]);

  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [inputScore, setInputScore] = useState('');
  const [inputFeedback, setInputFeedback] = useState('');

  useEffect(() => {
    const savedSubs = JSON.parse(localStorage.getItem('lubisa_submissions') || '[]');
    setSubmissions(savedSubs);
  }, []);

  const handleGradeSubmission = (subId) => {
    if (!inputScore) return alert("Masukkan nilai angka terlebih dahulu!");
    const updated = submissions.map(s => s.id === subId ? { ...s, score: Number(inputScore), feedback: inputFeedback } : s);
    setSubmissions(updated);
    localStorage.setItem('lubisa_submissions', JSON.stringify(updated));
    alert("Penilaian dan umpan balik berhasil disimpan!");
    setSelectedSubmission(null);
  };

  const [studentsList, setStudentsList] = useState([
    { id: 101, name: 'Ahmad Budi', email: 'ahmad@kampus.ac.id', course: 'Akuntansi Perusahaan Dagang', progress: 100, score: 92, status: 'Lulus' },
    { id: 102, name: 'Siti Nurhaliza', email: 'siti@kampus.ac.id', course: 'Akuntansi Perusahaan Dagang', progress: 65, score: 78, status: 'Belajar' },
    { id: 103, name: 'Budi Santoso', email: 'budi.s@kampus.ac.id', course: 'Akuntansi Perusahaan Dagang', progress: 30, score: 0, status: 'Belajar' }
  ]);

  const [liveSessions, setLiveSessions] = useState([
    { id: 1, topic: 'Bedah Kasus Laporan Keuangan Akhir Periode', date: '18 Sep 2026', time: '19:30 WIB', platform: 'Zoom Meeting', link: 'https://zoom.us/j/998822' }
  ]);

  const handleDeleteItem = (setState, stateArray, id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setState(stateArray.filter(item => item.id !== id));
    }
  };

  const handleSaveMaterial = () => {
    if (!materialForm.title.trim()) return alert("Nama materi wajib diisi!");
    const newEntry = {
      id: Date.now(),
      title: materialForm.title,
      type: materialForm.type,
      size: '3.5 MB',
      course: materialForm.course,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setMaterials([newEntry, ...materials]);
    setIsMaterialModalOpen(false);
    setMaterialForm({ title: '', type: 'PDF', course: 'Akuntansi Perusahaan Dagang' });
    alert("Berkas materi berhasil ditambahkan ke pustaka!");
  };

  const handleSaveProfile = () => {
    setInstructorProfile(tempProfile);
    alert("Profil publik instruktur berhasil diperbarui!");
  };

  const renderDashboard = () => (
    <>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Overview Kinerja Instruktur</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Tren Pendaftaran Siswa Saya (6 Bulan Terakhir)</h3>
          <div className="flex items-end gap-3 h-48">
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[30%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Apr</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[45%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Mei</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[60%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Jun</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[55%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Jul</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[80%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Agu</span></div>
            <div className="flex-1 bg-teal-50 rounded-t-lg relative group h-[100%]"><div className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg h-full"></div><span className="absolute -bottom-6 w-full text-center text-xs font-bold text-slate-400">Sep</span></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">TOTAL SISWA</p><p className="text-4xl font-extrabold text-slate-900">{studentsList.length * 42}</p></div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">COURSE AKTIF</p><p className="text-4xl font-extrabold text-slate-900">{instructorCourses.length}</p></div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">RATA-RATA RATING</p><p className="text-3xl font-extrabold text-slate-900">4.9 <span className="text-amber-500">★</span></p></div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center"><p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">ESTIMASI BAGI HASIL</p><p className="text-2xl font-extrabold text-teal-600">Rp 5.120.000</p></div>
        </div>
      </div>
    </>
  );

  const renderCourseSaya = () => {
    let filtered = instructorCourses;
    if (activeTab === 'published') filtered = instructorCourses.filter(c => c.status === 'Published');
    if (activeTab === 'inreview') filtered = instructorCourses.filter(c => c.status === 'In Review');

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Course Saya</h1>
          <button onClick={() => setIsBuildingCourse(true)} className="bg-teal-600 text-white px-5 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Buat Modul</button>
        </div>
        <div className="flex space-x-2 border-b border-slate-200 mb-6">
          <button onClick={() => setActiveTab('courses')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'courses' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Semua Course</button>
          <button onClick={() => setActiveTab('inreview')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'inreview' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>In Review <span className="ml-2 bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[10px]">{instructorCourses.filter(c => c.status === 'In Review').length}</span></button>
          <button onClick={() => setActiveTab('published')} className={`py-3 px-6 font-bold text-sm border-b-2 transition-colors ${activeTab === 'published' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Published</button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                <tr><th className="px-6 py-4 font-bold">JUDUL MODUL</th><th className="px-6 py-4 font-bold">KATEGORI</th><th className="px-6 py-4 font-bold">STATUS</th><th className="px-6 py-4 font-bold">HARGA</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(course => (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-6 py-5 font-bold text-slate-800">{course.title}</td>
                    <td className="px-6 py-5"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-bold">{course.category}</span></td>
                    <td className="px-6 py-5"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${course.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{course.status}</span></td>
                    <td className="px-6 py-5 font-bold text-slate-900">{course.new_price || course.newPrice || (course.price_value ? `Rp${course.price_value.toLocaleString('id-ID')}` : 'Gratis')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const renderMaterials = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Library Materi & E-Book</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola dokumen pedoman, slide, dan lembar kerja yang disematkan ke modul pembelajaran.</p>
        </div>
        <button onClick={() => setIsMaterialModalOpen(true)} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Unggah Dokumen</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">NAMA FILE</th>
              <th className="px-6 py-4 font-bold">FORMAT</th>
              <th className="px-6 py-4 font-bold">KURSUS TERKAIT</th>
              <th className="px-6 py-4 font-bold">UKURAN</th>
              <th className="px-6 py-4 font-bold text-center">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materials.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800">📄 {m.title}</td>
                <td className="px-6 py-4"><span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded text-xs font-bold">{m.type}</span></td>
                <td className="px-6 py-4 text-xs text-slate-500">{m.course}</td>
                <td className="px-6 py-4 text-xs">{m.size}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button onClick={() => alert(`Mengunduh berkas: ${m.title}`)} className="text-teal-600 font-bold hover:underline">Unduh</button>
                  <button onClick={() => handleDeleteItem(setMaterials, materials, m.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderVideos = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Video Pembelajaran Terintegrasi</h1>
          <p className="text-sm text-slate-500 mt-1">Daftar rekaman video perkuliahan dan link streaming.</p>
        </div>
        <button onClick={() => alert("Membuka dialog tambah URL YouTube / Vimeo...")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Sambungkan Video</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Pengantar Dokumen Sumber Transaksi Dagang", duration: "08:15", status: "Terhubung (YouTube)", views: 240 },
          { title: "Posting Buku Besar Pembantu Piutang", duration: "12:40", status: "Terhubung (YouTube)", views: 185 },
          { title: "Penyusunan Laporan Laba Rugi Komprehensif", duration: "15:20", status: "Terhubung (LMS Storage)", views: 160 }
        ].map((v, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 space-y-3">
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-3xl text-white cursor-pointer hover:bg-slate-800 transition">
              ▶️
            </div>
            <h4 className="font-bold text-slate-800 text-sm leading-snug">{v.title}</h4>
            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>⏱️ {v.duration}</span>
              <span>👁️ {v.views} tayangan</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderAssessments = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Assessment & Review Jawaban Siswa</h1>
          <p className="text-sm text-slate-500 mt-1">Evaluasi hasil pengerjaan kuis dan periksa lembar jawaban esai mahasiswa.</p>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📥</span> Lembar Jawaban Esai Mahasiswa ({submissions.length})
        </h3>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">NAMA MAHASISWA</th>
                <th className="px-6 py-4 font-bold">MATA KULIAH & TUGAS</th>
                <th className="px-6 py-4 font-bold">WAKTU SUBMIT</th>
                <th className="px-6 py-4 font-bold">NILAI</th>
                <th className="px-6 py-4 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">
                    <p>{sub.studentName}</p>
                    <p className="text-xs text-slate-400 font-normal">{sub.studentEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <p className="font-bold text-slate-700">{sub.courseTitle}</p>
                    <p className="text-slate-400">{sub.assessmentTitle}</p>
                  </td>
                  <td className="px-6 py-4 text-xs">{sub.submittedAt}</td>
                  <td className="px-6 py-4 font-extrabold">
                    {sub.score !== null ? (
                      <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">{sub.score} / 100</span>
                    ) : (
                      <span className="text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-xs">Belum Dinilai</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedSubmission(sub);
                        setInputScore(sub.score !== null ? sub.score : '');
                        setInputFeedback(sub.feedback || '');
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow"
                    >
                      Buka & Nilai ✍️
                    </button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400 font-medium">
                    Belum ada penyerahan tugas esai dari mahasiswa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black text-teal-600 uppercase tracking-widest block mb-1">Pemeriksaan Esai Mahasiswa</span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedSubmission.assessmentTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">Mahasiswa: <strong>{selectedSubmission.studentName}</strong> • {selectedSubmission.courseTitle}</p>
              </div>
              <button onClick={() => setSelectedSubmission(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Jawaban Mahasiswa:</label>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {selectedSubmission.answerText}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Berikan Nilai (0 - 100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={inputScore}
                  onChange={(e) => setInputScore(e.target.value)}
                  placeholder="Contoh: 85"
                  className="w-full p-3.5 rounded-xl border border-slate-200 font-bold text-slate-800 outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Catatan / Umpan Balik Dosen:</label>
                <input
                  type="text"
                  value={inputFeedback}
                  onChange={(e) => setInputFeedback(e.target.value)}
                  placeholder="Contoh: Analisis studi kasus sangat tajam."
                  className="w-full p-3.5 rounded-xl border border-slate-200 font-medium text-slate-800 text-sm outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={() => handleGradeSubmission(selectedSubmission.id)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Simpan Penilaian Nilai 💾
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderEngagement = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Engagement & Sesi Live</h1>
          <p className="text-sm text-slate-500 mt-1">Interaksi langsung melalui jadwal webinar dan ruang asistensi perkuliahan.</p>
        </div>
        <button onClick={() => alert("Membuka form penambahan jadwal Live Class...")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">+ Jadwalkan Sesi</button>
      </div>

      <div className="space-y-6">
        {liveSessions.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div className="space-y-1">
              <span className="bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">🔴 Live Class</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{s.topic}</h3>
              <p className="text-sm text-slate-500">📅 {s.date} • ⏰ {s.time} via {s.platform}</p>
            </div>
            <a href={s.link} target="_blank" rel="noopener noreferrer" className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:bg-teal-700 transition">
              Buka Tautan Zoom 🚀
            </a>
          </div>
        ))}
      </div>
    </>
  );

  const renderStudents = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Pemantauan Peserta</h1>
          <p className="text-sm text-slate-500 mt-1">Daftar mahasiswa terdaftar, progres materi, dan evaluasi capaian belajar.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">NAMA MAHASISWA</th>
              <th className="px-6 py-4 font-bold">MODUL</th>
              <th className="px-6 py-4 font-bold">PROGRES</th>
              <th className="px-6 py-4 font-bold">NILAI AKHIR</th>
              <th className="px-6 py-4 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {studentsList.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-800"><p>{s.name}</p><p className="text-xs text-slate-400 font-normal">{s.email}</p></td>
                <td className="px-6 py-4 text-xs">{s.course}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full" style={{ width: `${s.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-extrabold text-slate-800">{s.score > 0 ? s.score : '-'}</td>
                <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${s.status === 'Lulus' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderMonetization = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Monetisasi & Riwayat Payout</h1>
          <p className="text-sm text-slate-500 mt-1">Laporan pendapatan penjualan modul dan pengajuan penarikan dana.</p>
        </div>
        <button onClick={() => alert("Pengajuan penarikan dana (Payout) telah dikirim ke bagian Keuangan!")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">Tarik Saldo (Payout)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">TOTAL SALDO TERSEDIA</p><p className="text-3xl font-extrabold text-teal-600">Rp 5.120.000</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">TOTAL DITARIK (LIFETIME)</p><p className="text-3xl font-extrabold text-slate-900">Rp 14.800.000</p></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">REKENING TERDAFTAR</p><p className="text-base font-extrabold text-slate-800 mt-2">Bank Mandiri •• 9012</p></div>
      </div>
    </>
  );

  const renderCertificateSettings = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manajemen Template Sertifikat</h1>
          <p className="text-sm text-slate-500 mt-1">Atur kriteria kelulusan dan penomoran otomatis ber-QR code.</p>
        </div>
        <button onClick={() => alert("Pengaturan parameter sertifikat disimpan!")} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow hover:bg-teal-700 transition">Simpan Format</button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Format Nomor Sertifikat</label>
          <input type="text" defaultValue="LuBisa.id-CERT/{YEAR}/{ID}" className="w-full p-4 rounded-xl border border-slate-200 font-semibold" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div><h4 className="font-bold text-slate-800">Verifikasi QR Code Publik</h4><p className="text-xs text-slate-500">Tampilkan halaman verifikasi autentisitas saat QR di-scan.</p></div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-teal-600" />
        </div>
      </div>
    </>
  );

  const renderPengaturan = () => {
    return (
      <div className="max-w-4xl mx-auto pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Pengaturan Akun Instruktur</h1>
          <button onClick={handleSaveProfile} className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:bg-teal-700 transition-colors">Simpan Profil</button>
        </div>
        <div className="flex space-x-8 border-b border-slate-200 mb-8">
          <button onClick={() => setActiveSettingTab('profil')} className={`pb-3 font-bold text-sm border-b-2 transition-colors ${activeSettingTab === 'profil' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Profil Publik</button>
          <button onClick={() => setActiveSettingTab('rekening')} className={`pb-3 font-bold text-sm border-b-2 transition-colors ${activeSettingTab === 'rekening' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Rekening Payout</button>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {activeSettingTab === 'profil' && (
            <>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Lengkap & Gelar</label><input type="text" value={tempProfile.name} onChange={e => setTempProfile({...tempProfile, name: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Jabatan / Afiliasi Kampus</label><input type="text" value={tempProfile.title} onChange={e => setTempProfile({...tempProfile, title: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Bio Singkat Pengajar</label><textarea value={tempProfile.bio} onChange={e => setTempProfile({...tempProfile, bio: e.target.value})} className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 font-semibold h-28 resize-none"></textarea></div>
            </>
          )}
          {activeSettingTab === 'rekening' && (
            <>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Bank Penerima</label><input type="text" defaultValue="Bank Mandiri" className="w-full p-4 rounded-xl border border-slate-200 outline-none font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nomor Rekening</label><input type="text" defaultValue="157-00-0982736-1" className="w-full p-4 rounded-xl border border-slate-200 outline-none font-semibold" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nama Pemilik Rekening</label><input type="text" defaultValue="Rei" className="w-full p-4 rounded-xl border border-slate-200 outline-none font-semibold" /></div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#FAFAFF] font-sans">
      <aside className="w-64 bg-[#0B1B1A] text-slate-300 flex flex-col shrink-0 shadow-xl z-20">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-2xl font-serif font-bold text-white mb-1 block tracking-tight">LuBisa.id<span className="text-teal-400">Instruktur</span></Link>
          <div className="text-[9px] font-bold text-teal-500/70 uppercase tracking-widest mt-1">Instructor Portal</div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/dasbor'); }} className={`w-full text-left flex items-center px-6 py-3.5 font-bold text-sm transition-colors ${isActive('dasbor') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📈 Dashboard</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/courses'); setActiveTab('courses'); }} className={`w-full text-left flex items-center px-6 py-3.5 font-bold text-sm transition-colors ${isActive('courses') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📚 Course Saya</button>
          <button onClick={() => setIsBuildingCourse(true)} className={`w-full text-left flex items-center px-6 py-3 font-semibold text-sm transition-colors ${isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-teal-400 hover:bg-white/5 border-l-4 border-transparent'}`}>➕ Buat Modul</button>

          <div className="px-6 py-4 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Library & Materi</div>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/materi'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('materi') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📁 Materi & E-Book</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/video'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('video') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>🎥 Video Pembelajaran</button>

          <div className="px-6 py-4 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Interaksi & Evaluasi</div>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/assessment'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('assessment') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📝 Assessment</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/engagement'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('engagement') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>💬 Engagement</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/peserta'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('peserta') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>👥 Peserta</button>

          <div className="px-6 py-4 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kinerja & Sistem</div>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/analytics'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('analytics') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>📊 Analytics</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/monetisasi'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('monetisasi') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>💰 Monetisasi</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/sertifikat'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('sertifikat') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>🏆 Sertifikat</button>
          <button onClick={() => { setIsBuildingCourse(false); navigate('/instruktur/pengaturan'); }} className={`w-full text-left flex items-center px-6 py-3 font-medium text-sm transition-colors ${isActive('pengaturan') && !isBuildingCourse ? 'text-teal-400 bg-teal-900/40 border-l-4 border-teal-500' : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}`}>⚙️ Pengaturan</button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center">← Keluar (Log Out)</button>
        </div>
      </aside>

      <div className="flex-1 p-10 overflow-y-auto relative">
        {isBuildingCourse ? (
          <CourseBuilderWizard onGoBack={() => setIsBuildingCourse(false)} onAddCourse={onAddCourse} />
        ) : (
          <>
            {isActive('dasbor') && renderDashboard()}
            {isActive('courses') && renderCourseSaya()}
            {isActive('materi') && renderMaterials()}
            {isActive('video') && renderVideos()}
            {isActive('assessment') && renderAssessments()}
            {isActive('engagement') && renderEngagement()}
            {isActive('peserta') && renderStudents()}
            {isActive('analytics') && renderDashboard()}
            {isActive('monetisasi') && renderMonetization()}
            {isActive('sertifikat') && renderCertificateSettings()}
            {isActive('pengaturan') && renderPengaturan()}
          </>
        )}
      </div>
    </div>
  );
};

// --- ROUTER UTAMA DENGAN GLOBAL STATE & LOCALSTORAGE ---
const App = () => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('LuBisa.id_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('LuBisa.id_enrolled');
    return saved ? JSON.parse(saved) : [initialCourses[0]];
  });

  useEffect(() => {
    localStorage.setItem('LuBisa.id_enrolled', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const handleEnrollCourse = (courseToEnroll) => {
    setEnrolledCourses(prev => {
      if (prev.some(c => String(c.id) === String(courseToEnroll.id))) return prev;
      return [courseToEnroll, ...prev];
    });
  };

  const [globalSettings, setGlobalSettings] = useState(initialSettings);
  const [instructorProfile, setInstructorProfile] = useState(initialInstructorProfile);

  useEffect(() => {
    localStorage.setItem('LuBisa.id_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        }
      })
      .catch(() => {
        console.log('Menggunakan database lokal tersimpan (LocalStorage).');
      });
  }, []);

  const handleAddCourse = async (newCourseData) => {
    const newEntry = {
      id: Date.now(),
      category: newCourseData.category || 'UMUM',
      title: newCourseData.title,
      description: newCourseData.description,
      trailerUrl: newCourseData.trailerUrl,
      learningPoints: newCourseData.learningPoints,
      sections: newCourseData.sections || [],
      instructor: newCourseData.instructor || 'Rei, S.E., M.Ak.',
      rating: '5.0',
      reviews: 0,
      lessons: newCourseData.sections ? newCourseData.sections.length : 1,
      duration: newCourseData.duration || '02:00:00',
      old_price: newCourseData.price_value > 0 ? `Rp${(Number(newCourseData.price_value) * 1.5).toLocaleString('id-ID')}` : 'Rp100.000',
      new_price: newCourseData.price_value > 0 ? `Rp${Number(newCourseData.price_value).toLocaleString('id-ID')}` : 'Gratis',
      price_value: Number(newCourseData.price_value || 0),
      color: 'from-teal-500 to-emerald-600',
      icon: '📚',
      status: 'In Review',
      students: 0
    };

    setCourses(prev => [newEntry, ...prev]);

    try {
      await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
    } catch (e) {
      console.warn('API sync tertunda, data tersimpan aman di browser.');
    }
  };

  const handleApproveCourse = async (courseId) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'Published' } : c));

    try {
      await fetch('/api/courses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: courseId, status: 'Published' })
      });
    } catch (e) {
      console.warn('API sync tertunda.');
    }

    alert('Modul disetujui! Status kini Published dan tampil di Katalog Siswa.');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home settings={globalSettings} courses={courses} />} />
        <Route path="/katalog" element={<Catalog settings={globalSettings} courses={courses} />} />
        <Route path="/artikel" element={<PublicArticleList settings={globalSettings} />} />
        <Route path="/detail/:id" element={<CourseDetail settings={globalSettings} instructorProfile={instructorProfile} courses={courses} onEnroll={handleEnrollCourse} />} />
        <Route path="/login" element={<Login settings={globalSettings} />} />
        <Route path="/dasbor" element={<Dashboard settings={globalSettings} courses={courses} enrolledCourses={enrolledCourses} />} />
        <Route path="/belajar" element={<LearningRoom enrolledCourses={enrolledCourses} courses={courses} />} />
        <Route path="/belajar/:id" element={<LearningRoom enrolledCourses={enrolledCourses} courses={courses} />} />
        <Route path="/asesmen" element={<Assessment />} />
        <Route path="/sertifikat" element={<Certificate />} />
        <Route path="/admin/*" element={<AdminLayout settings={globalSettings} setSettings={setGlobalSettings} courses={courses} onApproveCourse={handleApproveCourse} />} />
        <Route path="/instruktur/*" element={<InstructorLayout instructorProfile={instructorProfile} setInstructorProfile={setInstructorProfile} courses={courses} onAddCourse={handleAddCourse} />} />

        <Route path="/bantuan" element={<SupportPage settings={globalSettings} type="faq" />} />
        <Route path="/syarat" element={<SupportPage settings={globalSettings} type="terms" />} />
        <Route path="/privasi" element={<SupportPage settings={globalSettings} type="privacy" />} />
      </Routes>
    </Router>
  );
};

export default App;