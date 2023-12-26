import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchAttandanceChart } from "../../actions/employeeActions";
import { Dropdown } from "../../components";
import { textVariant, zoomIn } from "../../utils/motion";
import { AiOutlineOrderedList, AiOutlinePicLeft } from "react-icons/ai";
import { HOST_API } from "../../constants/Api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const today = new Date();
const currentMonth = (today.getMonth() + 1).toString();
const currentYear = today.getFullYear().toString();

const Chart = () => {
  const [isListView, setIsListView] = useState(false);
  const [attendanceChart, setAttendanceData] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  console.log(month, year);

  const year_filter = [];
  var month_filter = [];

  for (let i = currentYear; i > currentYear - 10; i--) {
    year_filter.push(i);
  }

  if (year === currentYear) {
    for (let i = 1; i <= currentMonth; i++) {
      month_filter.push(i);
    }
  } else {
    month_filter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  var loading = false;
  useEffect(() => {
    loading = true;
    fetchAttandanceChart(month, year)
      .then((data) => {
        setAttendanceData(data);
        loading = false;
      })
      .catch((error) => {
        console.log(error);
        setAttendanceData([]);
      });
  }, [month, year]);

  const options1 = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Sơ đồ số ngày điểm danh của các nhân viên trong tháng ".concat(
          currentMonth
        ),
      },
    },
  };
  const options2 = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Sơ đồ số giờ điểm danh của các nhân viên trong tháng ".concat(
          currentMonth
        ),
      },
    },
  };

  const data1 = {
    labels: attendanceChart.map((att) => att.first_name),
    datasets: [
      {
        label: "Số ngày",
        data: attendanceChart.map((att) => att.total_days),
        borderColor: "rgb(187, 247 ,208)",
        backgroundColor: "rgb(187, 247, 208, 0.7)",
      },
    ],
  };
  const data2 = {
    labels: attendanceChart.map((att) => att.first_name),
    datasets: [
      {
        label: "Số giờ",
        data: attendanceChart.map((att) => att.total_hours),
        borderColor: "rgb(255, 247 ,208)",
        backgroundColor: "rgb(255, 247, 208, 0.7)",
      },
    ],
  };
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="container mx-auto px-4 sm:px-8 border border-slate-200 rounded-xl">
        <div className="py-8">
          <div className="flex flex-row items-center justify-between">
            <motion.h2
              variants={textVariant(0.5)}
              initial="hidden"
              animate="show"
              className="text-2xl font-semibold leading-tight"
            >
              Thống kê
            </motion.h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.1,
              }}
              className="flex flex-row mb-1 sm:mb-0 sm:flex-row border border-slate-500 rounded-md overflow-hidden"
            >
              <div className="p-2 block items-center bg-white">
                <select
                  name="month"
                  id="month"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                >
                  {month_filter.map((item, index) => (
                    <option value={item} key={index}>
                      Tháng {item}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  id="year"
                >
                  {year_filter.map((item, index) => (
                    <option value={item} key={index}>
                      Năm {item}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
            <motion.div
              variants={zoomIn(0.5, 0.3)}
              initial="hidden"
              animate="show"
              className="flex items-center justify-center p-2 bg-slate-200 ml-auto rounded-md"
            >
              <button
                className={`p-1 ${isListView && "bg-white"} rounded-sm`}
                onClick={() => {
                  setIsListView(true);
                }}
              >
                <span className="text-xl font-semibold">
                  <AiOutlineOrderedList />
                </span>
              </button>
              <button
                className={`p-1 rounded-sm ${!isListView && "bg-white"}`}
                onClick={() => {
                  setIsListView(false);
                }}
              >
                <span className="text-xl font-semibold">
                  <AiOutlinePicLeft />
                </span>
              </button>
            </motion.div>
          </div>
          {attendanceChart.length > 0 ? (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              {isListView ? (
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Họ Tên
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Số ngày làm
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Số giờ làm
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Lương
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceChart.map((employee, i) => (
                        <motion.tr
                          variants={zoomIn(i * 0.03, 0.5)}
                          initial="hidden"
                          whileInView="show"
                          whileHover="whileHover"
                          key={i}
                        >
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={HOST_API.concat(employee.img)}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {employee.first_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {employee.total_days}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {employee.total_hours}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {employee.total_hours * 200} $
                            </p>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="container bg-white border rounded-md py-5 px-1">
                  <div className="flex-col justify-center items-center  ">
                    <div className="flex items-center justify-center">
                      <Bar options={options1} data={data1} />
                    </div>
                    <div className="mt-4">
                      <Bar options={options2} data={data2} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>Không có dữ liệu</div>
          )}
        </div>
      </div>
    );
  }
};

export default Chart;
