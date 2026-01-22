import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, FolderGit2, Target } from 'lucide-react';

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const stats = [
    { icon: Briefcase, label: t('about.stats.experience'), value: '2+' },
    { icon: FolderGit2, label: t('about.stats.projects'), value: '10+' },
    { icon: Target, label: t('about.stats.focus'), value: '100%' },
  ];

  return (
    <section 
      id="about" 
      className="py-20 md:py-32 relative"
      dir={isRTL ? 'rtl' : 'ltr'}
      ref={ref}
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('about.title')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('about.subtitle')}
            </p>
          </motion.div>

          {/* About Content */}
          <div className="space-y-6 mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {t('about.p1')}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {t('about.p2')}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {t('about.p3')}
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="card-surface p-6 text-center group hover:border-primary/50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
