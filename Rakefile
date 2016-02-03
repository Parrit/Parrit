task :jasmine do
  system('jasmine JASMINE_CONFIG_PATH=jasmine.json')
end

task :browserify do
  system('browserify -t [ babelify --presets [ react ] ] src/main/js/main.js -o src/main/resources/static/built/bundle.js')
end
