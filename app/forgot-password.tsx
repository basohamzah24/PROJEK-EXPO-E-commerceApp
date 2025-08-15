// import React, { useState } from 'react';
// import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
// import { EmailInput } from '../src/components/AuthInputs';
// import { Colors } from '../src/theme/colors';

// export default function ForgotPasswordScreen() {
//   const [email, setEmail] = useState('');
//   const [sent, setSent] = useState(false);
//   const submit = () => {
//     setSent(true);
//     setTimeout(()=> setSent(false), 2500);
//   };
//   return (
//     <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS==='ios' ? 'padding': undefined}>
//       <View style={styles.container}>
//         <Text style={styles.desc}>Please, enter your email address. You will receive a link to create a new password via email.</Text>
//         <View style={{ marginTop: 16 }}>
//           <EmailInput value={email} onChangeText={setEmail} />
//         </View>
//         <Pressable style={styles.button} onPress={submit}>
//           <Text style={styles.buttonText}>SEND</Text>
//         </Pressable>
//         {sent && <Text style={styles.sent}>Reset link sent (dummy)</Text>}
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex:1, backgroundColor:'#fff', padding:24 },
//   desc: { fontSize:12, color:'#555' },
//   button: { backgroundColor: Colors.primary, height:48, borderRadius:24, alignItems:'center', justifyContent:'center', marginTop:12 },
//   buttonText: { color:'#fff', fontWeight:'600' },
//   sent: { textAlign:'center', marginTop:12, color: Colors.success }
// });
