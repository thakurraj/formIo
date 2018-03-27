angular
    .module("formBuilder", ["ui.bootstrap", "ui.select", "formio", "ngFormBuilder", "ngJsonExplorer"])
    .run([
      "$rootScope",
      'formioComponents',
      '$timeout',
      function(
        $rootScope,
        formioComponents,
        $timeout
      ) {
        $rootScope.displays = [{
          name: 'form',
          title: 'Form'
        }, {
          name: 'wizard',
          title: 'Wizard'
        }];
        
		 $rootScope.form = {};

        $rootScope.renderForm = true;
        $rootScope.$on('formUpdate', function(event, form) {
          angular.merge($rootScope.form, form);
          $rootScope.renderForm = false;
          setTimeout(function() {
            $rootScope.renderForm = true;
          }, 10);
        });

        var originalComps = _.cloneDeep($rootScope.form.components);
        $rootScope.jsonCollapsed = true;
        $timeout(function() {
          $rootScope.jsonCollapsed = false;
        }, 200);
        var currentDisplay = 'form';
        $rootScope.$watch('form.display', function(display) {
          if (display && (display !== currentDisplay)) {
            currentDisplay = display;
            if (display === 'form') {
              $rootScope.form.components = originalComps;
            } else {
              $rootScope.form.components = [{
                type: 'panel',
                input: false,
                title: 'Page 1',
                theme: 'default',
                components: originalComps
              }];
            }
          }
        });
      }
    ]);