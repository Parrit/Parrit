package com.parrit.security.crypto.password;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

// grouped stubbing is more readable in this case; don't error on unnecessary stubbing.
@RunWith(MockitoJUnitRunner.Silent.class)
public class PasswordMigratorTest {
	private PasswordMigrator subject;
	@Mock
	private PasswordEncoder legacyEncoder;
	@Mock
	private PasswordEncoder targetEncoder;
	@Mock
	private PasswordUpdater passwordUpdater;

	private String rawPassword = "rawPassword";
	private String legacyEncodedPassword = "legacyEncodedPassword";
	private String targetEncodedPassword = "targetEncodedPassword";
	private String someOtherPasswordLegacyEncoded = "someOtherPasswordLegacyEncoded";

	@Before
	public void setUp() {
		when(legacyEncoder.encode(rawPassword)).thenReturn(legacyEncodedPassword);
		when(legacyEncoder.matches(rawPassword, legacyEncodedPassword)).thenReturn(true);
		when(targetEncoder.encode(rawPassword)).thenReturn(targetEncodedPassword);
		when(targetEncoder.matches(rawPassword, targetEncodedPassword)).thenReturn(true);
		subject = new PasswordMigrator(legacyEncoder, targetEncoder, passwordUpdater);
	}

	@Test
	public void encode_returnsPasswordEncodedWithTargetEncoder() {
		assertThat(subject.encode(rawPassword)).isEqualTo(targetEncodedPassword);
	}

	@Test
	public void matches_whenLegacyEncoderSaysPasswordsMatch_returnsTrue() {
		assertThat(subject.matches(rawPassword, legacyEncodedPassword)).isTrue();
	}

	@Test
	public void matches_whenLegacyEncoderSaysPasswordsMatch_encodesRawPasswordWithTargetEncoder_andUpdatesStoredPassword() {
		subject.matches(rawPassword, legacyEncodedPassword);
		verify(targetEncoder).encode(rawPassword);
		verify(passwordUpdater).updateProjectPassword(legacyEncodedPassword, targetEncodedPassword);
	}

	@Test
	public void matches_whenLegacyEncoderSaysPasswordsDoNotMatch_returnsFalse() {
		assertThat(subject.matches(rawPassword, someOtherPasswordLegacyEncoded)).isFalse();
	}

	@Test
	public void matches_whenLegacyEncoderSaysPasswordsDoNotMatch_doesNotUpdateStoredPassword() {
		subject.matches(rawPassword, someOtherPasswordLegacyEncoded);
		verify(passwordUpdater, never()).updateProjectPassword(anyString(), anyString());
	}
}
