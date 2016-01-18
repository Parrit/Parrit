task :jasmine do
  system('jasmine JASMINE_CONFIG_PATH=src/main/resources/static/js/spec/support/jasmine.json')
end

task :browserify do
  system('browserify -t [ babelify --presets [ react ] ] src/main/resources/static/main.js -o src/main/resources/static/built/bundle.js')
end
