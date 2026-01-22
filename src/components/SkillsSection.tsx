import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Server, Database, Lightbulb, Layout } from 'lucide-react';

const skillCategories = [
  {
    key: 'backend',
    icon: Server,
    skills: ['.NET', 'C#', 'LINQ', 'Entity Framework', 'ADO.NET', 'ASP.NET MVC', 'Web API', 'REST APIs'],
  },
  {
    key: 'database',
    icon: Database,
    skills: ['SQL Server', 'T-SQL', 'Stored Procedures', 'Query Optimization', 'Database Design'],
  },
  {
    key: 'concepts',
    icon: Lightbulb,
    skills: ['SOLID Principles', 'Clean Architecture', 'Concurrency', 'Transactions', 'Security', 'Design Patterns', 'OOP'],
  },
  {
    key: 'frontend',
    icon: Layout,
    skills: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'TypeScript', 'Angular'],
  },
];

const SkillsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="skills" 
      className="py-20 md:py-32 relative bg-gradient-to-b from-background via-card/30 to-background"
      dir={isRTL ? 'rtl' : 'ltr'}
      ref={ref}
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('skills.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="card-surface p-6 md:p-8 group hover:border-primary/30 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t(`skills.categories.${category.key}`)}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.3, 
                      delay: catIndex * 0.1 + skillIndex * 0.05 
                    }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
