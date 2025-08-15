// import { Link, router } from 'expo-router';
// import React, { useState } from 'react';
// import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
// import { EmailInput, NameInput, PasswordInput, SocialButtons } from '../src/components/AuthInputs';
// import { Colors } from '../src/theme/colors';

// export default function SignupScreen() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const onSubmit = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       router.replace('/login');
//     }, 1200);
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <View style={styles.container}>
//         <View style={styles.form}>          
//           <NameInput value={name} onChangeText={setName} />
//           <View style={{ height: 12 }} />
//           <EmailInput value={email} onChangeText={setEmail} />
//           <View style={{ height: 12 }} />
//             <PasswordInput value={password} onChangeText={setPassword} />
//           <View style={styles.row}>            
//             <Text style={{ fontSize:12 }}>Already have an account? </Text>
//             <Link href="/login" style={styles.link}>→</Link>
//           </View>
//           <Pressable
//             disabled={loading}
//             style={({pressed}) => [styles.button, pressed ? { opacity:0.8 } : null]}
//             onPress={onSubmit}
//           >
//             <Text style={styles.buttonText}>{loading ? '...' : 'SIGN UP'}</Text>
//           </Pressable>
//         </View>
//         <View style={styles.dividerBlock}>
//           <Text style={styles.dividerText}>Or sign up with social account</Text>
//           <SocialButtons />
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 24, backgroundColor: '#fff' },
//   form: {},
//   row: { flexDirection:'row', alignItems:'center', marginTop:4 },
//   link: { color: Colors.primary, fontSize:12, fontWeight:'500' },
//   button: { backgroundColor: Colors.primary, height: 48, borderRadius: 24, alignItems:'center', justifyContent:'center', marginTop: 4 },
//   buttonText: { color:'#fff', fontWeight:'600', letterSpacing:0.5 },
//   dividerBlock: { marginTop: 32 },
//   dividerText: { textAlign:'center', fontSize:12, color:'#555' }
// });
