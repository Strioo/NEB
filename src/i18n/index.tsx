import { createSignal, createContext, useContext, ParentComponent, Accessor } from 'solid-js';

export type Language = 'id' | 'en';

export interface Translations {
  // Navbar
  nav: {
    home: string;
    services: string;
    tutorial: string;
    contact: string;
    login: string;
    startFree: string;
  };
  // Hero Section
  hero: {
    badge: string;
    badgeText: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  // Main Service Section
  mainService: {
    label: string;
    title: string;
    description: string;
    cta: string;
    learnMore: string;
    demoStatus: string;
    feature1: string;
    feature1Desc: string;
    feature2: string;
    feature2Desc: string;
    feature3: string;
    feature3Desc: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
  };
  // Benefits Section
  benefits: {
    instant: string;
    instantDesc: string;
    seamless: string;
    seamlessDesc: string;
    secure: string;
    secureDesc: string;
    available: string;
    availableDesc: string;
  };
  // FAQ Section
  faq: {
    title: string;
    subtitle: string;
  };
  // CTA Section
  cta: {
    title: string;
    subtitle: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  // Services Page
  services: {
    badge: string;
    title: string;
    subtitle: string;
    mainBadge: string;
    sebTagline: string;
    sebDescription: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaUpload: string;
    helpCta: string;
  };
  // Upload Page
  upload: {
    title: string;
    subtitle: string;
    redeemCodeLabel: string;
    redeemCodePlaceholder: string;
    redeemCodeError: string;
    fileNameLabel: string;
    fileNamePlaceholder: string;
    fileNameError: string;
    fileLabel: string;
    filePlaceholder: string;
    fileError: string;
    fileTypeError: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    downloadBtn: string;
    backBtn: string;
    dragDropText: string;
    orText: string;
    chooseFile: string;
    maxFileSize: string;
    supportedFormat: string;
  };
  // Tutorial Page
  tutorial: {
    title: string;
    subtitle: string;
    needHelp: string;
    needHelpDesc: string;
    contactUs: string;
    // Install Tab
    installTab: string;
    installTitle: string;
    installDesc: string;
    installStep1: string;
    installStep1Desc: string;
    installStep2: string;
    installStep2Desc: string;
    installStep3: string;
    installStep3Desc: string;
    // Redeem Tab
    redeemTab: string;
    redeemTitle: string;
    redeemDesc: string;
    redeemStep1: string;
    redeemStep1Desc: string;
    redeemStep2: string;
    redeemStep2Desc: string;
    redeemStep3: string;
    redeemStep3Desc: string;
    // Use Tab
    useTab: string;
    useTitle: string;
    useDesc: string;
    useStep1: string;
    useStep1Desc: string;
    useStep2: string;
    useStep2Desc: string;
    useStep3: string;
    useStep3Desc: string;
  };
  // Contact Page
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    nameError: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    emailInvalid: string;
    messageLabel: string;
    messagePlaceholder: string;
    messageError: string;
    messageMinLength: string;
    submitBtn: string;
    submitting: string;
    successMessage: string;
  };
  // Footer
  footer: {
    tagline: string;
    product: string;
    company: string;
    connect: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
  // FAQ Data
  faqData: {
    aboutQ: string;
    aboutA: string;
    paymentQ: string;
    paymentA: string;
    simplifyQ: string;
    simplifyA: string;
    securityQ: string;
    securityA: string;
  };
}

const indonesian: Translations = {
  nav: {
    home: 'Beranda',
    services: 'Layanan',
    tutorial: 'Tutorial',
    contact: 'Kontak',
    login: 'Masuk',
    startFree: 'Mulai Gratis',
  },
  hero: {
    badge: 'Baru',
    badgeText: 'Memperkenalkan NEB Assistant →',
    title1: 'Dapatkan jawaban',
    title2: 'dengan cepat dan aman',
    subtitle: 'Ucapkan selamat tinggal pada semua stres yang disebabkan oleh ujian. Alat canggih kami memberikan jawaban untuk semua tugas online Anda dalam hitungan detik.',
    ctaPrimary: 'Mulai gratis',
    ctaSecondary: 'Lihat tutorial',
  },
  mainService: {
    label: 'Paling Populer',
    title: 'Safe Exam Browser Bypass',
    description: 'Bypass Safe Exam Browser dengan mudah dan aman. Upload file konfigurasi SEB Anda, dan dapatkan akses langsung ke ujian tanpa batasan.',
    cta: 'Upload File Config',
    learnMore: 'Pelajari Lebih Lanjut',
    demoStatus: 'Memproses bypass...',
    feature1: 'Bypass Instan',
    feature1Desc: 'Proses file SEB dalam hitungan detik',
    feature2: 'Akses Tanpa Batas',
    feature2Desc: 'Kerjakan ujian tanpa pembatasan aplikasi',
    feature3: 'Aman & Privat',
    feature3Desc: 'Data Anda tidak disimpan di server',
    step1: 'File Uploaded',
    step1Desc: 'bypass-config.seb',
    step2: 'Processing File',
    step2Desc: 'Extracting exam URL...',
    step3: 'Access Ready',
    step3Desc: 'Waiting for completion',
  },
  benefits: {
    instant: 'Instan',
    instantDesc: 'Pengiriman hasil',
    seamless: 'Mulus',
    seamlessDesc: 'Integrasi',
    secure: 'Aman',
    secureDesc: 'Privasi utama',
    available: '24/7',
    availableDesc: 'Dukungan tersedia',
  },
  faq: {
    title: 'Pertanyaan yang Sering Diajukan',
    subtitle: 'Punya pertanyaan? Kami punya jawabannya.',
  },
  cta: {
    title: 'Siap untuk memulai?',
    subtitle: 'Bergabunglah dengan ribuan siswa yang sudah menggunakan NEB untuk meraih nilai terbaik.',
    primaryBtn: 'Mulai gratis',
    secondaryBtn: 'Hubungi kami',
  },
  services: {
    badge: 'Layanan',
    title: 'Safe Exam Browser Bypass',
    subtitle: 'Bypass SEB dan kerjakan ujian langsung di browser biasa tanpa batasan. Aman, cepat, dan mudah digunakan.',
    mainBadge: 'Populer',
    sebTagline: 'Bypass SEB dengan mudah dan aman',
    sebDescription: 'Layanan kami memungkinkan Anda untuk melewati pembatasan Safe Exam Browser dan mengerjakan ujian di browser biasa. Cukup upload file konfigurasi SEB Anda, dan kami akan memproses file tersebut sehingga Anda dapat mengakses ujian tanpa perlu menggunakan aplikasi SEB.',
    feature1Title: 'Aman & Terpercaya',
    feature1Desc: 'Proses bypass yang aman tanpa menyimpan data pribadi Anda',
    feature2Title: 'Proses Instan',
    feature2Desc: 'Hasil bypass dalam hitungan detik setelah upload file',
    feature3Title: 'Tanpa Instalasi',
    feature3Desc: 'Tidak perlu menginstall aplikasi tambahan apapun',
    howItWorksTitle: 'Cara Kerja',
    howItWorksSubtitle: 'Ikuti 3 langkah sederhana untuk bypass Safe Exam Browser',
    step1Title: 'Upload File Config',
    step1Desc: 'Upload file konfigurasi SEB (.seb) yang Anda dapatkan dari institusi',
    step2Title: 'Proses Bypass',
    step2Desc: 'Sistem kami akan memproses file dan mengekstrak URL ujian',
    step3Title: 'Akses Ujian',
    step3Desc: 'Gunakan URL yang dihasilkan untuk mengakses ujian di browser biasa',
    ctaTitle: 'Siap Bypass SEB Anda?',
    ctaSubtitle: 'Upload file konfigurasi SEB dan mulai kerjakan ujian tanpa batasan',
    ctaUpload: 'Upload File Config',
    helpCta: 'Lihat Tutorial',
  },
  upload: {
    title: 'Upload File',
    subtitle: 'Upload file konfigurasi SEB Anda dengan aman dan mudah',
    redeemCodeLabel: 'Kode Redeem',
    redeemCodePlaceholder: 'Masukkan kode redeem',
    redeemCodeError: 'Kode redeem wajib diisi',
    fileNameLabel: 'Nama File Output',
    fileNamePlaceholder: 'Masukkan nama file output',
    fileNameError: 'Nama file wajib diisi',
    fileLabel: 'File Config SEB',
    filePlaceholder: 'Pilih file .seb',
    fileError: 'File config SEB wajib diupload',
    fileTypeError: 'Hanya file dengan ekstensi .seb yang diperbolehkan',
    submitBtn: 'Upload',
    submitting: 'Memproses...',
    successTitle: 'Berhasil!',
    successMessage: 'File SEB berhasil diproses. Anda dapat menggunakan URL berikut untuk mengakses ujian.',
    errorTitle: 'Gagal',
    downloadBtn: 'Salin URL',
    backBtn: 'Upload Lagi',
    dragDropText: 'Drag & drop file di sini',
    orText: 'atau',
    chooseFile: 'Pilih File',
    maxFileSize: 'Maksimal ukuran file: 10MB',
    supportedFormat: 'Format didukung: .seb',
  },
  tutorial: {
    title: 'Tutorial & Panduan',
    subtitle: 'Pelajari cara mengatur dan menggunakan NEB dengan panduan langkah demi langkah kami.',
    needHelp: 'Butuh bantuan?',
    needHelpDesc: 'Pelajari dasar-dasar dengan Tutorial 5 menit ini',
    contactUs: 'Hubungi Kami',
    installTab: 'Instal ModHeader',
    installTitle: 'Cara Menginstal Ekstensi ModHeader',
    installDesc: 'Mulai dengan menginstal ekstensi browser ModHeader.',
    installStep1: 'Buka Chrome Web Store',
    installStep1Desc: 'Navigasi ke Chrome Web Store dan cari ekstensi "ModHeader".',
    installStep2: 'Tambahkan ke Chrome',
    installStep2Desc: 'Klik tombol "Tambahkan ke Chrome" dan konfirmasi instalasi saat diminta.',
    installStep3: 'Pin Ekstensi',
    installStep3Desc: 'Klik ikon puzzle di toolbar Chrome dan pin ModHeader untuk akses mudah.',
    redeemTab: 'Tukar Kode',
    redeemTitle: 'Cara Menukar Kode Anda',
    redeemDesc: 'Pelajari cara mengaktifkan kode akses NEB Anda.',
    redeemStep1: 'Dapatkan Kode Anda',
    redeemStep1Desc: 'Beli atau terima kode aktivasi NEB dari platform kami.',
    redeemStep2: 'Buka Dashboard NEB',
    redeemStep2Desc: 'Pergi ke dashboard akun NEB Anda dan temukan bagian "Tukar Kode".',
    redeemStep3: 'Masukkan dan Aktifkan',
    redeemStep3Desc: 'Tempel kode Anda di kolom input dan klik "Aktifkan" untuk mengaktifkan akses.',
    useTab: 'Gunakan NEB',
    useTitle: 'Cara Menggunakan NEB',
    useDesc: 'Mulai menggunakan NEB untuk ujian Anda.',
    useStep1: 'Buka ModHeader',
    useStep1Desc: 'Klik ikon ekstensi ModHeader di toolbar browser Anda.',
    useStep2: 'Aktifkan NEB',
    useStep2Desc: 'Toggle untuk mengaktifkan profil NEB yang telah dikonfigurasi.',
    useStep3: 'Mulai Ujian',
    useStep3Desc: 'Buka halaman ujian Anda dan NEB akan bekerja secara otomatis.',
  },
  contact: {
    title: 'Kontak',
    subtitle: 'Punya pertanyaan atau butuh bantuan? Hubungi kami.',
    formTitle: 'Kirim pesan kepada kami',
    nameLabel: 'Nama',
    namePlaceholder: 'Nama Anda',
    nameError: 'Nama wajib diisi',
    emailLabel: 'Email',
    emailPlaceholder: 'email@anda.com',
    emailError: 'Email wajib diisi',
    emailInvalid: 'Masukkan alamat email yang valid',
    messageLabel: 'Pesan',
    messagePlaceholder: 'Pesan Anda...',
    messageError: 'Pesan wajib diisi',
    messageMinLength: 'Pesan minimal 10 karakter',
    submitBtn: 'Kirim Pesan',
    submitting: 'Mengirim...',
    successMessage: 'Pesan berhasil dikirim! (Demo)',
  },
  footer: {
    tagline: 'Dapatkan jawaban dengan cepat dan aman. Cepat, aman, dan andal.',
    product: 'Produk',
    company: 'Perusahaan',
    connect: 'Terhubung',
    privacy: 'Privasi',
    terms: 'Ketentuan',
    copyright: 'Hak cipta dilindungi.',
  },
  faqData: {
    aboutQ: 'Apa itu NEB?',
    aboutA: 'NEB adalah teman terbaik Anda untuk mengatasi ujian dan tugas online. Dengan alat canggih, kami memastikan Anda mendapatkan jawaban akurat dengan cepat dan mudah.',
    paymentQ: 'Apakah saya perlu membayar untuk layanan ini?',
    paymentA: 'NEB menawarkan fitur gratis dan premium. Fungsionalitas dasar tersedia tanpa biaya, sementara fitur lanjutan mungkin memerlukan langganan untuk pengalaman terbaik.',
    simplifyQ: 'Bagaimana NEB menyederhanakan hidup saya?',
    simplifyA: 'NEB mengotomatiskan proses mencari jawaban untuk ujian dan tugas online Anda. Cukup ikuti panduan pengaturan mudah kami, dan Anda akan siap dalam hitungan menit.',
    securityQ: 'Apakah NEB aman dan terjamin?',
    securityA: 'Tentu saja! Kami mengutamakan privasi dan keamanan Anda. NEB beroperasi secara diam-diam dan tidak menyimpan data ujian pribadi Anda.',
  },
};

const english: Translations = {
  nav: {
    home: 'Home',
    services: 'Services',
    tutorial: 'Tutorial',
    contact: 'Contact',
    login: 'Login',
    startFree: 'Start for free',
  },
  hero: {
    badge: 'New',
    badgeText: 'Introducing NEB Assistant →',
    title1: 'Get your answers',
    title2: 'quickly and safely',
    subtitle: 'Say goodbye to all the stress caused by taking exams. Our powerful tools provide answers to all your online assignments within seconds.',
    ctaPrimary: 'Start for free',
    ctaSecondary: 'View tutorial',
  },
  mainService: {
    label: 'Most Popular',
    title: 'Safe Exam Browser Bypass',
    description: 'Bypass Safe Exam Browser easily and safely. Upload your SEB configuration file, and get direct access to exams without restrictions.',
    cta: 'Upload Config File',
    learnMore: 'Learn More',
    demoStatus: 'Processing bypass...',
    feature1: 'Instant Bypass',
    feature1Desc: 'Process SEB files in seconds',
    feature2: 'Unrestricted Access',
    feature2Desc: 'Take exams without app restrictions',
    feature3: 'Safe & Private',
    feature3Desc: 'Your data is not stored on servers',
    step1: 'File Uploaded',
    step1Desc: 'bypass-config.seb',
    step2: 'Processing File',
    step2Desc: 'Extracting exam URL...',
    step3: 'Access Ready',
    step3Desc: 'Waiting for completion',
  },
  benefits: {
    instant: 'Instant',
    instantDesc: 'Results delivery',
    seamless: 'Seamless',
    seamlessDesc: 'Integration',
    secure: 'Secure',
    secureDesc: 'Privacy first',
    available: '24/7',
    availableDesc: 'Available support',
  },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Have questions? We have answers.',
  },
  cta: {
    title: 'Ready to get started?',
    subtitle: 'Join thousands of students who are already using NEB to ace their exams.',
    primaryBtn: 'Start for free',
    secondaryBtn: 'Contact us',
  },
  services: {
    badge: 'Services',
    title: 'Safe Exam Browser Bypass',
    subtitle: 'Bypass SEB and take your exams directly in a regular browser without restrictions. Safe, fast, and easy to use.',
    mainBadge: 'Popular',
    sebTagline: 'Bypass SEB easily and safely',
    sebDescription: 'Our service allows you to bypass Safe Exam Browser restrictions and take exams in a regular browser. Simply upload your SEB configuration file, and we will process it so you can access the exam without needing to use the SEB application.',
    feature1Title: 'Safe & Trusted',
    feature1Desc: 'Secure bypass process without storing your personal data',
    feature2Title: 'Instant Process',
    feature2Desc: 'Bypass results in seconds after file upload',
    feature3Title: 'No Installation',
    feature3Desc: 'No need to install any additional applications',
    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Follow 3 simple steps to bypass Safe Exam Browser',
    step1Title: 'Upload Config File',
    step1Desc: 'Upload the SEB configuration file (.seb) you received from your institution',
    step2Title: 'Process Bypass',
    step2Desc: 'Our system will process the file and extract the exam URL',
    step3Title: 'Access Exam',
    step3Desc: 'Use the generated URL to access the exam in a regular browser',
    ctaTitle: 'Ready to Bypass Your SEB?',
    ctaSubtitle: 'Upload your SEB configuration file and start taking exams without restrictions',
    ctaUpload: 'Upload Config File',
    helpCta: 'View Tutorial',
  },
  upload: {
    title: 'Upload File',
    subtitle: 'Upload your SEB configuration file securely and easily',
    redeemCodeLabel: 'Redeem Code',
    redeemCodePlaceholder: 'Enter redeem code',
    redeemCodeError: 'Redeem code is required',
    fileNameLabel: 'Output File Name',
    fileNamePlaceholder: 'Enter output file name',
    fileNameError: 'File name is required',
    fileLabel: 'SEB Config File',
    filePlaceholder: 'Choose .seb file',
    fileError: 'SEB config file is required',
    fileTypeError: 'Only .seb files are allowed',
    submitBtn: 'Upload',
    submitting: 'Processing...',
    successTitle: 'Success!',
    successMessage: 'SEB file processed successfully. You can use the following URL to access the exam.',
    errorTitle: 'Failed',
    downloadBtn: 'Copy URL',
    backBtn: 'Upload Again',
    dragDropText: 'Drag & drop file here',
    orText: 'or',
    chooseFile: 'Choose File',
    maxFileSize: 'Maximum file size: 10MB',
    supportedFormat: 'Supported format: .seb',
  },
  tutorial: {
    title: 'Tutorial & Guide',
    subtitle: 'Learn how to set up and use NEB with our step-by-step guide.',
    needHelp: 'Need help?',
    needHelpDesc: 'Learn basics with this 5-min Tutorial',
    contactUs: 'Contact Us',
    installTab: 'Install ModHeader',
    installTitle: 'How to Install ModHeader Extension',
    installDesc: 'Get started by installing the ModHeader browser extension.',
    installStep1: 'Open Chrome Web Store',
    installStep1Desc: 'Navigate to the Chrome Web Store and search for "ModHeader" extension.',
    installStep2: 'Add to Chrome',
    installStep2Desc: 'Click on "Add to Chrome" button and confirm the installation when prompted.',
    installStep3: 'Pin the Extension',
    installStep3Desc: 'Click the puzzle icon in Chrome toolbar and pin ModHeader for easy access.',
    redeemTab: 'Redeem Code',
    redeemTitle: 'How to Redeem Your Code',
    redeemDesc: 'Learn how to activate your NEB access code.',
    redeemStep1: 'Get Your Code',
    redeemStep1Desc: 'Purchase or receive your NEB activation code from our platform.',
    redeemStep2: 'Open NEB Dashboard',
    redeemStep2Desc: 'Go to your NEB account dashboard and find the "Redeem Code" section.',
    redeemStep3: 'Enter and Activate',
    redeemStep3Desc: 'Paste your code in the input field and click "Activate" to enable your access.',
    useTab: 'Use NEB',
    useTitle: 'How to Use NEB',
    useDesc: 'Start using NEB for your exams.',
    useStep1: 'Open ModHeader',
    useStep1Desc: 'Click the ModHeader extension icon in your browser toolbar.',
    useStep2: 'Enable NEB',
    useStep2Desc: 'Toggle to enable the configured NEB profile.',
    useStep3: 'Start Exam',
    useStep3Desc: 'Open your exam page and NEB will work automatically.',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Have questions or need help? Get in touch with us.',
    formTitle: 'Send us a message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    nameError: 'Name is required',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    emailError: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    messageLabel: 'Message',
    messagePlaceholder: 'Your message...',
    messageError: 'Message is required',
    messageMinLength: 'Message must be at least 10 characters',
    submitBtn: 'Send Message',
    submitting: 'Sending...',
    successMessage: 'Message sent successfully! (Demo)',
  },
  footer: {
    tagline: 'Get your answers quickly and safely. Fast, secure, and reliable.',
    product: 'Product',
    company: 'Company',
    connect: 'Connect',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: 'All rights reserved.',
  },
  faqData: {
    aboutQ: 'What is NEB all about?',
    aboutA: 'NEB is your ultimate companion for tackling online exams and assignments. With cutting-edge tools, we ensure you get accurate answers quickly and effortlessly.',
    paymentQ: 'Do I need to pay for this service?',
    paymentA: 'NEB offers both free and premium features. Basic functionality is available at no cost, while advanced features may require a subscription for the best experience.',
    simplifyQ: 'How does NEB simplify my life?',
    simplifyA: "NEB automates the process of finding answers for your online exams and assignments. Simply follow our easy setup guide, and you'll be ready to go in minutes.",
    securityQ: 'Is NEB safe and secure?',
    securityA: "Absolutely! We prioritize your privacy and security. NEB operates discreetly and doesn't store any of your personal exam data.",
  },
};

const translations: Record<Language, Translations> = {
  id: indonesian,
  en: english,
};

interface I18nContextValue {
  language: Accessor<Language>;
  setLanguage: (lang: Language) => void;
  t: Accessor<Translations>;
}

const I18nContext = createContext<I18nContextValue>();

export const I18nProvider: ParentComponent = (props) => {
  // Check localStorage for saved language preference
  const savedLang = typeof window !== 'undefined' 
    ? (localStorage.getItem('neb-language') as Language) || 'id' 
    : 'id';
  
  const [language, setLanguageSignal] = createSignal<Language>(savedLang);

  const setLanguage = (lang: Language) => {
    setLanguageSignal(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('neb-language', lang);
    }
  };

  const t = () => translations[language()];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {props.children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default translations;
