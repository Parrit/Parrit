package com.parrit.security.crypto.password;

public interface PasswordUpdater {
	void updateProjectPassword(String oldEncodedPassword, String newEncodedPassword);
}
