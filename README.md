# E-Commerce App (Expo/React Native)

Aplikasi mobile e-commerce modern berbasis Expo (React Native) dengan fitur autentikasi Firebase, tab navigation, dan UI responsif.

## Fitur Utama
- **Autentikasi Firebase**: Login, register, forgot password, dan logout.
- **Proteksi Akses**: Semua menu utama (tabs) hanya bisa diakses setelah login.
- **Profile Dinamis**: Email user yang login tampil di halaman profile.
- **Favorites & Wishlist**: Simpan produk favorit secara global.
- **My Orders**: Lihat riwayat pesanan.
- **Shop & Search**: Cari produk dengan fitur pencarian.
- **UI Modern**: Tampilan clean, responsif, dan mudah digunakan.

## Struktur Folder
```
app/
   _layout.tsx         # Root stack navigation
   login.tsx           # Halaman login
   signup.tsx          # Halaman register
   forgot-password.tsx # Reset password
   (tabs)/             # Semua menu utama (home, shop, bag, favorites, profile)
   screens/
      my-orders.tsx     # Riwayat pesanan
src/
   components/         # Komponen modular (AuthInputs, dsb)
   theme/              # Colors, style
   firebaseConfig.ts   # Konfigurasi Firebase
assets/               # Gambar & font
```

## Cara Menjalankan
1. Clone repo ini
2. Jalankan `npm install`
3. Edit `src/firebaseConfig.ts` dengan konfigurasi Firebase milik Anda
4. Jalankan `npx expo start` untuk development

## Teknologi
- Expo (React Native)
- Firebase Auth
- TypeScript
- Expo Router

## Catatan
- Semua fitur utama sudah berjalan dan bebas error linting.
- Untuk build APK/AAB gunakan `eas build` dari Expo.
- Fitur dapat dikembangkan lebih lanjut: edit profile, notifikasi, filter produk, dsb.

---

> Dibuat oleh basohamzah24, 2025
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
