import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { EmailInput } from '../src/components/AuthInputs';
import { auth } from '../src/firebaseConfig';
import { Colors } from '../src/theme/colors';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const submit = async () => {
    if (!email) {
      Alert.alert('Error', 'Email wajib diisi');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Berhasil', 'Link reset password telah dikirim ke email Anda.');
    } catch (err: any) {
      let msg = 'Gagal mengirim email reset password.';
      if (err.code === 'auth/user-not-found') msg = 'Email tidak terdaftar.';
      else if (err.code === 'auth/invalid-email') msg = 'Format email tidak valid.';
      Alert.alert('Error', msg);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS==='ios' ? 'padding': undefined}>
  <View style={styles.container}>
        <Text style={styles.desc}>Please, enter your email address. You will receive a link to create a new password via email.</Text>
        <View style={{ marginTop: 16, width: '100%', maxWidth: 400, alignSelf: 'center' }}>
          <EmailInput value={email} onChangeText={setEmail} />
        </View>
        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>SEND</Text>
        </Pressable>
  {/* pesan sukses/gagal ditampilkan via Alert */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', padding:24, justifyContent:'center', alignItems:'center' },
  desc: { fontSize:12, color:'#555', textAlign:'center', maxWidth:400 },
  button: { backgroundColor: Colors.primary, height:48, borderRadius:24, alignItems:'center', justifyContent:'center', marginTop:12, width:'100%', maxWidth:400 },
  buttonText: { color:'#fff', fontWeight:'600' },
  sent: { textAlign:'center', marginTop:12, color: Colors.success },
});
