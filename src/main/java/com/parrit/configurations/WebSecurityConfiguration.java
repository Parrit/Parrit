package com.parrit.configurations;

import com.parrit.security.crypto.password.ShaPasswordEncoder;
import com.parrit.security.crypto.password.PasswordMigrator;
import com.parrit.security.crypto.password.PasswordUpdater;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .formLogin()
                .loginPage("/login/project")
                .failureUrl("/error")
                .permitAll()
                .and()
            .logout()
                .logoutUrl("/logout/project")
                .logoutSuccessUrl("/")
                .and()
            .authorizeRequests()
                .antMatchers("/", "/login", "/error").permitAll()
                .antMatchers(HttpMethod.POST, "/api/project").permitAll()
                .anyRequest().authenticated()
                .and()
            .csrf()
                .csrfTokenRepository(csrfTokenRepository())
                .and()
            .addFilterAfter(csrfHeaderFilter(), CsrfFilter.class);
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().mvcMatchers("/favicon.ico", "/built/**", "/img/**");
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationProvider authenticationProvider) {
        List<AuthenticationProvider> providers = new ArrayList<>();
        providers.add(authenticationProvider);
        return new ProviderManager(providers);
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        daoAuthenticationProvider.setHideUserNotFoundExceptions(false);
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder migratingPasswordEncoder(PasswordUpdater passwordUpdater) {
        String newEncoderId = "bcrypt";
        PasswordEncoder legacyEncoder = new ShaPasswordEncoder();
        PasswordEncoder newEncoder = new BCryptPasswordEncoder();
        PasswordEncoder migratingEncoder = new PasswordMigrator(legacyEncoder, asIdentifyingEncoder(newEncoderId, newEncoder), passwordUpdater);

        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put(null, migratingEncoder);
        encoders.put(newEncoderId, newEncoder);
        return new DelegatingPasswordEncoder(newEncoderId, encoders);
    }

    private PasswordEncoder asIdentifyingEncoder(String encoderId, PasswordEncoder encoder) {
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put(encoderId, encoder);
        return new DelegatingPasswordEncoder(encoderId, encoders);
    }

    private Filter csrfHeaderFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
                CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
                if (csrf != null) {
                    Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
                    String token = csrf.getToken();
                    if (cookie == null || token != null && !token.equals(cookie.getValue())) {
                        cookie = new Cookie("XSRF-TOKEN", token);
                        cookie.setPath("/");
                        response.addCookie(cookie);
                    }
                }
                filterChain.doFilter(request, response);
            }
        };
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }
}
