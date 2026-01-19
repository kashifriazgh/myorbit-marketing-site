'use client';

export default function TestPushPage() {
  const sendNotification = async () => {
    const res = await fetch('/api/send-notification', {
      method: 'POST',
    });

    const data = await res.json();
    console.log('Push response:', data);

    if (data.success) {
      alert('✅ Notification sent');
    } else {
      alert('❌ Failed to send notification');
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">
        OneSignal Push Test
      </h1>

      <button
        onClick={sendNotification}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Send Test Notification
      </button>
    </div>
  );
}
