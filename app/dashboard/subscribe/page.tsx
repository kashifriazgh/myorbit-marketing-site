"use client";

export default function NotificationSubscribe() {
    const subscribe = async () => {
        if (!window.OneSignalDeferred) {
          console.error("OneSignal SDK not loaded");
          return;
        }
      
        window.OneSignalDeferred.push(async (OneSignal) => {
          try {
            // Check if OneSignal is initialized
            if (!OneSignal || !OneSignal.Notifications) {
              console.error("OneSignal not initialized");
              return;
            }

            // Request notification permission (correct method for SDK v16)
            const permission = await OneSignal.Notifications.requestPermission();
            
            if (permission) {
              console.log("Notification permission granted");
              // Optionally show a success message to the user
            } else {
              console.log("Notification permission denied");
            }
          } catch (error) {
            console.error("Error requesting notification permission:", error);
            // Handle domain restriction error gracefully
            if (error instanceof Error && error.message.includes("Can only be used on")) {
              console.warn("OneSignal is configured for a specific domain. Please test on the configured domain or update OneSignal settings.");
            }
          }
        });
      };
      

  return (
    <button onClick={subscribe} className="px-4 py-2 bg-black text-white rounded">
      Enable Notifications
    </button>
  );
}
