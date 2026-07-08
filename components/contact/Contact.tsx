'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import InkButton from '@/components/ui/InkButton';
import SumiSendButton from '@/components/ui/SumiSendButton';
import PaperCard from '@/components/ui/PaperCard';
import { Send, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/data/config';
import SumiTooltip from '@/components/ui/SumiTooltip';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    // Simulate submission to server
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section
      id="contactme"
      className="section-padding"
      style={{
        backgroundColor: 'var(--parchment)',
        backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(232, 143, 143, 0.08) 0%, transparent 60%)',
        position: 'relative',
        zIndex: 5,
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '650px',
          margin: '0 auto',
        }}
      >
        {/* Section Title */}
        <SectionTitle
          title="Send a Message"
          subtitle="CONTACT"
          kanji={siteConfig.kanji.contactKanji}
          stamp={siteConfig.kanji.contactKanji}
          align="center"
        />

        <PaperCard
          style={{
            marginTop: '40px',
            padding: '40px 32px',
          }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '40px 0',
                  gap: '20px',
                }}
              >
                {/* Ink-drop SVG animation */}
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  {/* Ripple rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0.6 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.22, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '2px solid var(--crimson)',
                      }}
                    />
                  ))}
                  {/* Ink-drop SVG core */}
                  <motion.svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  >
                    {/* Ink drop shape */}
                    <motion.path
                      d="M40 12 C40 12 18 36 18 50 a22 22 0 0 0 44 0 C62 36 40 12 40 12 Z"
                      fill="#B22234"
                      initial={{ pathLength: 0, fillOpacity: 0 }}
                      animate={{ pathLength: 1, fillOpacity: 1 }}
                      transition={{ pathLength: { duration: 0.6, delay: 0.15, ease: 'easeOut' }, fillOpacity: { duration: 0.3, delay: 0.6 } }}
                    />
                    {/* Checkmark inside the drop */}
                    <motion.path
                      d="M28 50 L36 58 L54 40"
                      fill="none"
                      stroke="#F5EFE1"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ pathLength: { duration: 0.4, delay: 0.7, ease: 'easeOut' }, opacity: { duration: 0.1, delay: 0.7 } }}
                    />
                    {/* Sakura petals scattered around the drop */}
                    {[
                      { cx: 14, cy: 22, r: 3.5, delay: 0.5 },
                      { cx: 22, cy: 14, r: 2.5, delay: 0.6 },
                      { cx: 64, cy: 20, r: 3, delay: 0.55 },
                      { cx: 70, cy: 30, r: 2, delay: 0.65 },
                      { cx: 18, cy: 62, r: 2.5, delay: 0.7 },
                    ].map(({ cx, cy, r, delay }, i) => (
                      <motion.circle
                        key={i}
                        cx={cx} cy={cy} r={r}
                        fill="#DB5E5E"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.85 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 16, delay }}
                      />
                    ))}
                  </motion.svg>
                </div>

                {/* Staggered text reveal */}
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', margin: 0 }}
                >
                  MESSAGE SENT{siteConfig.kanji?.contactSuccess?.text ? ' / ' : ''}
                  {siteConfig.kanji?.contactSuccess?.text && (
                    <SumiTooltip translation={siteConfig.kanji.contactSuccess.translation}>
                      <span style={{ cursor: 'help' }}>{siteConfig.kanji.contactSuccess.text}</span>
                    </SumiTooltip>
                  )}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  style={{ fontSize: '14px', color: 'var(--charcoal-light)', opacity: 0.8, maxWidth: '340px', margin: 0 }}
                >
                  Thank you for reaching out. I have received your message and will respond as swiftly as possible.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <InkButton variant="secondary" onClick={() => setStatus('idle')} style={{ marginTop: '4px' }}>
                    SEND ANOTHER
                  </InkButton>
                </motion.div>
              </motion.div>

            ) : (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '28px',
                }}
              >
                {/* Form Status Warnings */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--crimson)',
                      fontSize: '13px',
                      fontWeight: 600,
                      backgroundColor: 'var(--crimson-fade)',
                      padding: '10px 16px',
                      border: '1.5px solid var(--crimson)',
                      borderRadius: '1px',
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>Please fill in all calligraphic lines.</span>
                  </motion.div>
                )}

                {/* Input Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--charcoal)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    YOUR NAME{siteConfig.kanji?.contactName?.text ? ' / ' : ''}
                    {siteConfig.kanji?.contactName?.text && (
                      <SumiTooltip translation={siteConfig.kanji.contactName.translation}>
                        <span style={{ cursor: 'help' }}>{siteConfig.kanji.contactName.text}</span>
                      </SumiTooltip>
                    )}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '10px 4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '2.5px solid var(--charcoal-light)',
                      color: 'var(--charcoal)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-bottom-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--crimson)')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--charcoal-light)')}
                  />
                </div>

                {/* Input Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--charcoal)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    EMAIL ADDRESS{siteConfig.kanji?.contactEmail?.text ? ' / ' : ''}
                    {siteConfig.kanji?.contactEmail?.text && (
                      <SumiTooltip translation={siteConfig.kanji.contactEmail.translation}>
                        <span style={{ cursor: 'help' }}>{siteConfig.kanji.contactEmail.text}</span>
                      </SumiTooltip>
                    )}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '10px 4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '2.5px solid var(--charcoal-light)',
                      color: 'var(--charcoal)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-bottom-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--crimson)')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--charcoal-light)')}
                  />
                </div>

                {/* Input Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--charcoal)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    MESSAGE{siteConfig.kanji?.contactMessage?.text ? ' / ' : ''}
                    {siteConfig.kanji?.contactMessage?.text && (
                      <SumiTooltip translation={siteConfig.kanji.contactMessage.translation}>
                        <span style={{ cursor: 'help' }}>{siteConfig.kanji.contactMessage.text}</span>
                      </SumiTooltip>
                    )}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Write your message here..."
                    style={{
                      width: '100%',
                      padding: '10px 4px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '2.5px solid var(--charcoal-light)',
                      color: 'var(--charcoal)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'none',
                      lineHeight: '1.6',
                      transition: 'border-bottom-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--crimson)')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--charcoal-light)')}
                  />
                </div>

                {/* Submit button */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                  <SumiSendButton
                    type="submit"
                    isSubmitting={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                  </SumiSendButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </PaperCard>
      </div>
    </section>
  );
}
