angular.module('docsTimeDirective', ['testStuff'])
.controller('homeCtrl', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
}])
.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
    
    var format,
        timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }

    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
    }
  };
}])

.directive('color', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.css('color', attrs.color);
      scope.$watch(attrs.color, function(value) {
        element.css('color', value);
      });
    }
  }
})
.directive('myDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });


      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
    
        console.log('x: ', x);
        console.log('y: ', y);
    
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);

angular.module('testStuff', [])
.directive('testDirective', function() {
  return {
    scope: {},
    templateUrl: '/html/testDirective.html',
    controller: function($scope, $interval) {
      $interval(function() {
        $scope.name += '!';
      }, 1000)
      $scope.name = 'HEYYYYY';
    }
  }
})


