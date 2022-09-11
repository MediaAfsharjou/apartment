//match dates for chart
const chargeDatesArray = JSON.parse(localStorage.getItem('chargeDatesArray'));
const chargeTotalsArray = JSON.parse(localStorage.getItem('chargeTotalsArray'));

  console.log(chargeDatesArray);

//sum of all totals from table 
   
      console.log(chargeTotalsArray);

      const rentDatesArray = JSON.parse(localStorage.getItem('rentDatesArray'));
      const rentTotalsArray = JSON.parse(localStorage.getItem('rentTotalsArray'));

     
  console.log(rentDatesArray);

//sum of all totals from table 

      console.log(rentTotalsArray);
//tenant chart

const data = {
  labels: chargeDatesArray,
  datasets: [{
    label: 'شارژ پرداخت شده',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: chargeTotalsArray,
  },
  {
    label: 'اجاره پرداخت شده',
    backgroundColor: 'rgb(2,245,63)',
    borderColor: 'rgb(2,245,63)',
    data: rentTotalsArray,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('tenantReportChart'),
  config
);
