'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Layout, MonitorPlay, ArrowRight, Paintbrush, X, ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const projects = [
  { id: 1, title: 'Aurovia yoghurt', category: 'Logo', image: '/IMG-20260322-WA0004.jpg' },
  { id: 2, title: 'MH Shop', category: 'Flyer Boutique', image: '/IMG-20260404-WA0050.jpg' },
  { id: 3, title: 'Juju la flamme', category: 'concert', image: '/IMG-20260326-WA0006.jpg' },
  { id: 4, title: 'Picnic Tosangana', category: ' Affiche Événement', image: '/IMG-20260405-WA0014.jpg' },
  { id: 5, title: 'Anniversaire Elvire', category: 'Carte / Invitation', image: '/tata_elvire1.jpg' },
  { id: 6, title: 'Design MH', category: 'Identité Visuelle', image: '/mh_design_1.jpg' },
  { id: 7, title: ' Juju la flamme ', category: ' concert', image: '/IMG-20260401-WA0039.jpg' },
  { id: 8, title: 'Anniversaire Firtella ', category: 'Carte / Invitation', image: '/IMG-20260331-WA0005.jpg' },
  { id: 9, title: 'Anniversaire Levy', category: 'Affiche Festivité', image: '/INVITATION_LEVY_2.jpg' },
  { id: 10, title: 'Jean 10:27', category: 'Design Religieux', image: '/IMG-20260406-WA0007.jpg' },
  { id: 11, title: 'Birthday Marie Kate', category: 'Carte / Invitation', image: '/IMG-20260410-WA0055.jpg' },
  { id: 12, title: 'Aurovia yoghurt', category: 'logo', image: '/IMG-20260411-WA0017.jpg' },
  { id: 13, title: 'Birthday Cornelie', category: 'Carte / Invitation', image: '/IMG-20260425-WA0019.jpg' },
  { id: 14, title: 'Grille tarifaire', category: 'Social Media', image: '/FB_IMG_1774230914153.jpg' },
  { id: 15, title: 'Coiffure', category: 'Affiche', image: '/388e961ad8ee47fab978ae6452a903aa.jpg' },
  { id: 16, title: 'Kondi shop', category: 'Logo', image: '/IMG-20260506-WA0023-1.jpg' },
  { id: 17, title: 'Kondi shop', category: 'Logo', image: '/IMG-20260506-WA0024-1.jpg' },
  { id: 18, title: 'Exposition', category: 'Affiche', image: '/IMG-20260430-WA0020.jpg' }
];

