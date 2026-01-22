import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText } from 'lucide-react';

const CVSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section 
      id="cv" 
      className="py-20 md:py-32 relative bg-gradient-to-b from-background via-card/30 to-background"
      dir={isRTL ? 'rtl' : 'ltr'}
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-8"
          >
            <FileText className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('cv.title')}</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-lg mb-8">
            {t('cv.subtitle')}
          </p>

          {/* Download Button */}
          <motion.a
            href="/Ashrakat Sami_CV.pdf"
            download
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            {t('cv.downloadButton')}
          </motion.a>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground/60 text-sm mt-6"
          >
            {t('cv.note')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CVSection;
