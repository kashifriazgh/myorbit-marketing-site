'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {
  Loader2,
  X,
  User,
  Flame,
  Bot,
  Server,
  CreditCard,
  CheckSquare,
  ArrowLeft,
  CheckCircle2,
  Circle,
  AlertCircle,
  Upload,
  Eye,
  EyeOff,
  Activity,
  Check,
  Lightbulb,
  Sun,
  Moon,
} from 'lucide-react';
import { db } from '@/lib/firebase';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Subscription = 'premium' | 'free';

type SectionKey =
  | 'clientInfo'
  | 'firebase'
  | 'ai'
  | 'netlify'
  | 'membership'
  | 'checklist';

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface ClientData {
  id?: string;
  clientCode?: string;
  clientId?: string;
  // Client Info
  fullName: string;
  email: string;
  mobile: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  notes: string;
  // Firebase
  googleAccountEmail: string;
  firebaseProjectName: string;
  firebaseProjectId: string;
  firebaseAuthDomain: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
  firebaseApiKey: string;
  firebaseMeasurementId: string;
  firebaseServiceAccountJson: string;
  firebaseSetupStatus: {
    projectCreated: boolean;
    firestoreEnabled: boolean;
    authEnabled: boolean;
    fcmConfigured: boolean;
  };
  // AI
  groqApiKey: string;
  geminiApiKey: string;
  groqModelName: string;
  geminiModelName: string;
  groqActive: boolean;
  geminiActive: boolean;
  aiNotes: string;
  // Netlify
  netlifySetupStatus: {
    envVarsAdded: boolean;
    deployed: boolean;
    customDomain: boolean;
  };
  netlifyAppId: string;
  netlifySiteName: string;
  netlifySiteUrl: string;
  netlifyRepoUrl: string;
  netlifyBranch: string;
  // Membership
  subscription: Subscription;
  joiningDate: string;
  expiryDate: string;
  monthlyFee: number;
  discount: number;
  amountPaid: number;
  membershipStatus: 'active' | 'inactive' | 'expired';
  // Checklist
  checklist: ChecklistItem[];
  // Sections completed
  completedSections: SectionKey[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

export const SECTION_ORDER: SectionKey[] = [
  'clientInfo',
  'membership',
  'firebase',
  'ai',
  'netlify',
  'checklist',
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', label: 'Client Added', done: false },
  { id: 'c2', label: 'Firebase Created', done: false },
  { id: 'c3', label: 'Firestore Created', done: false },
  { id: 'c4', label: 'Authentication Configured', done: false },
  { id: 'c5', label: 'FCM Configured', done: false },
  { id: 'c6', label: 'AI Keys Added', done: false },
  { id: 'c7', label: 'GitHub Repository Connected', done: false },
  { id: 'c8', label: 'Netlify Project Created', done: false },
  { id: 'c9', label: 'Environment Variables Added', done: false },
  { id: 'c10', label: 'Site Deployed', done: false },
  { id: 'c11', label: 'WhatsApp Connected', done: false },
  { id: 'c12', label: 'Push Notifications Tested', done: false },
  { id: 'c13', label: 'Domain Connected', done: false },
  { id: 'c14', label: 'Client Handover Completed', done: false },
];

export const EMPTY_CLIENT: ClientData = {
  fullName: '',
  email: '',
  mobile: '',
  whatsapp: '',
  address: '',
  city: '',
  country: '',
  notes: '',
  googleAccountEmail: '',
  firebaseProjectName: '',
  firebaseProjectId: '',
  firebaseAuthDomain: '',
  firebaseStorageBucket: '',
  firebaseMessagingSenderId: '',
  firebaseAppId: '',
  firebaseApiKey: '',
  firebaseMeasurementId: '',
  firebaseServiceAccountJson: '',
  firebaseSetupStatus: {
    projectCreated: false,
    firestoreEnabled: false,
    authEnabled: false,
    fcmConfigured: false,
  },
  groqApiKey: '',
  geminiApiKey: '',
  groqModelName: 'llama3-70b-8192',
  geminiModelName: 'gemini-1.5-pro',
  groqActive: true,
  geminiActive: true,
  aiNotes: '',
  netlifySetupStatus: {
    envVarsAdded: false,
    deployed: false,
    customDomain: false,
  },
  netlifyAppId: '',
  netlifySiteName: '',
  netlifySiteUrl: '',
  netlifyRepoUrl: '',
  netlifyBranch: 'main',
  clientCode: '',
  clientId: '',
  subscription: 'free',
  joiningDate: '',
  expiryDate: '',
  monthlyFee: 0,
  discount: 0,
  amountPaid: 0,
  membershipStatus: 'active',
  checklist: DEFAULT_CHECKLIST,
  completedSections: [],
};

// ─────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────

export function calcOverallProgress(client: ClientData): number {
  const completedSections = client.completedSections ?? [];
  const checklist = client.checklist ?? DEFAULT_CHECKLIST;
  const sectionPoints = completedSections.length;
  const checklistDone = checklist.filter((i) => i.done).length;
  const total = SECTION_ORDER.length + DEFAULT_CHECKLIST.length;
  return Math.round(((sectionPoints + checklistDone) / total) * 100);
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

const inputCls =
  'w-full rounded-2xl border border-slate-300 dark:border-slate-650 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 text-lg placeholder:text-slate-405 dark:placeholder:text-slate-500 outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/30 transition shadow-sm shadow-slate-100 dark:shadow-slate-950/20';

const inputDisabledCls =
  'w-full rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-450 px-4 py-3 text-lg outline-none cursor-not-allowed shadow-sm';

const labelCls = 'block text-base font-semibold text-slate-900 dark:text-slate-200 mb-2';
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-base font-medium border transition ${
        checked
          ? 'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50'
      }`}
    >
      <Activity className="w-3.5 h-3.5" />
      {label}: {checked ? 'Active' : 'Inactive'}
    </button>
  );
}

function StatusCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 text-base rounded-lg px-3 py-2 border transition ${
        checked
          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
          : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20'
      }`}
    >
      {checked ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      ) : (
        <Circle className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-600" />
      )}
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// Section Card
// ─────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  sectionKey: SectionKey;
  isActive: boolean;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onEnableEditing?: () => void;
  saving: boolean;
  children: React.ReactNode;
}

