'use strict';

module.exports = function(app) {
  app.controller('ChartController', ['$window', '$http', '$route', 'httpService',
    function($window, $http, $route, httpService) {
    let pollResource =  httpService('/polls');
    let _this = this;
    _this.poll = JSON.parse($window.localStorage.poll);
    _this.labels = [];
    _this.data = [];
    _this.voted = false;



    function updateChart(poll) {
      _this.data = [];
      poll.options.forEach((ele) => {
        _this.labels.push(ele.name);
        _this.data.push(ele.count);
      })
    }

    updateChart(_this.poll);


    _this.getPoll = function() {
      pollResource.getOne(_this.poll._id)
        .then((res) => {
          $window.localStorage.poll = JSON.stringify(res.data.data);
          this.voted = JSON.parse($window.localStorage.voted)

          if(_this.voted) {
            $route.reload();
          }

          $window.localStorage.voted = JSON.stringify(false);
        }, (err) => console.log(err))
    };

function chartData(labels, data) {
  return {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: '# of Votes',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  }
}



    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, chartData(_this.labels, _this.data) );



  }])
}
