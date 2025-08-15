import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../theme/colors';

interface BaseProps {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
}

interface EmailProps extends BaseProps {
  required?: boolean;
  invalidMessage?: string;
  showHelperWhenInvalid?: boolean;
}

export const EmailInput: React.FC<EmailProps> = ({ value, onChangeText, placeholder = 'Email', required = false, invalidMessage = 'Not a valid email address. Should be you@email.com', showHelperWhenInvalid = true }) => {
  const isValid = value.length === 0 ? !required : /.+@.+\..+/.test(value);
  return (
    <View style={[styles.fieldWrapper, !isValid && styles.errorBorder]}>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {value ? (
        <Text style={[styles.status, isValid ? styles.success : styles.error]}>
          {isValid ? '✓' : '✕'}
        </Text>
      ) : null}
      {!isValid && showHelperWhenInvalid && (
        <Text style={styles.helper}>{invalidMessage}</Text>
      )}
    </View>
  );
};

export const PasswordInput: React.FC<BaseProps> = ({ value, onChangeText, placeholder = 'Password' }) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.fieldWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!show}
        placeholder={placeholder}
      />
      <Pressable onPress={() => setShow(s => !s)} style={styles.status}>
        <Text style={{ color: Colors.muted, fontSize: 12 }}>{show ? 'HIDE' : 'SHOW'}</Text>
      </Pressable>
    </View>
  );
};

export const NameInput: React.FC<BaseProps> = ({ value, onChangeText, placeholder = 'Name' }) => {
  return (
    <View style={styles.fieldWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {value ? <Text style={[styles.status, styles.success]}>✓</Text> : null}
    </View>
  );
};

export const SocialButtons = () => {
  return (
    <View style={styles.socialRow}>
      <View style={styles.socialBtn}><Text style={styles.socialText}>G</Text></View>
      <View style={styles.socialBtn}><Text style={styles.socialText}>f</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldWrapper: { borderWidth:1, borderColor: Colors.border, borderRadius:8, paddingHorizontal:12, paddingVertical:4, marginBottom:12 },
  input: { height:40 },
  status: { position:'absolute', right:12, top:10 },
  success: { color: Colors.success },
  error: { color: Colors.danger },
  errorBorder: { borderColor: Colors.danger },
  helper: { color: Colors.danger, fontSize:10, marginTop:4 },
  socialRow: { flexDirection:'row', justifyContent:'center', marginTop:8 },
  socialBtn: { width:56, height:56, borderRadius:16, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:Colors.border, marginHorizontal:12 },
  socialText: { fontSize:20, fontWeight:'600', color: Colors.text }
});
