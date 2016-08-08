
# User manager web application

## Author

- Minh Nguyen - AsNet

## Gulp plugin

1. To live reload page: use `browser-sync` plugin instead of `livereload`
2. To build sass to css: use `gulp-sass` plugin
3. To check javascript code: use `gulp-jshint` plugin
4. To style for result of jshint task: use `jshint-stylish` plugin
5. To convert jade to html: use `gulp-jade` plugin
6. To concat all js file to one file: use `gulp-concat` plugin
7. To minify js file: use `gulp-uglify` plugin
8. Utility functions for gulp plugins: use `gulp-util` plugin to log error
9. To minigy css file: use `gulp-minify-css` plugin

## Gulp task

1. `gulp` : run all task of gulp
2. `gulp sass` : build sass file in src/ folder to css file in out/ folder
3. `gulp lint` : check jshint for all js code in src/ folder
4. `gulp jade` : build jade file in src/ folder to html file in out/ folder
5. `gulp assets` : copy all assets from src/ folder to out/ folder
6. `gulp concatJsLibrary` : concat all js libraries in src/ folder to libraries.js in out/ folder
7. `gulp concatJsCode` : concat all js code by Minh Nguyen in src/ folder to main.js in out/ folder

## Project structure

1. src folder: contain all scss, jade, js and vendor libraries
2. out folder: contain all html, css, js and vendor libraries
3. .jshintrc: config rules of jshint task
4. gulpfile.js: config file of gulp
5. package.json: declare all package of gulp
6. .bowerrc: setting folder for vendor
7. bower.json: config all libraries needed for project
8. .editorconfig: config code style for all file

## Framework

1. jQuery
2. Bootstrap
3. lodash.js
4. faker.js: use to generate random 50 users

## Run User manager

1. Install gulp

	- Run `npm install gulp -g`

2. Download libraries:

	- Go to user manager folder: `cd /user-manager`
	- Run `bower install` to install all libraries

3. Run project

	- Go to user manager folder: `cd /user-manager`
	- Run `gulp`
	- Open URL: [http://localhost:9000](http://localhost:9000)
