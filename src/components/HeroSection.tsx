import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Mail, Code2, Database, Server } from 'lucide-react';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      {/* Floating Icons */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[15%] hidden lg:block"
      >
        <div className="p-4 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm">
          <Code2 className="w-8 h-8 text-primary/60" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-[10%] hidden lg:block"
      >
        <div className="p-4 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm">
          <Database className="w-8 h-8 text-primary/60" />
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-[20%] hidden lg:block"
      >
        <div className="p-4 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm">
          <Server className="w-8 h-8 text-primary/60" />
        </div>
      </motion.div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground text-lg mb-4"
          >
            {t('hero.greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">{t('hero.name')}</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="code-text text-xl sm:text-2xl font-mono">{'{'}</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              {t('hero.title')}
            </h2>
            <span className="code-text text-xl sm:text-2xl font-mono">{'}'}</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/Ashrakat-Sami-CV.pdf"
              download
              className="btn-primary w-full sm:w-auto"
            >
              <Download size={18} />
              {t('hero.downloadCV')}
            </a>
            <button
              onClick={scrollToContact}
              className="btn-secondary w-full sm:w-auto"
            >
              <Mail size={18} />
              {t('hero.contactMe')}
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 bg-primary/60 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
