task :jasmine do
  system('node_modules/karma/bin/karma start karma.conf.js')
end

task :junit do
  system('./gradlew clean build')
end

task :spec => [:junit, :jasmine] do
end

task :build do
  system('mkdir -p src/main/resources/static/built')
  system('node_modules/grunt-cli/bin/grunt build')
  system('cp src/main/resources/static/built/bundle.js target/classes/static/built/bundle.js') if Dir.exist? File.expand_path('target')
  system('cp src/main/resources/static/built/bundle.css target/classes/static/built/bundle.css') if Dir.exist? File.expand_path('target')
end

task :create_migration do
  filename = "V#{Time.now.utc.to_i}__#{ARGV.last}"
  system("vi src/main/resources/db/migration/#{filename}.sql")
end
