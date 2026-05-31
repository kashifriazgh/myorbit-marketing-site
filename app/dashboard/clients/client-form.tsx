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
  'firebase',
  'ai',
  'netlify',
  'membership',
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
  'w-full rounded-2xl border border-slate-600 bg-slate-900 text-slate-100 px-4 py-3 text-lg placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition shadow-sm shadow-slate-950/20';

const labelCls = 'block text-lg font-semibold text-slate-200 mb-2';
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
          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
          : 'bg-slate-800 border-white/10 text-slate-400'
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
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
      }`}
    >
      {checked ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <Circle className="w-4 h-4 shrink-0" />
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
        className="w-full max-w-2xl rounded-3xl bg-slate-950 border border-white/10 p-6 shadow-2xl shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Client Summary</h2>
            <p className="text-base text-slate-400 mt-1">
              Quick overview of the selected client data.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded-full p-2 transition"
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
              className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
            >
              <div className="text-base text-slate-500 mb-2">{item.label}</div>
              <div className="text-base text-slate-100 break-all">
                {item.value || 'Not set'}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <div className="text-base text-slate-400 mb-4">Status</div>
          <div className="grid gap-3">
            {statusRows.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                  item.done
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/10 bg-slate-900/70 text-slate-300'
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
  const [enabledSections, setEnabledSections] = useState<SectionKey[]>([]);
  const [clientId, setClientId] = useState<string | undefined>(docId);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    saveToFirebase(parsed);
    setFirebaseConfigStatus(
      'Firebase config parsed and inserted successfully.',
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
      } else {
        console.error(
          'saveToFirebase called without a valid clientId. Client creation must be done via the dashboard modal.',
        );
      }
    } catch (e) {
      console.error('Failed to save client field:', e);
    } finally {
      setSaving(false);
    }
  }

  function toggleKey(k: string) {
    setShowKeys((prev) => ({ ...prev, [k]: !prev[k] }));
  }

  const isCompleted = (s: SectionKey) => form.completedSections.includes(s);
  const isEnabled = (s: SectionKey) => enabledSections.includes(s);
  const isActive = (s: SectionKey) => {
    const idx = SECTION_ORDER.indexOf(s);
    if (idx === 0) return true;
    return isCompleted(SECTION_ORDER[idx - 1]) || isEnabled(s);
  };

  function enableEditing(section: SectionKey) {
    if (!enabledSections.includes(section)) {
      setEnabledSections((prev) => [...prev, section]);
    }
  }

  const progress = calcOverallProgress(form);

  async function markComplete(section: SectionKey) {
    if (isCompleted(section)) return;
    if (section === 'clientInfo' && !form.fullName.trim()) {
      alert('Please enter the client full name before saving this section.');
      return;
    }

    const updatedSections = [...form.completedSections, section];
    setForm((prev) => ({ ...prev, completedSections: updatedSections }));
    await saveToFirebase({ completedSections: updatedSections });
    onSaved();
  }

  async function saveChecklist() {
    const updatedSections: SectionKey[] = form.completedSections.includes(
      'checklist',
    )
      ? form.completedSections
      : [...form.completedSections, 'checklist'];

    setForm((prev) => ({
      ...prev,
      completedSections: updatedSections,
    }));

    await saveToFirebase({
      checklist: form.checklist,
      completedSections: updatedSections,
    });
    onSaved();
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const value = ev.target?.result as string;
      patch({ firebaseServiceAccountJson: value });
      await saveToFirebase({ firebaseServiceAccountJson: value });
    };
    reader.readAsText(file);
  }

  const remaining = form.monthlyFee - form.discount - form.amountPaid;

  return (
    <div className="min-h-screen bg-slate-950 text-white text-lg">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-white/5 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-base text-slate-400 hover:text-white transition"
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
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-base font-semibold text-cyan-200 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
              >
                Generate env vars
              </button>
              {showEnvPreview && (
                <button
                  type="button"
                  onClick={() => setShowEnvPreview(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 text-base font-semibold text-slate-300 border border-white/10 hover:bg-slate-800 transition"
                >
                  Hide env vars
                </button>
              )}
              {clientId && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-base font-semibold text-red-200 border border-red-500/20 hover:bg-red-500/25 transition"
                >
                  Delete client
                </button>
              )}
              {copiedEnv && (
                <span className="text-base text-emerald-300">
                  Copied env.local text
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-base text-slate-500">{progress}% complete</span>
          <div className="w-40 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      {clientId && showEnvPreview && (
        <div className="mt-3 rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-4 text-base text-slate-200">
          <div className="mb-2 text-slate-400">env.local preview</div>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950/80 p-4 text-base leading-6">
            {envVarsText}
          </pre>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-6">
          {/* Sidebar - desktop */}
          <aside className="hidden md:block w-1/4">
            <div className="sticky top-20 space-y-4">
              <h4 className="text-base text-slate-400 mb-2">Setup Steps</h4>
              <div className="space-y-2">
                {[
                  ['clientInfo', "Client's Basic Info"],
                  ['firebase', 'Firebase Project Created'],
                  ['ai', 'Groq API Generated'],
                  ['netlify', 'Netlify Project Created'],
                  ['envVars', 'Environment Vars Added'],
                  ['deployed', 'Deployed'],
                  ['whatsapp', 'WhatsApp Tested'],
                  ['push', 'Push Notification Tested'],
                ].map(([key, label]) => {
                  // determine done state
                  let done = false;
                  if (key === 'envVars') {
                    done = !!form.checklist.find(
                      (c) =>
                        c.label === 'Environment Variables Added' && c.done,
                    );
                  } else if (key === 'deployed') {
                    done = !!form.checklist.find(
                      (c) => c.label === 'Site Deployed' && c.done,
                    );
                  } else if (key === 'whatsapp') {
                    done = !!form.checklist.find(
                      (c) => c.label === 'WhatsApp Connected' && c.done,
                    );
                  } else if (key === 'push') {
                    done = !!form.checklist.find(
                      (c) => c.label === 'Push Notifications Tested' && c.done,
                    );
                  } else {
                    done = form.completedSections.includes(key as SectionKey);
                  }

                  return (
                    <div
                      key={key}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${done ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-300'}`}
                    >
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                      )}
                      <div className="text-base text-slate-100">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-6">
            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
              <div className="md:hidden fixed inset-0 z-50 bg-black/40">
                <div className="absolute left-0 top-0 h-full w-3/4 bg-slate-950 p-4 overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-base text-slate-400">Setup Steps</h4>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="text-slate-400"
                    >
                      Close
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[
                      ['clientInfo', "Client's Basic Info"],
                      ['firebase', 'Firebase Project Created'],
                      ['ai', 'Groq API Generated'],
                      ['netlify', 'Netlify Project Created'],
                      ['envVars', 'Environment Vars Added'],
                      ['deployed', 'Deployed'],
                      ['whatsapp', 'WhatsApp Tested'],
                      ['push', 'Push Notification Tested'],
                    ].map(([key, label]) => {
                      let done = false;
                      if (key === 'envVars') {
                        done = !!form.checklist.find(
                          (c) =>
                            c.label === 'Environment Variables Added' && c.done,
                        );
                      } else if (key === 'deployed') {
                        done = !!form.checklist.find(
                          (c) => c.label === 'Site Deployed' && c.done,
                        );
                      } else if (key === 'whatsapp') {
                        done = !!form.checklist.find(
                          (c) => c.label === 'WhatsApp Connected' && c.done,
                        );
                      } else if (key === 'push') {
                        done = !!form.checklist.find(
                          (c) =>
                            c.label === 'Push Notifications Tested' && c.done,
                        );
                      } else {
                        done = form.completedSections.includes(
                          key as SectionKey,
                        );
                      }
                      return (
                        <div
                          key={key}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${done ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-300' : 'bg-slate-900/40 border-white/5 text-slate-300'}`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                          )}
                          <div className="text-base text-slate-100">{label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold">
                {docId ? form.fullName || 'Edit Client' : 'New Client Setup'}
              </h1>
              <p className="text-slate-400 mt-1 text-lg">
                Follow each section in order to configure and deploy the
                client&#39;s app
              </p>
            </div>

            {/* ── 1. CLIENT INFO ── */}
            <SectionCard
              sectionKey="clientInfo"
              title="Client Information"
              subtitle="Basic contact details"
              icon={<User className="w-4 h-4" />}
              isActive={isActive('clientInfo')}
              isCompleted={isCompleted('clientInfo')}
              onMarkComplete={() => markComplete('clientInfo')}
              onEnableEditing={() => enableEditing('clientInfo')}
              saving={saving}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Client ID">
                  <input
                    className={inputCls}
                    placeholder="clt-10001"
                    value={form.clientId ?? form.clientCode ?? ''}
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
                    onBlur={(e) => saveToFirebase({ fullName: e.target.value })}
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => patch({ email: e.target.value })}
                    onBlur={(e) => saveToFirebase({ email: e.target.value })}
                  />
                </Field>
                <Field label="Mobile Number">
                  <input
                    className={inputCls}
                    placeholder="+92 300 0000000"
                    value={form.mobile}
                    onChange={(e) => patch({ mobile: e.target.value })}
                    onBlur={(e) => saveToFirebase({ mobile: e.target.value })}
                  />
                </Field>
                <Field label="WhatsApp Number">
                  <input
                    className={inputCls}
                    placeholder="+92 300 0000000"
                    value={form.whatsapp}
                    onChange={(e) => patch({ whatsapp: e.target.value })}
                    onBlur={(e) => saveToFirebase({ whatsapp: e.target.value })}
                  />
                </Field>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowClientAdvanced((s) => !s)}
                    className="text-base text-slate-400 px-3 py-1 rounded-lg border hover:border-white/10"
                  >
                    {showClientAdvanced ? 'Hide details' : 'Show more'}
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
                        onBlur={(e) =>
                          saveToFirebase({ address: e.target.value })
                        }
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="City">
                        <input
                          className={inputCls}
                          placeholder="Rawalpindi"
                          value={form.city}
                          onChange={(e) => patch({ city: e.target.value })}
                          onBlur={(e) =>
                            saveToFirebase({ city: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Country">
                        <input
                          className={inputCls}
                          placeholder="Pakistan"
                          value={form.country}
                          onChange={(e) => patch({ country: e.target.value })}
                          onBlur={(e) =>
                            saveToFirebase({ country: e.target.value })
                          }
                        />
                      </Field>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="sm:col-span-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowAiNotes((s) => !s)}
                          className="text-base text-slate-400 px-3 py-1 rounded-lg border hover:border-white/10"
                        >
                          {showAiNotes ? 'Hide AI notes' : 'Show AI notes'}
                        </button>
                      </div>

                      {showAiNotes && (
                        <div className="sm:col-span-2">
                          <Field label="AI Notes">
                            <textarea
                              className={inputCls + ' resize-none h-40'}
                              placeholder="AI generated notes or prompts..."
                              value={form.aiNotes}
                              onChange={(e) =>
                                patch({ aiNotes: e.target.value })
                              }
                              onBlur={(e) =>
                                saveToFirebase({ aiNotes: e.target.value })
                              }
                            />
                          </Field>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </SectionCard>

            {/* ── 2. FIREBASE CONFIG ── */}
            <SectionCard
              sectionKey="firebase"
              title="Firebase Configuration"
              subtitle="Google Firebase project credentials"
              icon={<Flame className="w-4 h-4" />}
              isActive={isActive('firebase')}
              isCompleted={isCompleted('firebase')}
              onMarkComplete={() => markComplete('firebase')}
              onEnableEditing={() => enableEditing('firebase')}
              saving={saving}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-base font-semibold text-slate-100">
                        Paste firebaseConfig
                      </div>
                      <div className="text-base text-slate-500">
                        Paste the raw Firebase config object and press parse.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowFirebaseConfigParser((prev) => !prev);
                        setFirebaseConfigStatus(null);
                      }}
                      className="rounded-full bg-slate-800 px-4 py-2 text-base font-semibold text-slate-200 border border-white/10 hover:bg-slate-700 transition"
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
                        className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500/30 focus:ring-2 focus:ring-cyan-500/20 transition"
                      />
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <button
                          type="button"
                          onClick={() => parseFirebaseConfig(firebaseConfigRaw)}
                          className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-base font-semibold text-slate-950 hover:bg-cyan-400 transition"
                        >
                          Parse config
                        </button>
                        <div className="text-base text-slate-400">
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
                    onBlur={(e) =>
                      saveToFirebase({ googleAccountEmail: e.target.value })
                    }
                  />
                </Field>
                <Field label="Project Name">
                  <input
                    className={inputCls}
                    placeholder="my-orbit-app"
                    value={form.firebaseProjectName}
                    onChange={(e) =>
                      patch({ firebaseProjectName: e.target.value })
                    }
                    onBlur={(e) =>
                      saveToFirebase({ firebaseProjectName: e.target.value })
                    }
                  />
                </Field>
                <Field label="Project ID">
                  <input
                    className={inputCls}
                    placeholder="my-orbit-app-xyz"
                    value={form.firebaseProjectId}
                    onChange={(e) =>
                      patch({ firebaseProjectId: e.target.value })
                    }
                    onBlur={(e) =>
                      saveToFirebase({ firebaseProjectId: e.target.value })
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
                    onBlur={(e) =>
                      saveToFirebase({ firebaseAuthDomain: e.target.value })
                    }
                  />
                </Field>
                <Field label="API Key">
                  <input
                    className={inputCls}
                    placeholder="AIza..."
                    value={form.firebaseApiKey}
                    onChange={(e) => patch({ firebaseApiKey: e.target.value })}
                    onBlur={(e) =>
                      saveToFirebase({ firebaseApiKey: e.target.value })
                    }
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
                    onBlur={(e) =>
                      saveToFirebase({ firebaseStorageBucket: e.target.value })
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
                    onBlur={(e) =>
                      saveToFirebase({
                        firebaseMessagingSenderId: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="App ID">
                  <div className="relative">
                    <input
                      className={inputCls + ' pr-10'}
                      type={showKeys['firebaseAppId'] ? 'text' : 'password'}
                      placeholder="1:123:web:abc"
                      value={form.firebaseAppId}
                      onChange={(e) => patch({ firebaseAppId: e.target.value })}
                      onBlur={(e) =>
                        saveToFirebase({ firebaseAppId: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
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
                    onBlur={(e) =>
                      saveToFirebase({ firebaseMeasurementId: e.target.value })
                    }
                  />
                </Field>

                {/* Service Account JSON Upload */}
                <div className="sm:col-span-2">
                  <label className={labelCls}>Service Account JSON</label>
                  <label className="flex flex-col items-center justify-center gap-2 w-full border border-dashed border-white/10 rounded-xl py-6 cursor-pointer hover:border-cyan-500/40 transition bg-slate-800/30">
                    <Upload className="w-5 h-5 text-slate-500" />
                    <span className="text-base text-slate-500">
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

                {/* Setup Status */}
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
                          saveToFirebase({
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
            </SectionCard>

            {/* ── 3. AI CONFIG ── */}
            <SectionCard
              sectionKey="ai"
              title="AI Configuration"
              subtitle="Groq & Gemini API keys"
              icon={<Bot className="w-4 h-4" />}
              isActive={isActive('ai')}
              isCompleted={isCompleted('ai')}
              onMarkComplete={() => markComplete('ai')}
              onEnableEditing={() => enableEditing('ai')}
              saving={saving}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={labelCls + ' mb-0'}>Groq API Key</label>
                    <Toggle
                      checked={form.groqActive}
                      onChange={(v) => saveToFirebase({ groqActive: v })}
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
                      onBlur={(e) =>
                        saveToFirebase({ groqApiKey: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
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
                    onBlur={(e) =>
                      saveToFirebase({ groqModelName: e.target.value })
                    }
                  />
                </Field>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={labelCls + ' mb-0'}>Gemini API Key</label>
                    <Toggle
                      checked={form.geminiActive}
                      onChange={(v) => saveToFirebase({ geminiActive: v })}
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
                      onBlur={(e) =>
                        saveToFirebase({ geminiApiKey: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
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
                    onBlur={(e) =>
                      saveToFirebase({ geminiModelName: e.target.value })
                    }
                  />
                </Field>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAiNotes((s) => !s)}
                    className="text-base text-slate-400 px-3 py-1 rounded-lg border hover:border-white/10"
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
                        onBlur={(e) =>
                          saveToFirebase({ aiNotes: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* ── 4. NETLIFY CONFIG ── */}
            <SectionCard
              sectionKey="netlify"
              title="Netlify Configuration"
              subtitle="Deployment & hosting setup"
              icon={<Server className="w-4 h-4" />}
              isActive={isActive('netlify')}
              isCompleted={isCompleted('netlify')}
              onMarkComplete={() => markComplete('netlify')}
              onEnableEditing={() => enableEditing('netlify')}
              saving={saving}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Netlify App ID">
                  <input
                    className={inputCls}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={form.netlifyAppId}
                    onChange={(e) => patch({ netlifyAppId: e.target.value })}
                    onBlur={(e) =>
                      saveToFirebase({ netlifyAppId: e.target.value })
                    }
                  />
                </Field>
                <Field label="Site Name">
                  <input
                    className={inputCls}
                    placeholder="my-orbit-app"
                    value={form.netlifySiteName}
                    onChange={(e) => patch({ netlifySiteName: e.target.value })}
                    onBlur={(e) =>
                      saveToFirebase({ netlifySiteName: e.target.value })
                    }
                  />
                </Field>
                <Field label="Site URL">
                  <input
                    className={inputCls}
                    placeholder="https://myorbit.netlify.app"
                    value={form.netlifySiteUrl}
                    onChange={(e) => patch({ netlifySiteUrl: e.target.value })}
                    onBlur={(e) =>
                      saveToFirebase({ netlifySiteUrl: e.target.value })
                    }
                  />
                </Field>
                <Field label="GitHub Repository URL">
                  <input
                    className={inputCls}
                    placeholder="https://github.com/org/repo"
                    value={form.netlifyRepoUrl}
                    onChange={(e) => patch({ netlifyRepoUrl: e.target.value })}
                    onBlur={(e) =>
                      saveToFirebase({ netlifyRepoUrl: e.target.value })
                    }
                  />
                </Field>
                {/* GitHub Branch field removed as requested */}

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
                          saveToFirebase({
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
            </SectionCard>

            {/* ── 5. MEMBERSHIP ── */}
            <SectionCard
              sectionKey="membership"
              title="Membership Information"
              subtitle="Subscription & billing details"
              icon={<CreditCard className="w-4 h-4" />}
              isActive={isActive('membership')}
              isCompleted={isCompleted('membership')}
              onMarkComplete={() => markComplete('membership')}
              onEnableEditing={() => enableEditing('membership')}
              saving={saving}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Membership Type">
                  <select
                    className={inputCls}
                    value={form.subscription}
                    onChange={(e) =>
                      patch({ subscription: e.target.value as Subscription })
                    }
                    onBlur={(e) =>
                      saveToFirebase({
                        subscription: e.target.value as Subscription,
                      })
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
                        membershipStatus: e.target
                          .value as ClientData['membershipStatus'],
                      })
                    }
                    onBlur={(e) =>
                      saveToFirebase({
                        membershipStatus: e.target
                          .value as ClientData['membershipStatus'],
                      })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="expired">Expired</option>
                  </select>
                </Field>
                <Field label="Joining Date">
                  <input
                    type="date"
                    className={inputCls}
                    value={form.joiningDate}
                    onChange={(e) => patch({ joiningDate: e.target.value })}
                    onBlur={(e) =>
                      saveToFirebase({ joiningDate: e.target.value })
                    }
                  />
                </Field>
                <Field label="Expiry Date">
                  <input
                    type="date"
                    className={inputCls}
                    value={form.expiryDate}
                    onChange={(e) => patch({ expiryDate: e.target.value })}
                    onBlur={(e) =>
                      saveToFirebase({ expiryDate: e.target.value })
                    }
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
                    onBlur={(e) =>
                      saveToFirebase({
                        monthlyFee: parseFloat(e.target.value) || 0,
                      })
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
                    onBlur={(e) =>
                      saveToFirebase({
                        discount: parseFloat(e.target.value) || 0,
                      })
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
                    onBlur={(e) =>
                      saveToFirebase({
                        amountPaid: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </Field>
                <Field label="Remaining Amount (PKR)">
                  <input
                    readOnly
                    className={inputCls + ' bg-slate-700/30 cursor-not-allowed'}
                    value={remaining < 0 ? 0 : remaining}
                  />
                </Field>
              </div>
            </SectionCard>

            {/* ── 6. DEPLOYMENT CHECKLIST ── */}
            <SectionCard
              sectionKey="checklist"
              title="Deployment Checklist"
              subtitle="End-to-end setup progress tracker"
              icon={<CheckSquare className="w-4 h-4" />}
              isActive={isActive('checklist')}
              isCompleted={isCompleted('checklist')}
              onMarkComplete={saveChecklist}
              onEnableEditing={() => enableEditing('checklist')}
              saving={saving}
            >
              {/* Mini progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-base text-slate-500 mb-1.5">
                  <span>Checklist Progress</span>
                  <span>
                    {form.checklist.filter((i) => i.done).length} /{' '}
                    {form.checklist.length}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {form.checklist.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const updated = form.checklist.map((c) =>
                        c.id === item.id ? { ...c, done: !c.done } : c,
                      );
                      saveToFirebase({ checklist: updated });
                    }}
                    className={`flex items-center gap-2.5 text-base rounded-xl px-3 py-2.5 border text-left transition ${
                      item.done
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-800/40 border-white/5 text-slate-400 hover:border-white/15'
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 shrink-0 text-slate-600" />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </SectionCard>
          </main>
        </div>
      </div>
    </div>
  );
}