function SectionCard({
  title,
  subtitle,
  icon,
  isActive,
  isCompleted,
  onMarkComplete,
  onEnableEditing,
  saving,
  children,
}: SectionCardProps) {
  return (
    <div
      className={`relative rounded-2xl border transition-all duration-500 ${
        isCompleted
          ? 'border-emerald-500/30 bg-slate-900/95 shadow-lg shadow-emerald-500/10'
          : isActive
            ? 'border-cyan-500/30 bg-slate-900/95 shadow-md shadow-cyan-500/10'
            : 'border-slate-700/40 bg-slate-900/90 shadow-none'
      }`}
    >
      {!isActive && !isCompleted && (
        <div className="absolute inset-0 z-10 rounded-2xl bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center px-6 py-8 text-center">
          <AlertCircle className="w-9 h-9 text-slate-400 mb-3" />
          <p className="text-lg font-semibold text-slate-200">
            Section locked until enabled.
          </p>
          <p className="text-lg text-slate-400 mt-2 max-w-xs">
            Click the button below to unlock editing for this section.
          </p>
          {onEnableEditing && (
            <button
              type="button"
              onClick={onEnableEditing}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              Enable Editing
            </button>
          )}
        </div>
      )}

      {/* Header */}
      <div
        className={`flex items-center justify-between px-6 py-4 border-b ${
          isCompleted
            ? 'border-emerald-500/20'
            : isActive
              ? 'border-cyan-500/20'
              : 'border-slate-700/40'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400'
                : isActive
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-slate-800 text-slate-400'
            }`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-base">{title}</h3>
            <p className="text-base text-slate-400 mt-0.5">{subtitle}</p>
          </div>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-base font-medium bg-emerald-500/10 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </div>
        )}
      </div>

      {/* Body */}
      <div
        className={`px-6 py-5 ${!isActive && !isCompleted ? 'opacity-30 pointer-events-none select-none' : ''}`}
      >
        {children}

        {/* Mark Complete Button */}
        {isActive && !isCompleted && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onMarkComplete}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-base font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {saving ? 'Saving...' : 'Mark Complete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function SummaryModal({
  client,
  onClose,
}: {
  client: ClientData;
  onClose: () => void;
}) {
  const statusRows = [
    {
      label: 'Firebase configured?',
      done:
        client.firebaseSetupStatus.projectCreated &&
        client.firebaseSetupStatus.authEnabled &&
        client.firebaseSetupStatus.firestoreEnabled,
    },
    {
      label: 'Netlify configured?',
      done:
        client.netlifySetupStatus.envVarsAdded ||
        !!client.netlifyAppId ||
        !!client.netlifySiteUrl,
    },
    {
      label: 'Deployed?',
      done: client.netlifySetupStatus.deployed,
    },
    {
      label: 'Live and tested?',
      done: !!client.netlifySiteUrl && client.netlifySetupStatus.deployed,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 shadow-2xl shadow-slate-200/50 dark:shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Client Summary</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Quick overview of the selected client data.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full p-2 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            {
              label: 'Email / Gmail',
              value: client.email || client.googleAccountEmail,
            },
            { label: 'Project Name', value: client.firebaseProjectName },
            { label: 'Firebase Project ID', value: client.firebaseProjectId },
            { label: 'Auth Domain', value: client.firebaseAuthDomain },
            { label: 'Storage Bucket', value: client.firebaseStorageBucket },
            { label: 'Firebase App ID', value: client.firebaseAppId },
            { label: 'GROQ API Key', value: client.groqApiKey },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/80 p-4"
            >
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{item.label}</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-all">
                {item.value || 'Not set'}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/80 p-4">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Status</div>
          <div className="grid gap-3">
            {statusRows.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                  item.done
                    ? 'border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{item.label}</span>
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Create/Edit Page
// ─────────────────────────────────────────────

interface CreateClientPageProps {
  initial?: ClientData;
  docId?: string;
  onBack: () => void;
  onSaved: () => void;
  onDelete?: () => void;
}

export function CreateClientPage({
  initial,
  docId,
  onBack,
  onSaved,
  onDelete,
}: CreateClientPageProps) {
  const [form, setForm] = useState<ClientData>(initial ?? EMPTY_CLIENT);
  const [saving, setSaving] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [clientId, setClientId] = useState<string | undefined>(docId);
  const [showClientAdvanced, setShowClientAdvanced] = useState(false);
  const [showAiNotes, setShowAiNotes] = useState(false);
  const [showEnvPreview, setShowEnvPreview] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [showFirebaseConfigParser, setShowFirebaseConfigParser] =
    useState(false);
  const [firebaseConfigRaw, setFirebaseConfigRaw] = useState('');
  const [firebaseConfigStatus, setFirebaseConfigStatus] = useState<
    string | null
  >(null);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const steps = useMemo(() => [
    {
      key: 'clientInfo' as SectionKey,
      name: 'Basic Info',
      description: "Enter the client's name, mobile number, and unique ID",
      guideText: "Enter the client's name, mobile number, and a unique client ID. This ID will be used across all configs.",
      icon: User,
      colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      key: 'membership' as SectionKey,
      name: 'Membership',
      description: 'Configure subscription level and billing details',
      guideText: 'Set the plan, payment status, and setup fee. This is visible to you only.',
      icon: CreditCard,
      colorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      key: 'firebase' as SectionKey,
      name: 'Firebase Credentials',
      description: 'Google Firebase project credentials',
      guideText: 'Go to console.firebase.google.com → New project → Project settings → Your apps → Add web app. Paste the config values below.',
      icon: Flame,
      colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      key: 'ai' as SectionKey,
      name: 'AI Config',
      description: 'Groq & Gemini API keys and settings',
      guideText: 'Create a Groq account at console.groq.com, generate an API key, and paste it here. Optionally add other AI provider keys.',
      icon: Bot,
      colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      key: 'netlify' as SectionKey,
      name: 'Netlify Config',
      description: 'Netlify site configuration and hosting details',
      guideText: 'On Netlify, create a new site from GitHub, connect this repo, and add all Firebase env vars as environment variables. Paste the site URL below.',
      icon: Server,
      colorClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      key: 'checklist' as SectionKey,
      name: 'Launch Checklist',
      description: 'Final deployment and testing check items',
      guideText: 'Verify each item before handing off to the client. Check off each item as you confirm it.',
      icon: CheckSquare,
      colorClass: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    },
  ], []);

  // Initialize active step index to the first incomplete step
  const [activeStepIndex, setActiveStepIndex] = useState(() => {
    const idx = SECTION_ORDER.findIndex(
      (key) => !initial?.completedSections?.includes(key),
    );
    return idx === -1 ? 5 : idx;
  });

  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getNextYearString = () => {
    const d = new Date();
    const year = d.getFullYear() + 1;
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Populate default dates if they are empty
  useEffect(() => {
    if (!form.joiningDate) {
      patch({ joiningDate: getTodayString() });
    }
    if (!form.expiryDate) {
      patch({ expiryDate: getNextYearString() });
    }
  }, []);

  const envVarsText = useMemo(() => {
    const clientIdString = form.clientId ?? form.clientCode ?? '';
    return [
      `NEXT_PUBLIC_FIREBASE_API_KEY=${form.firebaseApiKey}`,
      `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${form.firebaseAuthDomain}`,
      `NEXT_PUBLIC_FIREBASE_PROJECT_ID=${form.firebaseProjectId}`,
      `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${form.firebaseStorageBucket}`,
      `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${form.firebaseMessagingSenderId}`,
      `NEXT_PUBLIC_FIREBASE_APP_ID=${form.firebaseAppId}`,
      `USERS_LIMIT=2`,
      `GROQ_API_KEY=${form.groqApiKey}`,
      `NEXT_PUBLIC_CLIENT_ID=${clientIdString}`,
      `NEXT_PUBLIC_WHATSAPP_SERVER_URL='${form.whatsapp || ''}'`,
    ].join('\n');
  }, [form]);

  useEffect(() => {
    setClientId(docId);
  }, [docId]);

  function patch(partial: Partial<ClientData>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  function parseFirebaseConfig(raw: string) {
    const cleaned = raw
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\n/g, ' ')
      .trim();

    type FirebaseStringFields = Pick<
      ClientData,
      | 'firebaseApiKey'
      | 'firebaseAuthDomain'
      | 'firebaseProjectId'
      | 'firebaseStorageBucket'
      | 'firebaseMessagingSenderId'
      | 'firebaseAppId'
      | 'firebaseMeasurementId'
    >;
    const parsed: Partial<FirebaseStringFields> = {};
    const helpers: Array<[keyof FirebaseStringFields, RegExp]> = [
      ['firebaseApiKey', /apiKey\s*[:=]\s*['"]([^'"]+)['"]/i],
      ['firebaseAuthDomain', /authDomain\s*[:=]\s*['"]([^'"]+)['"]/i],
      ['firebaseProjectId', /projectId\s*[:=]\s*['"]([^'"]+)['"]/i],
      ['firebaseStorageBucket', /storageBucket\s*[:=]\s*['"]([^'"]+)['"]/i],
      [
        'firebaseMessagingSenderId',
        /messagingSenderId\s*[:=]\s*['"]([^'"]+)['"]/i,
      ],
      ['firebaseAppId', /appId\s*[:=]\s*['"]([^'"]+)['"]/i],
      ['firebaseMeasurementId', /measurementId\s*[:=]\s*['"]([^'"]+)['"]/i],
    ];

    helpers.forEach(([field, regex]) => {
      const match = regex.exec(cleaned);
      if (match?.[1]) {
        parsed[field] = match[1];
      }
    });

    if (Object.keys(parsed).length === 0) {
      setFirebaseConfigStatus(
        'No firebase config values were detected. Paste the config object exactly as provided by Firebase.',
      );
      return;
    }

    patch(parsed);
    setFirebaseConfigStatus(
      'Firebase config parsed successfully (click Save & continue to save to database).',
    );
  }

  async function saveToFirebase(partial: Partial<ClientData>) {
    const updated = { ...form, ...partial };
    setForm(updated);

    if (!updated.fullName.trim()) {
      return;
    }

    setSaving(true);
    try {
      if (clientId) {
        await updateDoc(doc(db, 'clients', clientId), {
          ...partial,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (e) {
      console.error('Failed to save client field:', e);
      throw e;
    } finally {
      setSaving(false);
    }
  }

  function toggleKey(k: string) {
    setShowKeys((prev) => ({ ...prev, [k]: !prev[k] }));
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const value = ev.target?.result as string;
      patch({ firebaseServiceAccountJson: value });
    };
    reader.readAsText(file);
  }

  const allPreviousDone = useMemo(() => {
    return steps.slice(0, 5).every((s) => form.completedSections.includes(s.key));
  }, [form.completedSections, steps]);

  const getStepState = (idx: number): 'done' | 'active' | 'pending' | 'locked' => {
    const stepKey = steps[idx].key;
    if (form.completedSections.includes(stepKey)) {
      return 'done';
    }
    if (idx === activeStepIndex) {
      return 'active';
    }
    if (idx === 5 && !allPreviousDone) {
      return 'locked';
    }
    return 'pending';
  };

  const doneCount = useMemo(() => {
    return steps.filter((s) => form.completedSections.includes(s.key)).length;
  }, [form.completedSections, steps]);

  const firstIncompleteStep = useMemo(() => {
    return steps.find((s) => !form.completedSections.includes(s.key));
  }, [form.completedSections, steps]);

  const validateAndSaveStep = async () => {
    const currentStep = steps[activeStepIndex];
    const payload: Partial<ClientData> = {};

    if (currentStep.key === 'clientInfo') {
      if (!form.fullName.trim()) {
        alert('Full Name is required.');
        return;
      }
      payload.fullName = form.fullName.trim();
      payload.email = form.email.trim();
      payload.mobile = form.mobile.trim();
      payload.whatsapp = form.whatsapp.trim();
      payload.address = form.address.trim();
      payload.city = form.city.trim();
      payload.country = form.country.trim();
      payload.notes = form.notes.trim();
      payload.aiNotes = form.aiNotes.trim();
    } else if (currentStep.key === 'membership') {
      if (!form.joiningDate) {
        alert('Joining Date is required.');
        return;
      }
      if (!form.expiryDate) {
        alert('Expiry Date is required.');
        return;
      }
      payload.subscription = form.subscription;
      payload.membershipStatus = form.membershipStatus;
      payload.joiningDate = form.joiningDate;
      payload.expiryDate = form.expiryDate;
      payload.monthlyFee = form.monthlyFee;
      payload.discount = form.discount;
      payload.amountPaid = form.amountPaid;
    } else if (currentStep.key === 'firebase') {
      if (!form.firebaseProjectName.trim()) {
        alert('Firebase Project Name is required.');
        return;
      }
      if (!form.firebaseProjectId.trim()) {
        alert('Firebase Project ID is required.');
        return;
      }
      if (!form.firebaseApiKey.trim()) {
        alert('Firebase API Key is required.');
        return;
      }
      if (!form.firebaseAppId.trim()) {
        alert('Firebase App ID is required.');
        return;
      }
      payload.googleAccountEmail = form.googleAccountEmail.trim();
      payload.firebaseProjectName = form.firebaseProjectName.trim();
      payload.firebaseProjectId = form.firebaseProjectId.trim();
      payload.firebaseAuthDomain = form.firebaseAuthDomain.trim();
      payload.firebaseStorageBucket = form.firebaseStorageBucket.trim();
      payload.firebaseMessagingSenderId = form.firebaseMessagingSenderId.trim();
      payload.firebaseAppId = form.firebaseAppId.trim();
      payload.firebaseApiKey = form.firebaseApiKey.trim();
      payload.firebaseMeasurementId = form.firebaseMeasurementId.trim();
      payload.firebaseServiceAccountJson = form.firebaseServiceAccountJson;
      payload.firebaseSetupStatus = form.firebaseSetupStatus;
    } else if (currentStep.key === 'ai') {
      if (form.groqActive && !form.groqApiKey.trim()) {
        alert('Groq API Key is required because Groq is active.');
        return;
      }
      if (form.geminiActive && !form.geminiApiKey.trim()) {
        alert('Gemini API Key is required because Gemini is active.');
        return;
      }
      payload.groqApiKey = form.groqApiKey.trim();
      payload.geminiApiKey = form.geminiApiKey.trim();
      payload.groqModelName = form.groqModelName.trim();
      payload.geminiModelName = form.geminiModelName.trim();
      payload.groqActive = form.groqActive;
      payload.geminiActive = form.geminiActive;
      payload.aiNotes = form.aiNotes.trim();
    } else if (currentStep.key === 'netlify') {
      if (!form.netlifySiteUrl.trim()) {
        alert('Netlify Site URL is required.');
        return;
      }
      if (!form.netlifyRepoUrl.trim()) {
        alert('GitHub Repository URL is required.');
        return;
      }
      payload.netlifyAppId = form.netlifyAppId.trim();
      payload.netlifySiteName = form.netlifySiteName.trim();
      payload.netlifySiteUrl = form.netlifySiteUrl.trim();
      payload.netlifyRepoUrl = form.netlifyRepoUrl.trim();
      payload.netlifySetupStatus = form.netlifySetupStatus;
    } else if (currentStep.key === 'checklist') {
      payload.checklist = form.checklist;
    }

    const updatedSections = form.completedSections.includes(currentStep.key)
      ? form.completedSections
      : [...form.completedSections, currentStep.key];

    payload.completedSections = updatedSections;

    try {
      await saveToFirebase(payload);
      onSaved();
      if (activeStepIndex < steps.length - 1) {
        setActiveStepIndex((prev) => prev + 1);
      } else {
        alert('Client configuration and setup successfully finalized!');
      }
    } catch (error) {
      console.error('Failed to save step:', error);
      alert('Error updating database. Please try again.');
    }
  };

  const handleStepClick = (idx: number) => {
    if (idx === 5 && !allPreviousDone) {
      return; // Locked
    }
    setActiveStepIndex(idx);
  };

  const remaining = form.monthlyFee - form.discount - form.amountPaid;
  const activeStep = steps[activeStepIndex];
  const ActiveStepIcon = activeStep.icon;
  const progress = calcOverallProgress(form);

  const renderActiveStepForm = () => {
    switch (activeStep.key) {
      case 'clientInfo':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Client ID">
              <input
                className={inputDisabledCls}
                placeholder="clt-10001"
                value={form.clientId || form.clientCode || ''}
                readOnly
                disabled
              />
            </Field>
            <Field label="Full Name *">
              <input
                className={inputCls}
                placeholder="John Doe"
                value={form.fullName}
                onChange={(e) => patch({ fullName: e.target.value })}
              />
            </Field>
            <Field label="Email Address">
              <input
                type="email"
                className={inputCls}
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => patch({ email: e.target.value })}
              />
            </Field>
            <Field label="Mobile Number">
              <input
                className={inputCls}
                placeholder="+92 300 0000000"
                value={form.mobile}
                onChange={(e) => patch({ mobile: e.target.value })}
              />
            </Field>
            <Field label="WhatsApp Number">
              <input
                className={inputCls}
                placeholder="+92 300 0000000"
                value={form.whatsapp}
                onChange={(e) => patch({ whatsapp: e.target.value })}
              />
            </Field>
            
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowClientAdvanced((s) => !s)}
                className="text-sm text-slate-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-750 bg-slate-900/50 hover:bg-slate-900 transition"
              >
                {showClientAdvanced ? 'Hide advanced details' : 'Show advanced details'}
              </button>
            </div>

            {showClientAdvanced && (
              <>
                <Field label="Address">
                  <input
                    className={inputCls}
                    placeholder="Street, area..."
                    value={form.address}
                    onChange={(e) => patch({ address: e.target.value })}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City">
                    <input
                      className={inputCls}
                      placeholder="Rawalpindi"
                      value={form.city}
                      onChange={(e) => patch({ city: e.target.value })}
                    />
                  </Field>
                  <Field label="Country">
                    <input
                      className={inputCls}
                      placeholder="Pakistan"
                      value={form.country}
                      onChange={(e) => patch({ country: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Client Notes">
                    <textarea
                      className={inputCls + ' resize-none h-32'}
                      placeholder="Notes about the client..."
                      value={form.notes}
                      onChange={(e) => patch({ notes: e.target.value })}
                    />
                  </Field>
                </div>
              </>
            )}
          </div>
        );
      case 'membership':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Membership Type">
              <select
                className={inputCls}
                value={form.subscription}
                onChange={(e) =>
                  patch({ subscription: e.target.value as Subscription })
                }
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </Field>
            <Field label="Status">
              <select
                className={inputCls}
                value={form.membershipStatus}
                onChange={(e) =>
                  patch({
                    membershipStatus: e.target.value as ClientData['membershipStatus'],
                  })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </Field>
            <Field label="Joining Date *">
              <input
                type="date"
                className={inputCls}
                value={form.joiningDate}
                onChange={(e) => patch({ joiningDate: e.target.value })}
              />
            </Field>
            <Field label="Expiry Date *">
              <input
                type="date"
                className={inputCls}
                value={form.expiryDate}
                onChange={(e) => patch({ expiryDate: e.target.value })}
              />
            </Field>
            <Field label="Monthly Fee (PKR)">
              <input
                type="number"
                className={inputCls}
                placeholder="5000"
                value={form.monthlyFee || ''}
                onChange={(e) =>
                  patch({ monthlyFee: parseFloat(e.target.value) || 0 })
                }
              />
            </Field>
            <Field label="Discount (PKR)">
              <input
                type="number"
                className={inputCls}
                placeholder="0"
                value={form.discount || ''}
                onChange={(e) =>
                  patch({ discount: parseFloat(e.target.value) || 0 })
                }
              />
            </Field>
            <Field label="Amount Paid (PKR)">
              <input
                type="number"
                className={inputCls}
                placeholder="0"
                value={form.amountPaid || ''}
                onChange={(e) =>
                  patch({ amountPaid: parseFloat(e.target.value) || 0 })
                }
              />
            </Field>
            <Field label="Remaining Amount (PKR)">
              <input
                readOnly
                disabled
                className={inputDisabledCls}
                value={remaining < 0 ? 0 : remaining}
              />
            </Field>
          </div>
        );
      case 'firebase':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    Paste firebaseConfig
                  </div>
                  <div className="text-sm text-slate-500">
                    Paste the raw Firebase config object and press parse.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowFirebaseConfigParser((prev) => !prev);
                    setFirebaseConfigStatus(null);
                  }}
                  className="rounded-full bg-slate-200 dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10 hover:bg-slate-300 dark:hover:bg-slate-755 transition"
                >
                  {showFirebaseConfigParser
                    ? 'Hide parser'
                    : 'Paste firebaseConfig'}
                </button>
              </div>
              {showFirebaseConfigParser && (
                <div className="mt-3 space-y-3">
                  <textarea
                    value={firebaseConfigRaw}
                    onChange={(e) => setFirebaseConfigRaw(e.target.value)}
                    placeholder="const firebaseConfig = { apiKey: '...', authDomain: '...', projectId: '...', storageBucket: '...', messagingSenderId: '...', appId: '...', measurementId: '...' };"
                    className="min-h-[140px] w-full rounded-2xl border border-slate-350 dark:border-white/10 bg-white dark:bg-slate-955/90 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-405 dark:placeholder:text-slate-500 outline-none focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/20 transition"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => parseFirebaseConfig(firebaseConfigRaw)}
                      className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition"
                    >
                      Parse config
                    </button>
                    <div className="text-sm text-slate-400">
                      {firebaseConfigStatus ??
                        'Enter raw firebaseConfig and parse values automatically.'}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Field label="Google Account Email">
              <input
                className={inputCls}
                placeholder="client@gmail.com"
                value={form.googleAccountEmail}
                onChange={(e) =>
                  patch({ googleAccountEmail: e.target.value })
                }
              />
            </Field>
            <Field label="Project Name *">
              <input
                className={inputCls}
                placeholder="my-orbit-app"
                value={form.firebaseProjectName}
                onChange={(e) =>
                  patch({ firebaseProjectName: e.target.value })
                }
              />
            </Field>
            <Field label="Project ID *">
              <input
                className={inputCls}
                placeholder="my-orbit-app-xyz"
                value={form.firebaseProjectId}
                onChange={(e) =>
                  patch({ firebaseProjectId: e.target.value })
                }
              />
            </Field>
            <Field label="Auth Domain">
              <input
                className={inputCls}
                placeholder="my-app.firebaseapp.com"
                value={form.firebaseAuthDomain}
                onChange={(e) =>
                  patch({ firebaseAuthDomain: e.target.value })
                }
              />
            </Field>
            <Field label="API Key *">
              <input
                className={inputCls}
                placeholder="AIza..."
                value={form.firebaseApiKey}
                onChange={(e) => patch({ firebaseApiKey: e.target.value })}
              />
            </Field>
            <Field label="Storage Bucket">
              <input
                className={inputCls}
                placeholder="my-app.appspot.com"
                value={form.firebaseStorageBucket}
                onChange={(e) =>
                  patch({ firebaseStorageBucket: e.target.value })
                }
              />
            </Field>
            <Field label="Messaging Sender ID">
              <input
                className={inputCls}
                placeholder="123456789"
                value={form.firebaseMessagingSenderId}
                onChange={(e) =>
                  patch({ firebaseMessagingSenderId: e.target.value })
                }
              />
            </Field>
            <Field label="App ID *">
              <div className="relative">
                <input
                  className={inputCls + ' pr-10'}
                  type={showKeys['firebaseAppId'] ? 'text' : 'password'}
                  placeholder="1:123:web:abc"
                  value={form.firebaseAppId}
                  onChange={(e) => patch({ firebaseAppId: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  onClick={() => toggleKey('firebaseAppId')}
                >
                  {showKeys['firebaseAppId'] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Field>
            <Field label="Measurement ID (optional)">
              <input
                className={inputCls}
                placeholder="G-XXXXXXXXXX"
                value={form.firebaseMeasurementId}
                onChange={(e) =>
                  patch({ firebaseMeasurementId: e.target.value })
                }
              />
            </Field>

            <div className="sm:col-span-2">
              <label className={labelCls}>Service Account JSON</label>
              <label className="flex flex-col items-center justify-center gap-2 w-full border border-dashed border-slate-300 dark:border-white/10 rounded-xl py-6 cursor-pointer hover:border-cyan-500/40 transition bg-slate-100/50 dark:bg-slate-800/30">
                <Upload className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-655 dark:text-slate-400">
                  {form.firebaseServiceAccountJson
                    ? '✓ JSON loaded'
                    : 'Click to upload service-account.json'}
                </span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Setup Status</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                {(
                  [
                    ['projectCreated', 'Project Created'],
                    ['firestoreEnabled', 'Firestore Enabled'],
                    ['authEnabled', 'Auth Enabled'],
                    ['fcmConfigured', 'FCM Configured'],
                  ] as const
                ).map(([key, lbl]) => (
                  <StatusCheckbox
                    key={key}
                    label={lbl}
                    checked={form.firebaseSetupStatus[key]}
                    onChange={(v) =>
                      patch({
                        firebaseSetupStatus: {
                          ...form.firebaseSetupStatus,
                          [key]: v,
                        },
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={labelCls + ' mb-0'}>Groq API Key *</label>
                <Toggle
                  checked={form.groqActive}
                  onChange={(v) => patch({ groqActive: v })}
                  label="Groq"
                />
              </div>
              <div className="relative">
                <input
                  className={inputCls + ' pr-10'}
                  type={showKeys['groq'] ? 'text' : 'password'}
                  placeholder="gsk_..."
                  value={form.groqApiKey}
                  onChange={(e) => patch({ groqApiKey: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  onClick={() => toggleKey('groq')}
                >
                  {showKeys['groq'] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <Field label="Groq Model Name">
              <input
                className={inputCls}
                placeholder="llama3-70b-8192"
                value={form.groqModelName}
                onChange={(e) => patch({ groqModelName: e.target.value })}
              />
            </Field>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={labelCls + ' mb-0'}>Gemini API Key *</label>
                <Toggle
                  checked={form.geminiActive}
                  onChange={(v) => patch({ geminiActive: v })}
                  label="Gemini"
                />
              </div>
              <div className="relative">
                <input
                  className={inputCls + ' pr-10'}
                  type={showKeys['gemini'] ? 'text' : 'password'}
                  placeholder="AIza..."
                  value={form.geminiApiKey}
                  onChange={(e) => patch({ geminiApiKey: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  onClick={() => toggleKey('gemini')}
                >
                  {showKeys['gemini'] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <Field label="Gemini Model Name">
              <input
                className={inputCls}
                placeholder="gemini-1.5-pro"
                value={form.geminiModelName}
                onChange={(e) => patch({ geminiModelName: e.target.value })}
              />
            </Field>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAiNotes((s) => !s)}
                className="text-sm text-slate-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-750 bg-slate-900/50 hover:bg-slate-900 transition"
              >
                {showAiNotes ? 'Hide AI notes' : 'Show AI notes'}
              </button>
            </div>

            {showAiNotes && (
              <div className="sm:col-span-2">
                <Field label="AI Notes">
                  <textarea
                    className={inputCls + ' resize-none h-40'}
                    placeholder="Rate limits, special config..."
                    value={form.aiNotes}
                    onChange={(e) => patch({ aiNotes: e.target.value })}
                  />
                </Field>
              </div>
            )}
          </div>
        );
      case 'netlify':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Netlify App ID">
              <input
                className={inputCls}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={form.netlifyAppId}
                onChange={(e) => patch({ netlifyAppId: e.target.value })}
              />
            </Field>
            <Field label="Site Name">
              <input
                className={inputCls}
                placeholder="my-orbit-app"
                value={form.netlifySiteName}
                onChange={(e) => patch({ netlifySiteName: e.target.value })}
              />
            </Field>
            <Field label="Site URL *">
              <input
                className={inputCls}
                placeholder="https://myorbit.netlify.app"
                value={form.netlifySiteUrl}
                onChange={(e) => patch({ netlifySiteUrl: e.target.value })}
              />
            </Field>
            <Field label="GitHub Repository URL *">
              <input
                className={inputCls}
                placeholder="https://github.com/org/repo"
                value={form.netlifyRepoUrl}
                onChange={(e) => patch({ netlifyRepoUrl: e.target.value })}
              />
            </Field>

            <div className="sm:col-span-2">
              <label className={labelCls}>Deployment Status</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {(
                  [
                    ['envVarsAdded', 'Env Vars Added'],
                    ['deployed', 'Site Deployed'],
                    ['customDomain', 'Custom Domain'],
                  ] as const
                ).map(([key, lbl]) => (
                  <StatusCheckbox
                    key={key}
                    label={lbl}
                    checked={form.netlifySetupStatus[key]}
                    onChange={(v) =>
                      patch({
                        netlifySetupStatus: {
                          ...form.netlifySetupStatus,
                          [key]: v,
                        },
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'checklist':
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm text-slate-500 mb-1.5">
                <span>Checklist Progress</span>
                <span>
                  {form.checklist.filter((i) => i.done).length} /{' '}
                  {form.checklist.length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
                  style={{
                    width: `${
                      (form.checklist.filter((i) => i.done).length /
                        form.checklist.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {form.checklist.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    const updated = form.checklist.map((c) =>
                      c.id === item.id ? { ...c, done: !c.done } : c,
                    );
                    patch({ checklist: updated });
                  }}
                  className={`flex items-center gap-3 text-sm rounded-xl px-4 py-3 border text-left transition ${
                    item.done
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/15 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {item.done ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 shrink-0 text-slate-400 dark:text-slate-600" />
                  )}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-lg pb-12 transition-colors duration-300">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-300">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </button>
          {clientId && (
            <>
              <button
                type="button"
                onClick={async () => {
                  setShowEnvPreview(true);
                  await navigator.clipboard.writeText(envVarsText);
                  setCopiedEnv(true);
                  window.setTimeout(() => setCopiedEnv(false), 2000);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-500/20 hover:bg-cyan-500/20 transition animate-fade-in"
              >
                Generate env vars
              </button>
              {showEnvPreview && (
                <button
                  type="button"
                  onClick={() => setShowEnvPreview(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-805 transition"
                >
                  Hide env vars
                </button>
              )}
              {clientId && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500/10 dark:bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-650 dark:text-red-200 border border-red-200 dark:border-red-500/20 hover:bg-red-500/20 dark:hover:bg-red-500/25 transition"
                >
                  Delete client
                </button>
              )}
              {copiedEnv && (
                <span className="text-sm text-emerald-600 dark:text-emerald-300 animate-pulse">
                  Copied env.local text
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <span className="text-sm text-slate-500">{progress}% complete</span>
          <div className="w-32 sm:w-40 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {clientId && showEnvPreview && (
        <div className="max-w-6xl mx-auto px-6 mt-6 animate-slide-down">
          <div className="rounded-2xl border border-cyan-550/20 bg-white dark:bg-slate-900/80 p-5 text-sm text-slate-800 dark:text-slate-200 shadow-md dark:shadow-cyan-950/20">
            <div className="mb-2 text-slate-500 dark:text-slate-400 font-semibold">env.local preview</div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-50 dark:bg-slate-955/80 p-4 text-xs font-mono leading-5 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/5">
              {envVarsText}
            </pre>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Deployment Status:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-550/20">
              {doneCount} of 6 done
            </span>
            {firstIncompleteStep && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-550/20">
                {firstIncompleteStep.name} pending
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Client ID: <span className="text-slate-850 dark:text-slate-300 font-semibold">{form.clientId || form.clientCode || 'N/A'}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Sidebar Stepper */}
          <aside className="w-full md:w-[200px] shrink-0">
            {/* Desktop Stepper */}
            <div className="hidden md:block relative pl-1">
              <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800/80" />
              <div className="space-y-6 relative">
                {steps.map((step, idx) => {
                  const state = getStepState(idx);
                  const isClickable = idx !== 5 || allPreviousDone;
                  
                  return (
                    <button
                      key={step.key}
                      type="button"
                      disabled={!isClickable}
                      onClick={() => handleStepClick(idx)}
                      className={`w-full flex items-start gap-4 text-left group transition focus:outline-none ${
                        !isClickable ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                      }`}
                    >
                      <div className="shrink-0 relative">
                        {state === 'done' && (
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center border border-emerald-400 z-10 relative">
                            <Check className="w-4 h-4 stroke-[3px]" />
                          </div>
                        )}
                        {state === 'active' && (
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm z-10 relative shadow-md">
                            {idx + 1}
                          </div>
                        )}
                        {state === 'pending' && (
                          <div className="w-8 h-8 rounded-full bg-transparent border-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 group-hover:border-slate-450 dark:group-hover:border-slate-500 group-hover:text-slate-850 dark:group-hover:text-slate-300 flex items-center justify-center text-sm z-10 relative">
                            {idx + 1}
                          </div>
                        )}
                        {state === 'locked' && (
                          <div className="w-8 h-8 rounded-full bg-transparent border-2 border-slate-200 dark:border-slate-805 text-slate-400 dark:text-slate-600 flex items-center justify-center text-sm z-10 relative">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0 pt-0.5">
                        <p className={`text-sm font-semibold transition ${
                          state === 'active'
                            ? 'text-cyan-600 dark:text-cyan-400'
                            : state === 'done'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                        }`}>
                          {step.name}
                        </p>
                        <p className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${
                          state === 'done'
                            ? 'text-emerald-600 dark:text-emerald-500'
                            : state === 'active'
                            ? 'text-cyan-600 dark:text-cyan-550'
                            : state === 'locked'
                            ? 'text-slate-400 dark:text-slate-700'
                            : 'text-slate-500'
                        }`}>
                          {state === 'done' && 'Done'}
                          {state === 'active' && 'In progress'}
                          {state === 'pending' && 'Pending'}
                          {state === 'locked' && 'Locked'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Stepper */}
            <div className="md:hidden relative mb-6">
              <div className="absolute left-6 right-6 top-4 h-0.5 bg-slate-200 dark:bg-slate-800/80 -z-10" />
              <div className="flex items-center justify-between gap-1">
                {steps.map((step, idx) => {
                  const state = getStepState(idx);
                  const isClickable = idx !== 5 || allPreviousDone;
                  
                  return (
                    <button
                      key={step.key}
                      type="button"
                      disabled={!isClickable}
                      onClick={() => handleStepClick(idx)}
                      className={`flex flex-col items-center gap-1 focus:outline-none ${
                        !isClickable ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                      }`}
                    >
                      <div className="relative">
                        {state === 'done' && (
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center border border-emerald-400 shadow-md">
                            <Check className="w-4 h-4 stroke-[3px]" />
                          </div>
                        )}
                        {state === 'active' && (
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-cyan-500 text-cyan-650 dark:text-cyan-400 flex items-center justify-center font-bold text-sm shadow-md">
                            {idx + 1}
                          </div>
                        )}
                        {state === 'pending' && (
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-955 border-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-sm shadow-md">
                            {idx + 1}
                          </div>
                        )}
                        {state === 'locked' && (
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-955 border-2 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 flex items-center justify-center text-sm">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Step {activeStepIndex + 1} of 6: <span className="text-slate-900 dark:text-white font-semibold">{steps[activeStepIndex].name}</span>
                </span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  getStepState(activeStepIndex) === 'done' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                }`}>
                  {getStepState(activeStepIndex) === 'done' ? 'Done' : 'In Progress'}
                </span>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Form Panel */}
          <main className="flex-1 min-w-0">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900/40 p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6 transition-colors duration-300">
              
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${activeStep.colorClass}`}>
                  <ActiveStepIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">
                    {activeStep.name}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {activeStep.description}
                  </p>
                </div>
              </div>

              {/* Teal Guide Box */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-500/20 text-teal-850 dark:text-teal-200 text-sm leading-relaxed shadow-sm">
                <Lightbulb className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-teal-700 dark:text-teal-300 mr-1">Instructions:</span>
                  {activeStep.guideText}
                </div>
              </div>

              {/* Form Content */}
              <div className="pt-2">
                {renderActiveStepForm()}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/5 mt-8">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => prev - 1)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm font-semibold transition ${
                    activeStepIndex === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                <button
                  type="button"
                  onClick={validateAndSaveStep}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white text-sm font-semibold shadow-lg shadow-cyan-500/10 transition disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {activeStepIndex === 5 ? 'Finish Setup' : 'Save & continue'}
                      <span className="ml-0.5">→</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
