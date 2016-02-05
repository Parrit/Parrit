task :jasmine do
  system('node_modules/karma/bin/karma start karma.conf.js')
end

task :junit do
  system('mvn test')
end

task :spec => [:junit, :jasmine] do
end

task :browserify do
  system('mkdir -p src/main/resources/static/built')
  system('node_modules/grunt-cli/bin/grunt build')
end

task :create_migration do
  filename = "#{Time.now.utc.to_i}_#{ARGV.last}"
  system("vi src/main/resources/db/migration/#{filename}")
end
