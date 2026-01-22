import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Layers, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

const projects = [
  {
    key: 'ecommerce',
    technologies: ['ASP.NET Core', 'Entity Framework', 'SQL Server', 'JWT', 'Repository Pattern'],
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    key: 'inventory',
    technologies: ['ASP.NET Web API', 'SQL Server', 'Stored Procedures', 'Background Services'],
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    key: 'taskmanager',
    technologies: ['ASP.NET Core', 'Clean Architecture', 'MediatR', 'CQRS', 'Role-Based Auth'],
    color: 'from-violet-500/20 to-purple-500/20',
  },
];

const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="projects" 
      className="py-20 md:py-32 relative"
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
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-surface overflow-hidden group"
            >
              {/* Gradient Accent */}
              <div className={`h-1 bg-gradient-to-r ${project.color}`} />
              
              <div className="p-6 md:p-8">
                {/* Project Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${project.color}`}>
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                      {t(`projects.items.${project.key}.title`)}
                    </h3>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {/* Problem */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle size={16} />
                      <span className="text-sm font-medium uppercase tracking-wide">Problem</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(`projects.items.${project.key}.problem`)}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle2 size={16} />
                      <span className="text-sm font-medium uppercase tracking-wide">Solution</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(`projects.items.${project.key}.solution`)}
                    </p>
                  </div>

                  {/* Highlight */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles size={16} />
                      <span className="text-sm font-medium uppercase tracking-wide">Highlight</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(`projects.items.${project.key}.highlight`)}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/80 text-muted-foreground font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
