package com.parrit.security.crypto.password;

import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class ShaPasswordEncoder implements PasswordEncoder {
	 private MessageDigestPasswordEncoder legacyEncoder = new MessageDigestPasswordEncoder("SHA-256");

	 @Override
	 public String encode(CharSequence rawPassword) {
		  return legacyEncoder.encode(rawPassword);
	 }

	 @Override
	 public boolean matches(CharSequence rawPassword, String encodedPassword) {
		  return legacyEncoder.matches(rawPassword, encodedPassword);
	 }
}
