'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var DataminrReactGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();
        console.log(this.yeoman);
        console.log(chalk.cyan('You\'re using Dataminr\'s React/Flux generator. Let\'s get your project started!'));

        var prompts = [
            {
                name: 'project',
                message: 'What is this project\'s name?'
            }
        ];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            this.projectName = answers.project || 'app';

            done();
        }.bind(this));
    },

    app: function() {
        // Folders
        this.mkdir('app/js/actions');
        this.mkdir('app/js/components');
        this.mkdir('app/js/dispatcher/tests');
        this.mkdir('app/js/lib');
        this.mkdir('app/js/stores');
        this.mkdir('app/js/tests');
        this.mkdir('app/sass');
        this.mkdir('grunt');
        this.mkdir('bin');

        // Root
        this.copy('init.sh', 'init.sh');
        this.copy('.eslintrc', '.eslintrc');

        // Grunt
        this.copy('Gruntfile.js', 'Gruntfile.js');
        this.copy('startup.js', 'grunt/startup.js');
        this.copy('test.js', 'grunt/test.js');

        // Event Emitter
        this.copy('eventEmitter.js', 'app/js/lib/eventEmitter.js');

        // App
        this.copy('require.config.js', 'app/require.config.js');
        this.copy('index.html', 'app/index.html');
        this.copy('main.js', 'app/js/main.js');
        this.copy('app.scss', 'app/sass/app.scss');
        this.copy('AppDispatcher.js', 'app/js/dispatcher/AppDispatcher.js');

        // Testing
        this.copy('bind-polyfill.js', 'app/js/tests/bind-polyfill.js');
        this.copy('mock-ajax.js', 'app/js/tests/mock-ajax.js');
        this.copy('coverage.html', 'bin/index.html');

        // Tests
        this.copy('AppDispatcher.test.js', 'app/js/dispatcher/tests/AppDispatcher.test.js');

        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
    }
});

module.exports = DataminrReactGenerator;
