// import { Link, router } from 'expo-router';
// import React, { useState } from 'react';
// import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
// import { EmailInput, PasswordInput, SocialButtons } from '../src/components/AuthInputs';
// import { Colors } from '../src/theme/colors';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

//   const emailRegex = /^(?=.{5,254}$)([A-Z0-9._%+-]+)@([A-Z0-9.-]+)\.([A-Z]{2,})$/i;
//   const isEmailValid = emailRegex.test(email);
//   const isPasswordValid = password.length >= 6; // aturan minimal sederhana
//   const isFormValid = isEmailValid && isPasswordValid;

//   const deriveError = () => {
//     if (email.length === 0) return 'Email wajib diisi';
//     if (!isEmailValid) return 'Format email tidak valid';
//     if (password.length === 0) return 'Password wajib diisi';
//     if (!isPasswordValid) return 'Password minimal 6 karakter';
//     return null;
//   };

//   const onSubmit = () => {
//     const validationError = deriveError();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }
//     setError(null);
//     setLoading(true);
//     timeoutRef.current = setTimeout(() => {
//       setLoading(false);
//       router.replace('/');
//     }, 1200);
//   };

//   React.useEffect(() => {
//     return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
//   }, []);

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <View style={styles.container}>
//         <View style={styles.form}>          
//           <EmailInput
//             value={email}
//             onChangeText={(v) => { setEmail(v); if (error) setError(null); }}
//             required
//             showHelperWhenInvalid={false}
//           />
//           <View style={{ height: 12 }} />
//           <PasswordInput
//             value={password}
//             onChangeText={(v) => { setPassword(v); if (error) setError(null); }}
//             placeholder="Password"
//           />
//           <View style={styles.forgotRow}>
//             <Link href="/forgot-password" style={styles.forgotText}>Forgot your password? →</Link>
//           </View>
//           {error && <Text style={styles.inlineError}>{error}</Text>}
//           <Pressable
//             disabled={loading || !isFormValid}
//             style={({pressed}) => {
//               const extra: any = {};
//               if (!isFormValid || loading) Object.assign(extra, styles.buttonDisabled);
//               if (pressed) extra.opacity = 0.8;
//               return [styles.button, extra];
//             }}
//             onPress={onSubmit}
//           >
//             {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>LOGIN</Text>}
//           </Pressable>
//         </View>
//         <View style={styles.dividerBlock}>
//           <Text style={styles.dividerText}>Or login with social account</Text>
//           <SocialButtons />
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 24, backgroundColor: '#fff' },
//   form: {},
//   forgotRow: { alignItems: 'flex-end', marginTop: 4 },
//   forgotText: { color: Colors.primary, fontSize: 12, fontWeight: '500' },
//   button: { backgroundColor: Colors.primary, height: 48, borderRadius: 24, alignItems:'center', justifyContent:'center', marginTop: 12 },
//   buttonDisabled: { opacity: 0.5 },
//   buttonText: { color:'#fff', fontWeight:'600', letterSpacing:0.5 },
//   dividerBlock: { marginTop: 32 },
//   dividerText: { textAlign:'center', fontSize:12, color:'#555' },
//   inlineError: { color: Colors.danger, fontSize: 12, marginTop: -4 }
// });