const services = [
  {
    icon: <Layout className="w-8 h-8" />,
    title: 'Design Graphique',
    description: 'Création de supports de communication visuelle percutants (affiches, flyers, menus) adaptés à votre cible.'
  },
  {
    icon: <Paintbrush className="w-8 h-8" />,
    title: 'Identité Visuelle',
    description: 'Conception de logos et de chartes graphiques pour donner à votre marque une personnalité unique et mémorable.'
  },
  {
    icon: <MonitorPlay className="w-8 h-8" />,
    title: 'Packaging & Étiquettes',
    description: 'Design de packagings attrayants (ex: Aurovia) qui mettent en valeur vos produits sur le marché.'
  }
];

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Portfolio() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handlePrint = () => window.print();

  const closeLightbox = useCallback(() => setSelectedProject(null), []);

  const navigate = useCallback((dir: 1 | -1) => {
    setSelectedProject(prev => prev === null ? null : (prev + dir + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedProject === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject, closeLightbox, navigate]);

  useEffect(() => {
    document.body.style.overflow = selectedProject !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-light via-beige to-sand print:bg-sand-light text-deepblack overflow-x-hidden print:overflow-visible selection:bg-electric/30 font-sans">

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 p-6 print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tighter text-deepblack">PUER DEi<span className="text-electric">.</span></div>
          <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide border border-beige/60 shadow-sm rounded-full px-8 py-3 bg-beige/60 backdrop-blur-md uppercase text-slate-gray">
            <a href="#work" className="hover:text-electric transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-electric transition-colors">Services</a>
            <a href="#contact" className="hover:text-deepblack transition-colors">Contact</a>
          </div>
          <button
            onClick={handlePrint}
            className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-deepblack border border-deepblack/20 hover:border-electric hover:text-electric px-5 py-2.5 rounded-full transition-all duration-300"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen print:min-h-0 flex items-center justify-center p-6 pt-24 print:pt-6 overflow-hidden print:overflow-visible">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none print:hidden overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-sienna/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-sand/30 rounded-full blur-[150px]" />
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1], rotate: [45, 45, 45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-10 w-32 h-32 bg-gradient-to-br from-white/40 to-white/5 border border-white/40 shadow-xl shadow-sienna/20 backdrop-blur-md"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          <motion.div
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], rotate: [45, 45, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-electric/20 to-white/10 border border-white/50 shadow-2xl shadow-electric/20 backdrop-blur-lg"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          <motion.div
            animate={{ y: [0, 40, 0], scale: [0.9, 1, 0.9], rotate: [45, 45, 45] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-sienna/30 to-white/5 border border-white/30 shadow-lg backdrop-blur-sm"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
          <motion.div
            animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 -right-10 w-20 h-20 bg-gradient-to-br from-white/60 via-white/10 to-transparent border border-white/40 shadow-inner rounded-[50%_0_50%_50%] -rotate-45 backdrop-blur-md"
          />
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[40%] w-48 h-48 border-[1.5px] border-dashed border-electric/30 rounded-full opacity-60"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[10%] right-[15%] text-sienna/50 font-display font-light text-5xl"
          >+</motion.div>
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1, 0.8], rotate: [0, 90, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[30%] right-[10%] text-electric/40 font-display font-light text-4xl"
          >+</motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full pt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-[7.5rem] font-black leading-[0.9] tracking-tighter uppercase mb-6 text-deepblack print:text-6xl">
                Design<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-sienna to-electric print:text-electric print:bg-none">MH.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-8 lg:mt-12 space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-deepblack uppercase tracking-wide">M.HAKOULA</h2>
                <h3 className="text-lg md:text-xl font-medium text-slate-gray uppercase tracking-widest">RINALDY STEFANE</h3>
              </div>
              <p className="max-w-md text-lg text-slate-gray font-light leading-relaxed">
                Designer graphique basé à Brazzaville, je conçois des identités visuelles, supports de com et interfaces qui allient esthétique et stratégie. Mon approche : écouter, comprendre, créer juste.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 print:hidden">
                <a
                  href="#work"
                  className="group flex flex-1 items-center justify-center gap-4 text-sm font-bold tracking-widest uppercase text-sand-light bg-deepblack hover:bg-electric px-8 py-5 rounded-full transition-all duration-300"
                >
                  Voir mes créations
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={handlePrint}
                  className="group flex flex-1 items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase text-deepblack bg-beige border-2 border-beige hover:border-deepblack px-8 py-5 rounded-full transition-all duration-300"
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  Télécharger PDF
                </button>
              </div>

              <div className="print:hidden">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-gray hover:text-electric transition-colors underline underline-offset-4"
                >
                  Télécharger mon CV →
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative w-full mx-auto aspect-[4/5] print:aspect-square print:max-w-xs rounded-[2.5rem] overflow-hidden shadow-2xl shadow-sienna/20 print:shadow-none print:transform-none"
          >
            <Image
              src="/mh_design_1.jpg"
              alt="M.HAKOULA RINALDY STEFANE"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
              referrerPolicy="no-referrer"
              unoptimized
              priority
            />
          </motion.div>
        </div>
      </header>

      {/* Portfolio Grid */}
      <section id="work" className="py-24 px-6 md:py-32 print:py-12 relative print:break-before-page">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-deepblack">Mes <span className="text-electric">Réalisations</span></h2>
              <div className="w-24 h-2 bg-electric mt-8 rounded-full" />
            </div>
            <p className="text-slate-gray text-sm font-mono uppercase tracking-widest print:hidden">
              {projects.length} créations — cliquer pour agrandir
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 print:grid-cols-3 print:gap-4 print:page-break-inside-auto">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(i)}
                className="group relative aspect-[4/5] overflow-hidden bg-sand/30 rounded-2xl cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-sienna/15 transition-all duration-500 hover:-translate-y-1 print:aspect-[3/4] print:break-inside-avoid print:shadow-none print:translate-y-0"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                  unoptimized
                />

                {/* Category badge — always visible */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-deepblack/55 to-transparent print:hidden">
                  <span className="inline-block text-sand-light font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                    {project.category}
                  </span>
                </div>

                {/* Zoom icon — appears on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 print:hidden">
                  <div className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover overlay with title */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-t from-deepblack/90 via-deepblack/30 to-transparent print:hidden">
                  <h3 className="font-display text-2xl md:text-3xl font-black text-sand-light leading-tight">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-0.5 bg-electric" />
                    <p className="text-electric font-mono text-xs uppercase tracking-widest">{project.category}</p>
                  </div>
                </div>

                {/* Print label */}
                <div className="hidden print:flex absolute bottom-0 left-0 right-0 bg-beige/90 p-3 flex-col">
                  <p className="text-slate-gray font-mono text-[8px] font-bold uppercase tracking-widest">{project.category}</p>
                  <h3 className="font-display text-xs font-black text-deepblack leading-tight">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 md:py-32 print:py-12 border-y border-sand/40 bg-beige relative print:break-before-page">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center flex flex-col items-center">
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-deepblack">Mon <span className="text-electric">Expertise</span></h2>
            <div className="w-24 h-2 bg-electric mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2 }}
                className="group flex flex-col items-center text-center p-10 rounded-3xl hover:bg-sand-light transition-colors border border-transparent hover:border-sand/40"
              >
                <div className="w-20 h-20 rounded-2xl bg-sand/20 flex items-center justify-center text-electric mb-8 group-hover:bg-electric group-hover:text-sand-light group-hover:-translate-y-2 transition-all duration-500 ease-out shadow-sm group-hover:shadow-lg group-hover:shadow-electric/20">
                  {service.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-deepblack">{service.title}</h3>
                <p className="text-slate-gray leading-relaxed font-light">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 md:py-32 print:py-12 bg-sand-light print:bg-sand-light relative print:break-before-page">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-deepblack">Travaillons <span className="text-electric">Ensemble</span></h2>
            <div className="w-24 h-2 bg-electric mt-8 mb-6 rounded-full" />
            <p className="text-slate-gray max-w-md text-lg">Un projet créatif en tête ? Laissez-moi un message pour en discuter ou contactez-moi directement.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mt-12 bg-beige px-8 py-5 md:px-10 md:py-6 rounded-[2rem] md:rounded-full shadow-sm border border-sand/40 w-full md:w-auto">
              <a href="tel:+242066469382" className="flex items-center gap-4 text-deepblack hover:text-electric transition-colors font-bold tracking-wide w-full sm:w-auto justify-center">
                <span className="w-12 h-12 rounded-full bg-electric/10 text-electric flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                +242 066469382
              </a>
              <div className="hidden sm:block w-px h-10 bg-sand/40" />
              <a href="mailto:stefanerynaldi@gmail.com" className="flex items-center gap-4 text-deepblack hover:text-electric transition-colors font-bold tracking-wide w-full sm:w-auto justify-center">
                <span className="w-12 h-12 rounded-full bg-electric/10 text-electric flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </span>
                stefanerynaldi@gmail.com
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-10 bg-beige p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-sand/40 print:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b-2 border-sand/40 py-3 outline-none focus:border-electric transition-colors peer placeholder-transparent font-medium text-deepblack text-lg"
                  placeholder="Nom complet"
                  id="name"
                />
                <label htmlFor="name" className="absolute left-0 top-3 text-slate-gray/60 text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-electric peer-valid:-top-5 peer-valid:text-xs transition-all cursor-text tracking-wide uppercase font-bold">
                  Nom complet
                </label>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b-2 border-sand/40 py-3 outline-none focus:border-electric transition-colors peer placeholder-transparent font-medium text-deepblack text-lg"
                  placeholder="Email"
                  id="email"
                />
                <label htmlFor="email" className="absolute left-0 top-3 text-slate-gray/60 text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-electric peer-valid:-top-5 peer-valid:text-xs transition-all cursor-text tracking-wide uppercase font-bold">
                  Email
                </label>
              </div>
            </div>

            <div className="relative group pt-4">
              <textarea
                required
                rows={4}
                className="w-full bg-transparent border-b-2 border-sand/40 py-3 outline-none focus:border-electric transition-colors peer placeholder-transparent resize-none font-medium text-deepblack text-lg"
                placeholder="Décrivez votre besoin"
                id="message"
              />
              <label htmlFor="message" className="absolute left-0 top-3 text-slate-gray/60 text-sm peer-focus:-top-5 peer-focus:text-xs peer-focus:text-electric peer-valid:-top-5 peer-valid:text-xs transition-all cursor-text tracking-wide uppercase font-bold">
                Décrivez votre projet
              </label>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="group relative flex items-center justify-center h-16 px-10 bg-deepblack text-sand-light font-bold tracking-widest uppercase overflow-hidden disabled:opacity-70 rounded-full shadow-lg hover:shadow-electric/30 transition-all"
              >
                <div className="absolute inset-0 w-full h-full bg-electric transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
                <span className="relative flex items-center gap-2 transition-colors duration-300">
                  {formStatus === 'idle' && <>Envoyer la demande <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>}
                  {formStatus === 'sending' && 'Envoi en cours...'}
                  {formStatus === 'sent' && 'Message envoyé !'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-sand/40 bg-beige">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-display font-black text-xl tracking-tighter text-deepblack">
            PUER DEi<span className="text-electric">.</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-gray hover:text-electric transition-colors font-mono uppercase tracking-widest print:hidden"
            >
              CV PDF
            </a>
            <button
              onClick={handlePrint}
              className="text-xs text-slate-gray hover:text-electric transition-colors font-mono uppercase tracking-widest print:hidden flex items-center gap-1.5"
            >
              <Download className="w-3 h-3" />
              Portfolio PDF
            </button>
          </div>
          <p className="text-xs text-slate-gray font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} PUER DEi. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deepblack/96 backdrop-blur-md print:hidden"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/40 font-mono text-xs tracking-widest">
              {selectedProject + 1} / {projects.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-2 md:left-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              className="absolute right-2 md:right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image panel */}
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0, scale: 0.93, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5 px-14 md:px-24 w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}${projects[selectedProject].image}`}
                  alt={projects[selectedProject].title}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
              <div className="text-center">
                <p className="text-electric font-mono text-xs uppercase tracking-widest mb-1.5">{projects[selectedProject].category}</p>
                <h3 className="text-white font-display text-xl md:text-2xl font-black">{projects[selectedProject].title}</h3>
                <p className="text-white/30 text-xs mt-2 font-mono tracking-widest">← → pour naviguer · Échap pour fermer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
