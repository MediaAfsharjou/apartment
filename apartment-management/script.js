//match dates for chart

    var table = document.getElementById('datatable');
    var datesArray = [];
    
    var date = 3;
    for (var r = 1, n = table.rows.length; r < n; r++) {

        datesArray.push(new Date(table.rows[r].cells[date].innerHTML)
        .toLocaleDateString('en', { year: 'numeric', month: 'numeric', day: 'numeric' }));
        //.toLocaleDateString('fa-IR')

      //console.log(datesArray);
    }

//sum of all totals from table
        totalArray = [];
        var total = 4;
        var result_total = 0;
        for (var r = 1, n = table.rows.length; r < n; r++) {
            totalArray.push(parseInt(table.rows[r].cells[total].innerHTML));
            result_total = result_total + parseInt(table.rows[r].cells[total].innerHTML);
        
        }
        //console.log(result_total);
        //console.log(totalArray);


//report chart admin
const ctx = document.getElementById('stackedChart').getContext('2d');
//chevrons
const moveChart={
    id: 'moveChart',
    afterEvent(chart, args){
        const {ctx, canvas, chartArea:{left, right, top, bottom, width, height}}= chart;

        canvas.addEventListener('mousemove', (event) => {
            const x = args.event.x;
            const y = args.event.y;

            if(x >= left - 14 && x <= left + 14 && y >= height / 2 + top - 14 && y <= height / 2 + top + 14){
                canvas.style.crusor = 'pointer';
            } else if(x >= right - 14 && x <= right + 14 && y >= height / 2 + top - 14 && y <= height / 2 + top + 14){
                canvas.style.crusor = 'pointer';}
                else{canvas.style.crusor = 'default';}

        })

    },
    afterDraw(chart, args, pluginOptions){
        const {ctx, chartArea:{left, right, top, bottom, width, height}}= chart;

        const angle = Math.PI / 180;

        ctx.beginPath();
        ctx.lineWidth=3;
        ctx.strokeStyle = '#1c4164';
        ctx.fillStyle = '#F7F6FB';
        ctx.arc(left, height/2 + top, 14, angle * 0, angle * 360, false); //ctx.arc(x, y, radius, angleS, angleE, ccw)
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        //arrow left
        ctx.beginPath();
        ctx.lineWidth=3;
        ctx.strokeStyle = '#1c4164';
        ctx.moveTo(left + 5, height/2 + top - 7);
        ctx.lineTo(left - 5, height/2 + top);
        ctx.lineTo(left + 5, height/2 + top + 7);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth=3;
        ctx.strokeStyle = '#1c4164';
        ctx.fillStyle = '#F7F6FB';
        ctx.arc(right, height/2 + top, 14, angle * 0, angle * 360, false); //ctx.arc(x, y, radius, angleS, angleE, ccw)
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        //arrow right
        ctx.beginPath();
        ctx.lineWidth=3;
        ctx.strokeStyle = '#1c4164';
        ctx.moveTo(right - 5, height/2 + top - 7);
        ctx.lineTo(right + 5, height/2 + top);
        ctx.lineTo(right - 5, height/2 + top + 7);
        ctx.stroke();
        ctx.closePath();


    }
}

const stackedChart = new Chart(ctx, {
	type: 'bar',
	data: {
        labels: datesArray,
        datasets: [{
            label: 'مبلغ دریافت شده',
            data: totalArray,
        },
     ],
    },
    options: {
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',  
            'rgba(54, 162, 235, 0.5)',  
            'rgba(255, 206, 86, 0.5)',  
            'rgba(75, 192, 192, 0.5)',  
            'rgba(153, 102, 255, 0.5)', 
            'rgba(255, 159, 64, 0.5)'   
        ],
        borderWidth: 1,
        borderColor: '#1c4164',
        layout:{
            padding: {
                right: 18
            }
        },
        scales: { 
            x: {
                min: 0, 
                max: 6
            },
            y: {
                beginAtZero: true
            }
          }
    },
    plugins:[moveChart]

},{onAnimationComplete: function () {
    var sourceCanvas = this.chart.ctx.canvas;
    var copyWidth = this.scale.xScalePaddingLeft - 5;
    // the +5 is so that the bottommost y axis label is not clipped off
    // we could factor this in using measureText if we wanted to be generic
    var copyHeight = this.scale.endPoint + 5;
    var targetCtx = document.getElementById("ChartAxis").getContext("2d");
    targetCtx.canvas.width = copyWidth;
    targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
    
}}

);

stackedChart.ctx.onclick = buttonScroll();


function buttonScroll(){
    const {ctx, canvas, chartArea:{left, right, top, bottom, width, height}}= stackedChart;
    canvas.addEventListener('click', (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientx - rect.left;
        const y = event.clienty - rect.top;

        if(x >= left - 14 && x <= left + 14 && y >= height / 2 + top - 14 && y <= height / 2 + top + 14){
            stackedChart.options.scales.x.min = stackedChart.options.scales.x.min - 7;
            stackedChart.options.scales.x.max = stackedChart.options.scales.x.max - 7;
            if(stackedChart.options.scales.x.min <= 0){
                stackedChart.options.scales.x.min = 0;
                stackedChart.options.scales.x.max = 6;
            }
            
        } else if(x >= right - 14 && x <= right + 14 && y >= height / 2 + top - 14 && y <= height / 2 + top + 14){
            stackedChart.options.scales.x.min = stackedChart.options.scales.x.min + 7;
            stackedChart.options.scales.x.max = stackedChart.options.scales.x.max + 7;
            if(stackedChart.options.scales.x.max >= data.datasets[0].data.length){
                stackedChart.options.scales.x.min = data.datasets[0].data.length - 7;
                stackedChart.options.scales.x.max = data.datasets[0].data.length;
            }
            
            
        }
        stackedChart.update();
            

    }
    )
}

