import { useNavigate, useSearchParams } from 'react-router-dom';
import { type FormEvent, Suspense, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

const isDev = import.meta.env.VITE_CREATE_ENV === 'DEVELOPMENT';

const PROVIDER_LABELS: Record<string, string> = {
  google: 'Google',
  apple: 'Apple',
};

const devPasswordForEmail = (email: string) => `dev-social-${email}`;

function SocialDevShim() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider') || 'google';
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const label = PROVIDER_LABELS[provider] ?? provider;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missingSecrets, setMissingSecrets] = useState<string[]>([]);

  useEffect(() => {
    if (!isDev) {
      void navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`/api/__create/check-social-secrets?provider=${encodeURIComponent(provider)}`)
      .then((r) => r.json())
      .then((data) => setMissingSecrets(data.missing ?? []))
      .catch((err) => {
        console.error('Failed to check social secrets:', err);
      });
  }, [provider]);

  if (!isDev) {
    return null;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const password = devPasswordForEmail(email);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });
    if (signInError) {
      const { error: signUpError } = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (signUpError) {
        setError(signUpError.message ?? 'Dev sign-in failed');
        setLoading(false);
        return;
      }
    }

    window.location.href = callbackUrl;
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-[16px]">
      <div className="flex w-full max-w-[400px] flex-col gap-[16px] rounded-[12px] bg-white p-[24px] shadow">
        <div className="rounded-[8px] border border-amber-400 bg-amber-50 p-[10px] text-[13px] text-amber-800">
          <strong>Development mode</strong> — this is a simulated {label} sign-in. In
          production, users will see the real {label} login screen.
        </div>

        {missingSecrets.length > 0 && (
          <div className="rounded-[8px] border border-red-300 bg-red-50 p-[10px] text-[13px] text-red-700">
            <strong>{label} isn&apos;t configured yet.</strong> Add these in project
            settings → Authentication or {label} sign-in won&apos;t work once published:{' '}
            {missingSecrets.join(', ')}
          </div>
        )}

        <h1 className="text-[24px] font-semibold">Sign in with {label}</h1>

        <form
          onSubmit={(e) => {
            void onSubmit(e);
          }}
          className="flex flex-col gap-[16px]"
        >
          <label className="flex flex-col gap-[4px] text-[14px]">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              className="rounded-[8px] border border-gray-300 p-[10px] text-[16px] outline-none focus:border-blue-500"
            />
          </label>

          <label className="flex flex-col gap-[4px] text-[14px]">
            Display name <span className="text-gray-400">(optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Test User"
              className="rounded-[8px] border border-gray-300 p-[10px] text-[16px] outline-none focus:border-blue-500"
            />
          </label>

          {error && (
            <div className="rounded-[8px] bg-red-50 p-[10px] text-[14px] text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-[8px] bg-gray-900 p-[12px] text-[16px] font-medium text-white disabled:opacity-50"
          >
            {loading ? 'Signing in…' : `Continue as ${label} user`}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function SocialDevShimPage() {
  return (
    <Suspense>
      <SocialDevShim />
    </Suspense>
  );
}
