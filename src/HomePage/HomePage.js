import React, { useEffect, useState } from 'react';
import { AgChartsReact } from "ag-charts-react";
import './HomePage.css';
import { Divider } from '@material-ui/core';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const HomePage = (props) => {

  const {
    getBudgets,
    getAllExpensesAndDate,
    getExpenses,
    dataForBudget,
    barChartExpnesesData,
    expensesData,
  } = props;
  const [optionsForHBar, setOptionsForHBar] = useState({
    data: [],
    title: {
      // text: JSON.stringify(dataForBudget)
      text: "CATEGORY Vs EXPANSES",
    },
    series: [
      {
        type: "bar",
        direction: "horizontal",
        xKey: "type",
        yKey: "earnings",
        cornerRadius: 4,
        errorBar: {
          yLowerKey: "earningsLower",
          yUpperKey: "earningsUpper",
        },
        label: {
          formatter: ({ value }) => `$ ${value.toFixed(0)}`,
        },
        formatter: ({ datum, yKey }) => ({
          fillOpacity: getOpacity(datum[yKey], yKey, 0.4, 1),
        }),
      },
    ],
    axes: [
      {
        type: "category",
        position: "left",
      },
      {
        type: "number",
        position: "bottom",
        title: {
          enabled: true,
          text: "Expanses on each category",
        },
      },
    ],
  });


  const [expansesForHomePage, setExpansesForHomePage] = useState(expensesData);
  const [budgetsDataForHomePage, setBudgetsDataForHomePage] = useState(dataForBudget);
  const [lineChardataForHomePage, setLineChartDataForHomePage] = useState(barChartExpnesesData);
  const [dataForPie, setDataForPie] = useState([]);

  const [optionsForLineGraph, setOptionsForLineGraph] = useState({
    title: {
      text: "EXPANSES DONE ON EACH DAY",
    },
    data: lineChardataForHomePage,
    series: [
      {
        type: "line",
        xKey: "quarter",
        yKey: "petrol",
        yName: "Date: Spent Amount",
      },
    ],
  });

  const numFormatter = new Intl.NumberFormat("en-US");
  const [optionsForPie, setOptionsForPie] = useState({
    title: {
      text: "AMOUNT ASSIGNED FOR EACH CATEGORY",
    },
    footnote: {
      text: "You can add more expanse categories in vonfigure budget section",
    },
    series: [
      {
        data: dataForPie,
        type: "pie",
        calloutLabelKey: "ingredient",
        sectorLabelKey: "weight",
        angleKey: "weight",
        calloutLabel: {
          offset: 10,
        },
        sectorLabel: {
          formatter: ({ datum, sectorLabelKey = "weight" }) => {
            return `$ ${numFormatter.format(datum[sectorLabelKey])}`;
          },
        },
        tooltip: {
          renderer: ({ datum, angleKey, calloutLabelKey = "ingredient" }) => ({
            title: `${datum[calloutLabelKey]}`,
            content: `$ ${datum[angleKey]}`,
          }),
        },
        title: {
          text: "",
        },
      },
    ],
    legend: {
      enabled: false,
    },
  });

  function getOpacity(value, key, minOpacity, maxOpacity) {
    const [min, max] = getDomain(key);
    let alpha = Math.round(((value - min) / (max - min)) * 10) / 10;
    return map(alpha, 0, 1, minOpacity, maxOpacity);
  }

  function getDomain(key) {
    const min = Math.min(...optionsForHBar.data.map((d) => d[key]));
    const max = Math.max(...optionsForHBar.data.map((d) => d[key]));
    return [min, max];
  }

  const map = (value, start1, end1, start2, end2) => {
    return ((value - start1) / (end1 - start1)) * (end2 - start2) + start2;
  };


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getBudgets(navigate);
        await getAllExpensesAndDate(navigate);
        await getExpenses(navigate);
        setExpansesForHomePage(expensesData);
        setBudgetsDataForHomePage(dataForBudget);
      }
      catch (err) {
        alert("Something went wrong!!")
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setExpansesForHomePage(expensesData);
    setBudgetsDataForHomePage(dataForBudget);
    setLineChartDataForHomePage(barChartExpnesesData)
  }, [expensesData, dataForBudget, barChartExpnesesData])

  useEffect(() => {
    if (expansesForHomePage && expansesForHomePage.length > 0) {
      const categoryAmounts = {};

      expansesForHomePage.forEach(transaction => {
        const categoryName = transaction.categoryName;
        const amount = transaction.amount;

        if (categoryAmounts[categoryName]) {
          categoryAmounts[categoryName] += amount;
        } else {
          categoryAmounts[categoryName] = amount;
        }
      });
      let data = [];
      Object.keys(categoryAmounts).map(categoryName => {
        data.push({
          type: categoryName,
          earnings: categoryAmounts[categoryName],
        })
      })
      setOptionsForHBar({ ...optionsForHBar, data: [...data] });
      let lineData = [];
      lineChardataForHomePage.map(item => {
        lineData.push({
          quarter: item.date,
          petrol: item.totalAmountSpent,
        });
      });

      setOptionsForLineGraph({ ...optionsForLineGraph, data: lineData });
    }
    else {
      setOptionsForLineGraph({ ...optionsForLineGraph, data: [] });
      setOptionsForHBar({ ...optionsForHBar, data: [] });
    }
    if (budgetsDataForHomePage && budgetsDataForHomePage.length != 0) {
      let pieData = [];
      budgetsDataForHomePage && budgetsDataForHomePage.categories && budgetsDataForHomePage.categories.length > 0 && budgetsDataForHomePage.categories.map(category => {
        pieData.push({
          ingredient: category.name,
          weight: category.allocatedAmount,
        });
      });
      setOptionsForPie({ ...optionsForPie, series: [{ ...optionsForPie.series[0], data: pieData }] })
    }
  }, [expansesForHomePage, lineChardataForHomePage, budgetsDataForHomePage]);




  const filterDataBasedOnMonth = (month) => {
    const monthObj = new Date(month);
    const monthIndex = monthObj.getMonth();
    console.log(monthIndex)
    setMonth(month)
    const filteredData1 = expensesData.filter(expanse => {
      const transactionDate = new Date(expanse.date);
      return transactionDate.getMonth() === monthIndex;
    });
    setExpansesForHomePage(filteredData1);

    const filterdData2 = barChartExpnesesData.filter(item => {
      const date = new Date(item.date);
      return date.getMonth() === monthIndex;
    });
    setLineChartDataForHomePage(filterdData2);

  }
  // const currentDate = new Date();
  const [filterMonth, setMonth] = useState(format(new Date(), 'yyyy-MM'));
  const getValue = () => {

  }

  return (<>
    <div className='chartsContainer'>
      <div className='filterContainer'>
        <label htmlFor="monthPicker" className="form-label">
          Filter Statistics
        </label>
        <DatePicker
          id="monthPicker"
          className="form-control"
          selected={filterMonth}
          onChange={(e) => filterDataBasedOnMonth(e)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <div className="categoryVsExpansesPerDay" style={{ margin: '50px 0 0' }}>
        <AgChartsReact options={optionsForHBar} />
      </div>
      <hr style={{ width: "100%" }} class="hr hr-blurry" />
      <div className="categoryVsExpansesPerDay">
        <AgChartsReact options={optionsForLineGraph} />
      </div>
      <hr style={{ width: "100%" }} class="hr hr-blurry" />

      <div className="categoryVsExpansesPerDay">
        <AgChartsReact options={optionsForPie} />
      </div>
    </div>
  </>);
};

export default HomePage;
