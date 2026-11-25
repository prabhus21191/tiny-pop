# Tiny Pop – build the Android APK

Everything is ready; the last step (compiling) needs the Android SDK, which only a normal computer can download.

## One-time setup
1. Install **Node.js 22+** (nodejs.org).
2. Install **Android Studio** (developer.android.com/studio). Open it once and let it download the SDK. It includes JDK 21.
3. Set `ANDROID_HOME` to the SDK folder if Android Studio has not done it for you
   (Windows: `%LOCALAPPDATA%\Android\Sdk`, Mac: `~/Library/Android/sdk`).

## Build the APK
Open a terminal in this folder and run:

    npm install
    npm run apk

The APK appears at `android/app/build/outputs/apk/debug/app-debug.apk`.
Copy it to your phone (USB, Drive, WhatsApp to yourself) and open it. Allow "install unknown apps" when asked.

The script also removes the INTERNET permission, so the app really is offline.

## Publishing on Google Play (optional)
    npm run release-aab
Sign the bundle in Android Studio (Build > Generate Signed Bundle) and upload it in Play Console.
Because Tiny Pop is aimed at children, Play will ask you to complete the Families policy declaration.

## Quick test without Android
Open `www/index.html` in Chrome (phone or desktop). On a phone, host the `www` folder anywhere and use "Add to Home screen" for an app-style icon.
`www/manifest.json` and `www/sw.js` also make it work with PWABuilder.com if you prefer to generate the package online.

## Files
- `www/index.html` – the whole app (single file, no libraries, no network calls)
- `capacitor.config.json`, `package.json`, `scripts/build-apk.js` – Android wrapper and build script
- `assets/icon.png` – app icon source (pink-to-blue square with a smiling bubble)

## No installs? Let GitHub build it for you
1. Create a free GitHub account and a new private repository.
2. Upload everything in this folder (including the hidden `.github` folder) to the repository.
3. Open the **Actions** tab, choose **Build Tiny Pop APK**, and press **Run workflow**.
4. After a few minutes, open the finished run and download **TinyPop-apk** (a zip containing `app-debug.apk`).
