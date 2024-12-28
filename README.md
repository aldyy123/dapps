# DappReact

Selamat datang di proyek **DappReact**, sebuah aplikasi React Native yang dikembangkan untuk memfasilitasi interaksi dengan dompet kripto secara efisien. Dokumentasi ini akan membantu Anda memahami cara menggunakan dan mengembangkan proyek ini.

## Persyaratan Sistem

Sebelum memulai pengembangan, pastikan sistem Anda telah memenuhi persyaratan berikut:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih tinggi)
- [Yarn](https://yarnpkg.com/) atau [npm](https://www.npmjs.com/) sebagai manajer paket
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

### Setup Environment Development

#### Windows
1. Install [Chocolatey](https://chocolatey.org/) sebagai package manager
2. Install JDK menggunakan Chocolatey:
   ```bash
   choco install -y microsoft-openjdk18
   ```
3. Install Android Studio
   - Download dari [Android Studio](https://developer.android.com/studio)
   - Saat instalasi, pastikan memilih komponen:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device
4. Setup Environment Variables:
   - Tambahkan ANDROID_HOME: `%LOCALAPPDATA%\Android\Sdk`
   - Tambahkan path: 
     ```
     %LOCALAPPDATA%\Android\Sdk\platform-tools
     %LOCALAPPDATA%\Android\Sdk\tools
     ```

#### macOS
1. Install Homebrew jika belum ada:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install JDK:
   ```bash
   brew tap homebrew/cask-versions
   brew install --cask zulu18
   ```
3. Install Android Studio:
   ```bash
   brew install --cask android-studio
   ```
4. Setup Environment Variables (tambahkan ke ~/.zshrc atau ~/.bash_profile):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```
5. Install Xcode dari App Store

#### Linux (Ubuntu/Debian)
1. Install JDK:
   ```bash
   sudo apt update
   sudo apt install openjdk-18-jdk
   ```
2. Install Android Studio:
   ```bash
   sudo snap install android-studio --classic
   ```
3. Setup Environment Variables (tambahkan ke ~/.bashrc):
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

## Setup WalletConnect

1. Buat akun di [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Buat project baru dengan mengklik "Create New Project"
3. Pilih "App" sebagai jenis project
4. Isi detail project:
   - Name: Nama aplikasi Anda
   - Description: Deskripsi aplikasi
   - URL: URL website/aplikasi
   - Icon: Upload icon aplikasi
5. Setelah project dibuat, salin Project ID yang diberikan
6. Update file `src/clients/walletConnect.ts`:
   ```typescript
   const projectId = 'YOUR_PROJECT_ID'; // Ganti dengan Project ID Anda

   const providerMetadata = {
     name: 'YOUR_APP_NAME', // Ganti dengan nama aplikasi Anda
     description: 'YOUR_APP_DESCRIPTION', // Ganti dengan deskripsi aplikasi
     url: 'YOUR_APP_URL', // Ganti dengan URL aplikasi
     icons: ['YOUR_APP_ICON_URL'], // Ganti dengan URL icon aplikasi
     redirect: {
       native: 'YOUR_APP_SCHEME://', // Ganti dengan scheme aplikasi (ex: myapp://)
       universal: 'YOUR_APP_UNIVERSAL_LINK.com', // Ganti dengan universal link
     },
   };
   ```

## Panduan Instalasi

1. Unduh repositori ini ke komputer Anda dengan perintah:

   ```bash
   git clone https://github.com/username/dappreact.git
   ```

2. Akses direktori proyek dengan perintah:

   ```bash
   cd dappreact
   ```

3. Install dependensi:
   ```bash
   yarn install
   # atau
   npm install
   ```

## Panduan Menjalankan Aplikasi

### Pengembangan Android

1. Pastikan emulator Android atau perangkat Android telah terhubung dengan komputer Anda.
2. Jalankan aplikasi dengan perintah:

   ```bash
   npm run android
   ```
   atau menggunakan Yarn:

   ```bash
   yarn android
   ```

### Pengembangan iOS

1. Pastikan Xcode dan simulator iOS telah terpasang dan berjalan dengan baik.
2. Install dependensi iOS:
   ```bash
   cd ios && pod install && cd ..
   ```
3. Jalankan aplikasi dengan perintah:

   ```bash
   npm run ios
   ```
   atau menggunakan Yarn:

   ```bash
   yarn ios
   ```

## Pengembangan Aplikasi

Untuk melakukan pengembangan aplikasi, Anda dapat memodifikasi berkas `App.tsx` menggunakan editor kode pilihan Anda. Untuk melihat hasil perubahan secara langsung:

- Pada **Android**: Tekan tombol <kbd>R</kbd> dua kali atau pilih opsi **"Reload"** pada **Developer Menu**
- Pada **iOS**: Tekan kombinasi tombol <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> pada simulator iOS

## Penanganan Masalah

Jika mengalami kendala saat menjalankan aplikasi, lakukan pemeriksaan berikut:

- Pastikan seluruh dependensi telah terinstal dengan benar
- Periksa status emulator atau simulator
- Kunjungi [dokumentasi Penanganan Masalah React Native](https://reactnative.dev/docs/troubleshooting) untuk solusi lebih lanjut

## Referensi

- [Dokumentasi Resmi React Native](https://reactnative.dev/docs/getting-started)
- [Dokumentasi WalletConnect](https://docs.walletconnect.com/)
- [Panduan Integrasi dengan Aplikasi yang Telah Ada](https://reactnative.dev/docs/integration-with-existing-apps)

## Panduan Kontribusi

Anda dapat berkontribusi pada pengembangan proyek ini dengan mengajukan pull request atau membuka diskusi melalui fitur issues.

## Lisensi

Proyek ini dilisensikan di bawah ketentuan [MIT License](LICENSE).