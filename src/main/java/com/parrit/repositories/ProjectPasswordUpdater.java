package com.parrit.repositories;

import com.parrit.security.crypto.password.PasswordUpdater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import static com.parrit.repositories.ProjectRepository.PASSWORD_COLUMN_NAME;
import static com.parrit.repositories.ProjectRepository.TABLE_NAME;

@Component
public class ProjectPasswordUpdater implements PasswordUpdater {
	private final JdbcTemplate jdbcTemplate;
	private static final String updateProjectPasswordSql =
		String.format("update %s set %s = ? where %s = ?",
			TABLE_NAME, PASSWORD_COLUMN_NAME, PASSWORD_COLUMN_NAME);

	@Autowired
	public ProjectPasswordUpdater(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public void updateProjectPassword(String oldEncodedPassword, String newEncodedPassword) {
		jdbcTemplate.update(updateProjectPasswordSql, newEncodedPassword, oldEncodedPassword);
	}
}
