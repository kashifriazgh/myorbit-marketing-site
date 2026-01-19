"use client";

import Script from "next/script";

export default function OneSignalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" strategy="afterInteractive" />
      <Script
        id="onesignal-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              try {
                await OneSignal.init({
                  appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",
                  safari_web_id: "web.onesignal.auto.477dedc8-8bcf-40fd-b64c-238033111672",
                  notifyButton: { enable: true },
                  allowLocalhostAsSecureOrigin: true,
                });
                console.log("OneSignal initialized successfully");
              } catch (error) {
                console.error("OneSignal initialization error:", error);
                // Handle domain restriction error
                if (error.message && error.message.includes("Can only be used on")) {
                  console.warn("OneSignal domain restriction: Please ensure you're testing on the configured domain (https://www.myorbit.site) or update OneSignal dashboard settings to allow localhost.");
                }
              }
            });
          `,
        }}
      />
      {children}
    </>
  );
}
