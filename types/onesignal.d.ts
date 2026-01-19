// OneSignal SDK Type Definitions
interface OneSignalSDK {
  init(options: {
    appId: string;
    safari_web_id?: string;
    notifyButton?: { enable: boolean };
    allowLocalhostAsSecureOrigin?: boolean;
  }): Promise<void>;
  Notifications: {
    requestPermission(): Promise<boolean>;
  };
  Slidedown?: {
    promptPush(): Promise<void>;
  };
}

interface Window {
  OneSignalDeferred?: Array<(OneSignal: OneSignalSDK) => void | Promise<void>>;
  OneSignal?: OneSignalSDK;
}

