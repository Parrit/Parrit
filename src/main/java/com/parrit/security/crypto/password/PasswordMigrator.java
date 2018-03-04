package com.parrit.security.crypto.password;

import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordMigrator implements PasswordEncoder {
	private final PasswordEncoder legacyEncoder;
	private final PasswordEncoder targetEncoder;
	private final PasswordUpdater passwordUpdater;

	public PasswordMigrator(PasswordEncoder legacyEncoder, PasswordEncoder targetEncoder, PasswordUpdater passwordUpdater) {
		this.legacyEncoder = legacyEncoder;
		this.targetEncoder = targetEncoder;
		this.passwordUpdater = passwordUpdater;
	}

	 @Override
	 public String encode(CharSequence rawPassword) {
		 return targetEncoder.encode(rawPassword);
	 }

	 @Override
	 public boolean matches(CharSequence rawPassword, String encodedPassword) {
		 boolean matches = legacyEncoder.matches(rawPassword, encodedPassword);
		 if(matches) {
			 passwordUpdater.updateProjectPassword(encodedPassword, targetEncoder.encode(rawPassword));
		 }
		 return matches;
	 }
}
