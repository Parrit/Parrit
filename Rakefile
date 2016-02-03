task :jasmine do
  system('node_modules/jasmine/bin/jasmine.js JASMINE_CONFIG_PATH=jasmine.json')
end

task :junit do
  system('mvn test')
end

task :spec => [:junit, :jasmine] do
end

task :browserify do
  system('mkdir -p src/main/resources/static/built')
  system('node_modules/browserify/bin/cmd.js -t [ babelify --presets [ react ] ] src/main/js/main.js -o src/main/resources/static/built/bundle.js')
end
