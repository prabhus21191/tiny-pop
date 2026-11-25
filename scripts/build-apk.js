// One-command Android build for Tiny Pop.  Usage:  npm install  &&  npm run apk
// Needs: Node 22+, JDK 21 and the Android SDK (both come with Android Studio).
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const win = process.platform === 'win32';
const run = (cmd, cwd) => { console.log('\n> ' + cmd); execSync(cmd, { stdio: 'inherit', cwd: cwd || root }); };

if (!fs.existsSync(path.join(root, 'android'))) {
  run('npx cap add android');
}
patchManifest();
run('npx capacitor-assets generate --android --iconBackgroundColor "#FFBEDC" --iconBackgroundColorDark "#FFBEDC"');
run('npx cap sync android');
patchManifest();

const release = process.argv[2] === 'release';
const gradle = win ? 'gradlew.bat' : './gradlew';
const aDir = path.join(root, 'android');
if (!win) { try { fs.chmodSync(path.join(aDir, 'gradlew'), 0o755); } catch (e) {} }
run(gradle + (release ? ' bundleRelease' : ' assembleDebug'), aDir);

const out = release
  ? 'android/app/build/outputs/bundle/release/app-release.aab (sign it in Android Studio before uploading to Google Play)'
  : 'android/app/build/outputs/apk/debug/app-debug.apk';
console.log('\nDone. Your file: ' + out);

// Tiny Pop never uses the network, so remove the INTERNET permission Capacitor adds by default.
function patchManifest() {
  const f = path.join(aDir0(), 'app/src/main/AndroidManifest.xml');
  if (!fs.existsSync(f)) return;
  let x = fs.readFileSync(f, 'utf8');
  const y = x.replace(/\s*<uses-permission[^>]*android\.permission\.INTERNET[^>]*\/>/g, '');
  if (y !== x) { fs.writeFileSync(f, y); console.log('Removed INTERNET permission from AndroidManifest.xml'); }
}
function aDir0() { return path.join(root, 'android'); }
