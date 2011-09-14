dir = File.dirname(__FILE__)

load File.join(dir, '..', 'lib', 'touch', 'resources', 'themes')

# Compass configurations
sass_path    = dir
css_path     = dir
environment  = :production
output_style = :compressed

# or :nested, :expanded, :compact