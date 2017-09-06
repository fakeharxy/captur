namespace :start do
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && forman start'
  end
end

desc 'Start development server'
task :start => 'start:development'

