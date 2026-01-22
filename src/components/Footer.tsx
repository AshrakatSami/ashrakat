import { useTranslation } from 'react-i18next';
import { Heart, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-8 border-t border-border/50 bg-card/30"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span className="gradient-text font-bold text-lg">{'<AS />'}</span>
            <span>© {currentYear}</span>
            <span>{t('footer.rights')}</span>
          </div>

          {/* Built with love */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>{t('footer.builtWith')}</span>
            <Heart size={14} className="text-primary fill-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
