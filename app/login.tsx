import { Link, router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { EmailInput, PasswordInput, SocialButtons } from '../src/components/AuthInputs';
import { auth } from '../src/firebaseConfig';
import { Colors } from '../src/theme/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRegex = /^(?=.{5,254}$)([A-Z0-9._%+-]+)@([A-Z0-9.-]+)\.([A-Z]{2,})$/i;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6; // aturan minimal sederhana
  const isFormValid = isEmailValid && isPasswordValid;

  const deriveError = () => {
    if (email.length === 0) return 'Email wajib diisi';
    if (!isEmailValid) return 'Format email tidak valid';
    if (password.length === 0) return 'Password wajib diisi';
    if (!isPasswordValid) return 'Password minimal 6 karakter';
    return null;
  };

  const onSubmit = async () => {
    const validationError = deriveError();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert('Berhasil', 'Login berhasil!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/home') }
      ]);
    } catch (err: any) {
      setLoading(false);
      let msg = 'Login gagal. Cek email dan password.';
      if (err.code === 'auth/user-not-found') msg = 'Email tidak terdaftar.';
      else if (err.code === 'auth/wrong-password') msg = 'Password salah.';
      else if (err.code === 'auth/invalid-email') msg = 'Format email tidak valid.';
      setError(msg);
    }
  };



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
  <View style={styles.container}>
        <View style={styles.form}>          
          <EmailInput
            value={email}
            onChangeText={(v) => { setEmail(v); if (error) setError(null); }}
            required
            showHelperWhenInvalid={false}
          />
          <View style={{ height: 12 }} />
          <PasswordInput
            value={password}
            onChangeText={(v) => { setPassword(v); if (error) setError(null); }}
            placeholder="Password"
          />
          <View style={styles.forgotRow}>
            <Link href="/forgot-password" style={styles.forgotText}>Forgot your password? →</Link>
          </View>
          {error && <Text style={styles.inlineError}>{error}</Text>}
          <Pressable
            disabled={loading || !isFormValid}
            style={({pressed}) => {
              const extra: any = {};
              if (!isFormValid || loading) Object.assign(extra, styles.buttonDisabled);
              if (pressed) extra.opacity = 0.8;
              return [styles.button, extra];
            }}
            onPress={onSubmit}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>LOGIN</Text>}
          </Pressable>
        </View>
        <View style={styles.dividerBlock}>
          <Text style={styles.dividerText}>Or login with social account</Text>
          <SocialButtons />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  form: { width: '100%', maxWidth: 400 },
  forgotRow: { alignItems: 'flex-end', marginTop: 4 },
  forgotText: { color: Colors.primary, fontSize: 12, fontWeight: '500' },
  button: { backgroundColor: Colors.primary, height: 48, borderRadius: 24, alignItems:'center', justifyContent:'center', marginTop: 12 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color:'#fff', fontWeight:'600', letterSpacing:0.5 },
  dividerBlock: { marginTop: 32 },
  dividerText: { textAlign:'center', fontSize:12, color:'#555' },
  inlineError: { color: Colors.danger, fontSize: 12, marginTop: -4 }
});
