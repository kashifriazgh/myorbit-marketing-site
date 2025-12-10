'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ContactUs = () => {
  const [messageForm, setMessageForm] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [messageLoading, setMessageLoading] = useState(false);
  const [messageFeedback, setMessageFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [callNumber, setCallNumber] = useState('');
  const [callLoading, setCallLoading] = useState(false);
  const [callFeedback, setCallFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const isValidPhone = (value: string) =>
    /^(\+?\d{10,15}|0?\d{10})$/.test(value.trim());

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageFeedback(null);

    if (!messageForm.name.trim()) {
      setMessageFeedback({ type: 'error', text: 'Name is required.' });
      return;
    }

    if (!messageForm.contact.trim()) {
      setMessageFeedback({
        type: 'error',
        text: 'Please provide an email or phone number.',
      });
      return;
    }

    const contactValid =
      isValidEmail(messageForm.contact) || isValidPhone(messageForm.contact);
    if (!contactValid) {
      setMessageFeedback({
        type: 'error',
        text: 'Enter a valid email address or phone number.',
      });
      return;
    }

    if (!messageForm.message.trim()) {
      setMessageFeedback({ type: 'error', text: 'Message cannot be empty.' });
      return;
    }

    try {
      setMessageLoading(true);
      await addDoc(collection(db, 'messages'), {
        ...messageForm,
        submittedAt: serverTimestamp(),
      });
      setMessageFeedback({
        type: 'success',
        text: 'Thanks! Your message has been sent.',
      });
      setMessageForm({ name: '', contact: '', message: '' });
    } catch (error) {
      console.error('Error adding message:', error);
      setMessageFeedback({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setMessageLoading(false);
    }
  };

  const handleCallSubmit = async () => {
    setCallFeedback(null);
    if (!isValidPhone(callNumber)) {
      setCallFeedback({
        type: 'error',
        text: 'Enter a valid Pakistani mobile number.',
      });
      return;
    }

    try {
      setCallLoading(true);
      await addDoc(collection(db, 'call requests'), {
        phone: callNumber.trim(),
        submittedAt: serverTimestamp(),
      });
      setCallFeedback({
        type: 'success',
        text: 'Thanks! We will reach out shortly.',
      });
      setCallNumber('');
    } catch (error) {
      console.error('Error adding call request:', error);
      setCallFeedback({
        type: 'error',
        text: 'Unable to submit right now. Please try again.',
      });
    } finally {
      setCallLoading(false);
    }
  };

  return (
    <section
      className="py-24 px-6 md:px-12 bg-slate-900 text-white"
      id="contact"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center">
          <span className="inline-flex px-4 py-1 rounded-full text-xs uppercase tracking-[0.4em] bg-white/10 border border-white/20 text-cyan-200">
            contact
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Let’s configure your personal workspace
          </h2>
          <p className="text-slate-200 max-w-3xl mx-auto">
            Share your questions, request a walkthrough, or ping us instantly on
            WhatsApp. We’ll help you launch your own Firebase + Netlify setup in
            less than a day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/15 rounded-3xl p-8 flex flex-col gap-5 backdrop-blur relative overflow-hidden">
            <Mail className="w-10 h-10 text-cyan-300" />
            <h3 className="text-xl font-semibold">Send a message</h3>
            <form onSubmit={handleMessageSubmit} className="w-full space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={messageForm.name}
                onChange={(e) =>
                  setMessageForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Your Email or Phone"
                className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={messageForm.contact}
                onChange={(e) =>
                  setMessageForm((prev) => ({
                    ...prev,
                    contact: e.target.value,
                  }))
                }
                required
              />
              <textarea
                placeholder="Tell us what you’re planning"
                rows={4}
                className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                value={messageForm.message}
                onChange={(e) =>
                  setMessageForm((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                required
              />
              <button
                type="submit"
                disabled={messageLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:opacity-90 disabled:opacity-50 text-slate-900 py-3 rounded-2xl font-semibold transition"
              >
                <Send className="w-5 h-5" />
                {messageLoading ? 'Sending...' : 'Send message'}
              </button>
            </form>
            {messageFeedback && (
              <div
                className={`absolute inset-x-6 top-6 rounded-2xl p-4 text-sm font-medium backdrop-blur transition ${
                  messageFeedback.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/60'
                    : 'bg-rose-500/10 text-rose-100 border border-rose-400/60'
                }`}
              >
                {messageFeedback.text}
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/15 rounded-3xl p-8 flex flex-col items-center text-center gap-5 backdrop-blur">
            <MessageSquare className="w-10 h-10 text-emerald-300" />
            <h3 className="text-xl font-semibold">Chat on WhatsApp</h3>
            <p className="text-sm text-slate-200">
              Need instant replies? Ping us on WhatsApp and we’ll respond
              quickly during working hours.
            </p>
            <a
              href="https://wa.me/923164709208"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-900 font-semibold shadow-lg shadow-emerald-500/30 hover:translate-y-0.5 transition"
            >
              Open WhatsApp
            </a>
          </div>

          <div className="bg-white/5 border border-white/15 rounded-3xl p-8 flex flex-col gap-5 backdrop-blur">
            <Phone className="w-10 h-10 text-teal-300" />
            <h3 className="text-xl font-semibold">Request a call back</h3>
            <p className="text-sm text-slate-200">
              Drop your Pakistani number and we will call or WhatsApp you
              shortly.
            </p>
            <div className="flex w-full gap-3">
              <span className="flex items-center px-3 rounded-2xl bg-white/10 border border-white/20">
                +92
              </span>
              <input
                type="tel"
                placeholder="3XXXXXXXXX"
                value={callNumber}
                onChange={(e) => setCallNumber(e.target.value)}
                className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 focus:ring-2 focus:ring-teal-400 outline-none"
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>
            <button
              onClick={handleCallSubmit}
              disabled={callLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 py-3 rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              <Phone className="w-5 h-5" />
              {callLoading ? 'Submitting...' : 'Request call'}
            </button>
            {callFeedback && (
              <div
                className={`text-sm font-medium px-3 py-2 rounded-2xl ${
                  callFeedback.type === 'success'
                    ? 'text-emerald-200 bg-emerald-500/10 border border-emerald-300/40'
                    : 'text-rose-200 bg-rose-500/10 border border-rose-300/40'
                }`}
              >
                {callFeedback.text}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white transition"
          >
            <Facebook className="w-7 h-7" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white transition"
          >
            <Linkedin className="w-7 h-7" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
