import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { EmailInput, NameInput, PasswordInput, SocialButtons } from '../src/components/AuthInputs';
import { auth } from '../src/firebaseConfig';
import { Colors } from '../src/theme/colors';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRegex = /^(?=.{5,254}$)([A-Z0-9._%+-]+)@([A-Z0-9.-]+)\.([A-Z]{2,})$/i;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;
  const isNameValid = name.trim().length > 0;
  const isFormValid = isEmailValid && isPasswordValid && isNameValid;

  const deriveError = () => {
    if (!isNameValid) return 'Nama wajib diisi';
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
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser && name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      setLoading(false);
      Alert.alert('Berhasil', 'Akun berhasil dibuat!', [
        { text: 'OK', onPress: () => router.replace('/login') }
      ]);
    } catch (err: any) {
      setLoading(false);
      console.log('Signup error:', err);
      let msg = 'Gagal mendaftar.';
      if (err.code === 'auth/email-already-in-use') msg = 'Email sudah terdaftar.';
      else if (err.code === 'auth/invalid-email') msg = 'Format email tidak valid.';
      else if (err.code === 'auth/weak-password') msg = 'Password terlalu lemah.';
      else if (err.message) msg = err.message;
      setError(msg);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
  <View style={styles.container}>
        <View style={styles.form}>          
          <NameInput value={name} onChangeText={(v) => { setName(v); if (error) setError(null); }} />
          <View style={{ height: 12 }} />
          <EmailInput value={email} onChangeText={(v) => { setEmail(v); if (error) setError(null); }} />
          <View style={{ height: 12 }} />
          <PasswordInput value={password} onChangeText={(v) => { setPassword(v); if (error) setError(null); }} />
          {error && <Text style={{ color: Colors.danger, fontSize: 12, marginTop: 4 }}>{error}</Text>}
          <View style={styles.row}>
            <Pressable onPress={() => router.replace('/login')} style={({pressed}) => [{ opacity: pressed ? 0.6 : 1 }, styles.linkRow]}>
              <Text style={styles.linkText}>Already have an account? Login</Text>
            </Pressable>
          </View>
          <Pressable
            disabled={loading || !isFormValid}
            style={({pressed}) => {
              const extra: any = {};
              if (!isFormValid || loading) extra.opacity = 0.5;
              if (pressed) extra.opacity = 0.8;
              return [styles.button, extra];
            }}
            onPress={onSubmit}
          >
            <Text style={styles.buttonText}>{loading ? '...' : 'SIGN UP'}</Text>
          </Pressable>
        </View>
        <View style={styles.dividerBlock}>
          <Text style={styles.dividerText}>Or sign up with social account</Text>
          <SocialButtons />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  form: { width: '100%', maxWidth: 400 },
  row: { flexDirection:'row', alignItems:'center', marginTop:4 },
  link: { color: Colors.primary, fontSize:12, fontWeight:'500' },
  linkRow: { paddingVertical: 8 },
  linkText: { color: Colors.primary, fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' },
  button: { backgroundColor: Colors.primary, height: 48, borderRadius: 24, alignItems:'center', justifyContent:'center', marginTop: 4 },
  buttonText: { color:'#fff', fontWeight:'600', letterSpacing:0.5 },
  dividerBlock: { marginTop: 32 },
  dividerText: { textAlign:'center', fontSize:12, color:'#555' }
});
