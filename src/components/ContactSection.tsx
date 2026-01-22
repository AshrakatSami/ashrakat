import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, MessageCircle, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const WHATSAPP_NUMBER = '201110352997';
  const EMAIL = 'ashrakat002@gmail.com';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrors({});

    // Validate form
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<ContactFormData> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    // Send via WhatsApp (opens in new tab)
    const whatsappMessage = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section 
      id="contact" 
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('contact.title')}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-3"
            >
              <form onSubmit={handleSubmit} className="card-surface p-6 md:p-8 space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-field ${errors.name ? 'border-destructive focus:border-destructive focus:ring-destructive/50' : ''}`}
                    placeholder={t('contact.form.name')}
                    disabled={status === 'sending'}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'border-destructive focus:border-destructive focus:ring-destructive/50' : ''}`}
                    placeholder={t('contact.form.email')}
                    disabled={status === 'sending'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`input-field resize-none ${errors.message ? 'border-destructive focus:border-destructive focus:ring-destructive/50' : ''}`}
                    placeholder={t('contact.form.message')}
                    disabled={status === 'sending'}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t('contact.form.send')}
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-lg"
                  >
                    <CheckCircle size={20} />
                    <span>{t('contact.form.success')}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-lg"
                  >
                    <XCircle size={20} />
                    <span>{t('contact.form.error')}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 space-y-6"
            >
              <div className="card-surface p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {t('contact.or')}
                </h3>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary 
                             border border-border hover:border-green-500/50 transition-all duration-300 mb-4 group"
                >
                  <div className="p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t('contact.whatsapp')}</div>
                    <div className="text-sm text-muted-foreground font-mono">+20 111 035 2997</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary 
                             border border-border hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t('contact.email')}</div>
                    <div className="text-sm text-muted-foreground font-mono">{EMAIL}</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
