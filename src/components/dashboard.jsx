import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from 'react'
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

    const [pieChartData, setPieChartData] = useState([
        { name: "MALE", value: 322 },
        { name: "FEMALE", value: 110 }
    ])

    const [barChartData, setBarChartData] = useState([
        { cluster: "COR", steps: 18000 },
        { cluster: "KER", steps: 14000 },
        { cluster: "CODE", steps: 12000 },
        { cluster: "BJO", steps: 10000 },
        { cluster: "MUM", steps: 8000 },
        { cluster: "TUP", steps: 6000 },
        { cluster: "MPS", steps: 5000 },
        // add remaining entries if the list scrolls further

    ])

    const COLORS = ["rgba(238, 11, 11, 1)", "rgba(255, 197, 0, 1)"];

    return (
        <div>
            <div className='header'>
                <img alt="logo" src="logo.png" />
                <User />
            </div>
            <div className="flex d-col gap-2 p-5">
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
                            <div className="bg-light shadow-sm rounded p-4">
                                <h2 className="h5 fw-semibold mb-4 text-secondary">Group Distribution</h2>

                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={140}
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
                                <div class="step-value">327636</div>
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
                                <li><span>01</span><span>CORP-MUM</span><span>8</span></li>
                                <li><span>02</span><span>CORP-PUNE</span><span>6</span></li>
                                <li><span>03</span><span>SNOC-HYD</span><span>5</span></li>
                                <li><span>04</span><span>BANGLORE</span><span>5</span></li>
                                <li><span>05</span><span>DELHI</span><span>4</span></li>
                                <li><span>06</span><span>GUJ</span><span>4</span></li>
                                <li><span>07</span><span>MPS</span><span>3</span></li>
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
                                <li><span>01</span><span>CORP-MUM</span><span>987656</span></li>
                                <li><span>02</span><span>CORP-PUNE</span><span>678769</span></li>
                                <li><span>03</span><span>SNOC-HYD</span><span>558765</span></li>
                                <li><span>04</span><span>BANGLORE</span><span>523415</span></li>
                                <li><span>05</span><span>DELHI</span><span>488765</span></li>
                                <li><span>06</span><span>GUJ</span><span>409876</span></li>
                                <li><span>07</span><span>MPS</span><span>309867</span></li>
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
                                <li><span>01</span><span>CORP-MUM</span><span>8</span></li>
                                <li><span>02</span><span>CORP-PUNE</span><span>6</span></li>
                                <li><span>03</span><span>SNOC-HYD</span><span>5</span></li>
                                <li><span>04</span><span>BANGLORE</span><span>5</span></li>
                                <li><span>05</span><span>DELHI</span><span>4</span></li>
                                <li><span>06</span><span>GUJ</span><span>4</span></li>
                                <li><span>07</span><span>MPS</span><span>3</span></li>
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
                                    data={barChartData}
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
                                <li><span>01</span><span>CORP-MUM</span><span>8</span></li>
                                <li><span>02</span><span>CORP-PUNE</span><span>6</span></li>
                                <li><span>03</span><span>SNOC-HYD</span><span>5</span></li>
                                <li><span>04</span><span>BANGLORE</span><span>5</span></li>
                                <li><span>05</span><span>DELHI</span><span>4</span></li>
                                <li><span>06</span><span>GUJ</span><span>4</span></li>
                                <li><span>07</span><span>MPS</span><span>3</span></li>
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
                                    data={barChartData}
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