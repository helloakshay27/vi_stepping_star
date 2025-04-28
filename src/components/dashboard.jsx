import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { User } from "lucide-react"
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { ArrowUp, Calendar, Download, Wallet } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';
const dashboard = () => {


    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [names,setNames]=useState([]);
    const [selectedId, setSelectedId] = useState('');

    const[stepCount,setStepCount]=useState(0);
    const[gender,setGender]=useState(0);
    const [achieversCount, setAchieversCount] = useState([]);
    const[functionRanking,setFunctionRanking]=useState([]);
    const[clusterRanking,setClusterRanking]=useState([]);
    const[circleRanking,setCircleRanking]=useState([]);
    
    


    const [pieChartData, setPieChartData] = useState([]);

useEffect(() => {
  if (gender) {
    setPieChartData([
      { name: "MALE", value: gender.male || 0 },
      { name: "FEMALE", value: gender.female || 0 }
    ]);
  }
}, [gender]);


const [barChartData1, setBarChartData1] = useState([]);
const [barChartData2, setBarChartData2] = useState([]);

useEffect(() => {
  if (clusterRanking?.length > 0) {
    const formattedData = clusterRanking.map(item => ({
      cluster: item.cluster_name,
      steps: item.avg_steps
    }));
    setBarChartData1(formattedData);
  }
  if(functionRanking?.length>0){
    const formattedData = functionRanking.map(item => ({
      function: item.department_name,
      steps: item.avg_steps
    }));
    console.log(formattedData);
    setBarChartData2(formattedData);
  }
}, [clusterRanking,functionRanking]);


    const COLORS = ["rgba(238, 11, 11, 1)", "rgba(255, 197, 0, 1)"];

    useEffect(() => {
        const fetchNames=async()=>{
        const name=await axios.get("https://reports.lockated.com/api-fm/stepathon/vi-site-lists/");
        setNames(name.data.data);
        console.log(name);
        }

        fetchNames();
    },[]);

    useEffect(()=>{
        const updateData=async(formattedStartDate,formattedEndDate)=>{
            const stepCount=await axios.get(`https://reports.lockated.com/api-fm/stepathon/get-organisation-daily-step-count/?site_id=${selectedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`);
            setStepCount(stepCount.data.response);
            const gender=await axios.get(`https://reports.lockated.com/api-fm/stepathon/get-gender-participation/?site_id=${selectedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`);
            setGender(gender.data.response1);
            const achieversCount=await axios.get(`https://reports.lockated.com/api-fm/stepathon/circle-wise-20k-acheiver/?site_id=${selectedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`);
            setAchieversCount(achieversCount.data.data);
            const functionRanking=await axios.get(`https://reports.lockated.com/api-fm/stepathon/function-leveling-ranking/?site_id=${selectedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`);
            setFunctionRanking(functionRanking.data.data);
            const clusterRanking=await axios.get(`https://reports.lockated.com/api-fm/stepathon/cluster-leveling-ranking/?site_id=${selectedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`);
            setClusterRanking(clusterRanking.data.data);
            const circleRanking=await axios.get(`https://reports.lockated.com/api-fm/stepathon/circle-leveling-ranking/?site_id=${selectedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`);
            setCircleRanking(circleRanking.data.data);
            console.log(stepCount,gender,achieversCount,functionRanking,clusterRanking,circleRanking);
        }
        console.log(selectedId,startDate,endDate);
        if(selectedId && startDate && endDate){
         const formattedStartDate = startDate.toISOString().split("T")[0];
         const formattedEndDate = endDate.toISOString().split("T")[0];
         console.log(formattedStartDate,formattedEndDate);
            updateData(formattedStartDate,formattedEndDate);
    }
        
    },[selectedId,startDate,endDate]);

    const handleChange=(e)=>{
        setSelectedId(e.target.value);
    }

    return (
        <div>
            <div className='header'>
                <img alt="logo" src="logo.png" />
                <div>
                <select value={selectedId} onChange={handleChange}>
        <option value="">Select a name</option>
        {names.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
                <User />
                </div>
            </div>
            <div className="flex d-col gap-2 p-lg-3 p-md-2">
                <div className="d-flex flex-row align-items-center justify-content-between p-3">
                    <span className="fw-medium fs-3 text-20" style={{ color: "rgba(34, 43, 69, 1)" }}>VI Stepping Stars Dashboard</span>
                    <div className="d-flex align-items-center gap-2">
                        <div className="position-relative">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="dd/MM/yyyy"
                                className=" date-input "
                            />
                            <Calendar className="calendar-icon" />
                        </div>
                        <span className="to">TO</span>
                        <div className="position-relative">
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                minDate={startDate}
                                endDate={endDate}
                                dateFormat="dd/MM/yyyy"
                                className="date-input "
                            />
                            <Calendar className="calendar-icon" />
                        </div>
                        <button className="btn-red" >
                            Apply
                        </button>
                    </div>
                </div>
                <div className='heading'>
                    <p>Gender statistic and leaderboard</p>
                </div>
                <div class="dashboard-grid-1">

                    <div class="card gender-card">
                        <div class="card-header">
                            <h3>Gender Participants</h3>
                            <span className="icon"><Download /></span>

                        </div>
                        <div class="card-body">
                            <div className="bg-light shadow-sm rounded ">
                                <h2 className="h5 fw-semibold mb-4 text-secondary">Group Distribution</h2>

                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                                const RADIAN = Math.PI / 180;
                                                const radius = innerRadius + (outerRadius - innerRadius) / 2;
                                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                                return (
                                                    <text
                                                        x={x}
                                                        y={y}
                                                        fill="white"
                                                        textAnchor="middle"
                                                        dominantBaseline="central"
                                                        fontSize={14}
                                                        fontWeight="bold"
                                                    >
                                                        {pieChartData[index].value}
                                                    </text>
                                                );
                                            }}
                                        >

                                            {pieChartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>



                            <div class="legend">
                                <span><span class="color-dot red"></span> Male</span>
                                <span><span class="color-dot yellow"></span> Female</span>
                            </div>
                        </div>
                    </div>

                    <div class=" card step-count-card">
                        <div className="d-flex d-row justify-content-between align-items-center">
                            <div>
                                <div class="step-icon">
                                    <img src="famicons_footsteps.png" />
                                </div>
                                <div class="step-value">{stepCount?stepCount:0}</div>
                            </div>
                            <div>
                                <span className="icon"><Download /></span>
                            </div>
                        </div>
                        <div ><p style={{ marginTop: "55px", fontWeight: "500" }}>Organization Daily Step Count</p></div>
                    </div>

                    <div class="card achievers-card">
                        <div class="card-header">
                            <h3>20K Steps Achievers Count</h3>
                            <span className="icon"><Download /></span>

                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Circle Name</span><span>User Count</span></li>
                               { achieversCount.map((item, index) => (
                                    <li><span>{index+1}</span><span>{item.circle_name}</span><span>{item.users_with_20k_steps}</span></li>
                                ))
                                
                                }

                            </ul>
                        </div>
                    </div>

                    <div class="card ranking-card">
                        <div class="card-header">
                            <h3>Top 10 Circle Level Ranking</h3>
                            <span className="icon"><Download /></span>

                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Circle Name</span><span>Avg steps</span></li>
                                { circleRanking.map((item, index) => (
                                    <li><span>{index+1}</span><span>{item.circle_name}</span><span>{item.avg_steps}</span></li>
                                ))
                                
                                }
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='heading'>
                    <p>Function statistics</p>
                </div>
                <div className='dashboard-grid-2'>
                    <div class="card function-ranking-card">
                        <div class="card-header">
                            <h3>Top 10 Function level Ranking</h3>
                            <span className="icon"><Download /></span>

                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Circle Name</span><span>User Count</span></li>
                                { functionRanking.map((item, index) => (
                                    <li><span>{index+1}</span><span>{item.department_name}</span><span>{item.avg_steps}</span></li>
                                ))
                                
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="card-body bar-card">
                    <div className="bg-white shadow-md rounded-lg h-100">
                            <h2 className="text-lg font-semibold m-4 text-gray-700" style={{ fontSize: "16px" }}>
                                Function Wise Average Steps
                            </h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={barChartData2}
                                    margin={{ top: 10, right: 30, left: 80, bottom: 30 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="function"
                                        label={{
                                            value: "Function",
                                            position: "bottom",
                                            offset: 10,
                                            fontWeight: "bold",
                                            fill: "#333"
                                        }}
                                    />

                                    <YAxis
                                        label={{
                                            value: "Average Steps Taken",
                                            angle: -90,
                                            position: "insideCentre",
                                            dx: -50,
                                            dy: 10, 
                                            style: {
                                                fontWeight: "bold",
                                                fill: "#333",
                                            }
                                        }}
                                    />

                                    <Tooltip />
                                    {/* Legend removed */}
                                    <Bar dataKey="steps" fill="#ff0000" name="Steps" barSize={45} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
                <div className="heading">
                    <p >Cluster statistics</p>
                </div>
                <div className='dashboard-grid-2'>
                    <div class="card function-ranking-card">
                        <div class="card-header">
                            <h3>Top 10 Cluster level Ranking</h3>
                            <span className="icon"><Download /></span>
                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Circle Name</span><span>User Count</span></li>
                                { clusterRanking.map((item, index) => (
                                    <li><span>{index+1}</span><span>{item.cluster_name}</span><span>{item.avg_steps}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="card-body bar-card">
                        <div className="bg-white shadow-md rounded-lg h-100">
                            <h2 className="text-lg font-semibold m-4 text-gray-700" style={{ fontSize: "16px" }}>
                                Cluster Wise Average Steps
                            </h2>
                            <ResponsiveContainer width="90%" height={400}>
                                <BarChart
                                    data={barChartData1}
                                    margin={{ top: 10, right: 30, left: 80, bottom: 30 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="cluster"
                                        label={{
                                            value: "Cluster",
                                            position: "bottom",
                                            offset: 10,
                                            fontWeight: "bold",
                                            fill: "#333"
                                        }}
                                    />

                                    <YAxis
                                        dataKey="steps"
                                        label={{
                                            value: "Average Steps Taken",
                                            angle: -90,
                                            position: "insideCentre",
                                            dx: -50, // adjust the horizontal offset
                                            dy: 10, // adjust the vertical offset
                                            style: {
                                                fontWeight: "bold",
                                                fill: "#333",
                                            }
                                        }}
                                    />

                                    <Tooltip />
                                    {/* Legend removed */}
                                    <Bar dataKey="steps" fill="#ff0000" name="Steps" barSize={45} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>




                    </div>


                </div>

            </div>
        </div>
    )
}

export default dashboard