function scroller(scroll, chart){
    if(scroll.deltaY > 0){
        if(stackedChart.options.scales.x.max >= stackedChart.data.labels.length){
            stackedChart.options.scales.x.min = stackedChart.data.labels.length - 7;
            stackedChart.options.scales.x.max = stackedChart.data.labels.length - 1;
        }
        else{
        stackedChart.options.scales.x.min += 1;
        stackedChart.options.scales.x.max += 1;
        }
    }
    else if(scroll.deltaY < 0){
        if(stackedChart.options.scales.x.min <= 0){
            stackedChart.options.scales.x.min = 0;
            stackedChart.options.scales.x.max = 6;
        }
        else{
        stackedChart.options.scales.x.min -= 1;
        stackedChart.options.scales.x.max -= 1;
        }
    } else{}
    stackedChart.update();
}

stackedChart.canvas.addEventListener('wheel', (e) => {
    scroller(e, stackedChart);
})




// //report chart tenant
// const DATA_COUNT = 7;
// const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

// const labels = Utils.months({count: 7});
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'First dataset',
//       data: Utils.numbers(NUMBER_CFG),
//       borderColor: Utils.CHART_COLORS.red,
//       backgroundColor: Utils.CHART_COLORS.red,
//       fill: false
//     },
//     {
//       label: 'Second dataset',
//       data: Utils.numbers(NUMBER_CFG),
//       borderColor: Utils.CHART_COLORS.blue,
//       backgroundColor: Utils.CHART_COLORS.blue,
//       fill: false
//     }
//   ]
// };

// const actions = [
//     {
//       name: 'Randomize',
//       handler(chart) {
//         chart.data.datasets.forEach(dataset => {
//           dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
//         });
//         chart.update();
//       }
//     },
//     {
//       name: 'Add Dataset',
//       handler(chart) {
//         const data = chart.data;
//         const dsColor = Utils.namedColor(chart.data.datasets.length);
//         const newDataset = {
//           label: 'Dataset ' + (data.datasets.length + 1),
//           backgroundColor: dsColor,
//           borderColor: dsColor,
//           fill: true,
//           data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
//         };
//         chart.data.datasets.push(newDataset);
//         chart.update();
//       }
//     },
//     {
//       name: 'Add Data',
//       handler(chart) {
//         const data = chart.data;
//         if (data.datasets.length > 0) {
//           data.labels = Utils.months({count: data.labels.length + 1});
  
//           for (var index = 0; index < data.datasets.length; ++index) {
//             data.datasets[index].data.push(Utils.rand(-100, 100));
//           }
  
//           chart.update();
//         }
//       }
//     },
//     {
//       name: 'Remove Dataset',
//       handler(chart) {
//         chart.data.datasets.pop();
//         chart.update();
//       }
//     },
//     {
//       name: 'Remove Data',
//       handler(chart) {
//         chart.data.labels.splice(-1, 1); // remove the label first
  
//         chart.data.datasets.forEach(dataset => {
//           dataset.data.pop();
//         });
  
//         chart.update();
//       }
//     }
//   ];

//   const config = {
//     type: 'line',
//     data: data,
//     options: {
//       responsive: true,
//       plugins: {
//         title: {
//           display: true,
//           text: 'Line Chart - stacked=true'
//         },
//         tooltip: {
//           mode: 'index'
//         },
//       },
//       interaction: {
//         mode: 'nearest',
//         axis: 'x',
//         intersect: false
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: 'Month'
//           }
//         },
//         y: {
//           stacked: true,
//           title: {
//             display: true,
//             text: 'Value'
//           }
//         }
//       }
//     }
//   };

//   const ctx = document.getElementById('tenantReportChart').getContext('2d');

// const tenantReportChart = new Chart(ctx, config);



function updateChart(chart, dataObj) {
    // Saving the new incoming object into the mock database
    Object.assign(data, dataObj);

    // Push changes to the chart
    chart.data.labels.push(Object.keys(dataObj));
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(Object.values(dataObj));
    });
    // Update chart
    chart.update();
}

function removeData(chart, val) {
    // Delete entry from the database
    delete data[val];

    // Re-populate and re-render the chart
    chart.data.labels = Object.keys(data);
    chart.data.datasets.forEach((dataset) => {
        dataset.data = Object.values(data);
    });

    chart.update();
}

$(document).ready( function () {
    var table = $('#unitstable').DataTable();
    
    $(".dataTables_empty").text("اطلاعاتی جهت نمایش وجود ندارد.");
  } );
  

  document.querySelector('.scrollable').forEach(function(item){
    item.addEventListener('wheel', preventScroll);
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
});


function preventDefault(e) {
  e.preventDefault();
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}