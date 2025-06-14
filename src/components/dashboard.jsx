import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect, use } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import { Calendar, Download,CircleUser, Settings, LogOut } from "lucide-react";
import Select from "react-select";
import Loader from "./Loader";
import * as XLSX from 'xlsx';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';
import { se } from "date-fns/locale";
import { set } from "date-fns";



const dashboard = () => {


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [names, setNames] = useState([]);
    const [selectedId, setSelectedId] = useState([]);

    const [stepCount, setStepCount] = useState(0);
    const [gender, setGender] = useState(0);
    const [achieversCount, setAchieversCount] = useState([]);
    const [functionRanking, setFunctionRanking] = useState([]);
    const [clusterRanking, setClusterRanking] = useState([]);
    const [circleRanking, setCircleRanking] = useState([]);

    const [loading, setLoading] = useState(false);
    const dropdownRef = React.useRef(null);

    const [isDownloading, setIsDownloading] = useState(false);



    const [pieChartData, setPieChartData] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const Startdatepickref = React.useRef(null);
    const Enddatepickref = React.useRef(null);
    const [options,setOptions]= useState([]);

    const [formattedStartDate,setformattedStartDate] =useState(null);
    const [formattedEndDate,setformattedEndDate] =useState(null);
    const [formattedId,setformattedId] =useState(null);
    const[dateChecker,setDateChecker]= useState(false);
    


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
        }else{
            setBarChartData1("");
        }
        if (functionRanking?.length > 0) {
            const formattedData = functionRanking.map(item => ({
                function: item.department_name,
                steps: item.avg_steps
            }));
            
            console.log(formattedData);
            setBarChartData2(formattedData);
        }
        else{
                setBarChartData2("");
            }
    }, [clusterRanking, functionRanking]);


    const COLORS = ["rgba(238, 11, 11, 1)", "rgba(255, 197, 0, 1)"];


    
    const handleDropDown=()=>{
        setShowUserModal(!showUserModal);
    }
    const genderwiseToExcel = async() => {
    setIsDownloading(true);
    try {
      const response = await fetch(`https://reports.lockated.com/api-fm/stepathon/gender-participation-export/?site_id=${formattedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}&export=excel`);

      if (!response.ok) {
        alert("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'total_gender_participation.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };
        
        //  window.open(`https://reports.lockated.com/api-fm/stepathon/get-gender-participation-download/?site_id=${formattedId}&society_id=null&from_date=${formattedStartDate}&to_date=${formattedEndDate}`, "_blank");

    const kAchieversToExcel = async() => {
        setIsDownloading(true);
    try {
      const response = await fetch(`https://reports.lockated.com/api-fm/stepathon/circle-wise-20k-achiever-export/?from_date=${formattedStartDate}&to_date=${formattedEndDate}&site_id=${formattedId}&export=excel`);

      if (!response.ok) {
        alert("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'circle_20k_achievers.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };
    
    const top10CircleToExcel = async() => {
            setIsDownloading(true);
    try {
      const response = await fetch(`https://reports.lockated.com/api-fm/stepathon/circle-leveling-ranking-export/?from_date=${formattedStartDate}&to_date=${formattedEndDate}&site_id=${formattedId}&export=excel`);

      if (!response.ok) {
        alert("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'circle_leveling_ranking.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };
    
    const top10FunctionToExcel = async() => {
                setIsDownloading(true);
    try {
      const response = await fetch(`https://reports.lockated.com/api-fm/stepathon/function-leveling-ranking-export/?from_date=${formattedStartDate}&to_date=${formattedEndDate}&site_id=${formattedId}&export=excel`);

      if (!response.ok) {
        alert("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'function_leveling_ranking.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };
    
    const top10clusterToExcel = async() => {
                setIsDownloading(true);
    try {
      const response = await fetch(`https://reports.lockated.com/api-fm/stepathon/cluster-leveling-ranking-export/?from_date=${formattedStartDate}&to_date=${formattedEndDate}&site_id=${formattedId}&export=excel`);

      if (!response.ok) {
        alert("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cluster_leveling_ranking.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const stepCountToExcel = async() => {
                setIsDownloading(true);
    try {
      const response = await fetch(`https://reports.lockated.com/api-fm/stepathon/get-organisation-daily-step-count-download/?from_date=${formattedStartDate}&to_date=${formattedEndDate}&site_id=${formattedId}`);

      if (!response.ok) {
        alert("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Daily_step_count.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download failed: " + error.message);
    } finally {
      setIsDownloading(false);
    }
  }

    const formatData = () => {
         const localFormattedStartDate = startDate ? startDate.toISOString().split("T")[0] : "";
    const localFormattedEndDate = endDate ? endDate.toISOString().split("T")[0] : "";
    const localFormattedId = selectedId.length > 0 ? selectedId.join(",") : "";

    // Optionally update state (if used elsewhere)
    setformattedStartDate(localFormattedStartDate);
    setformattedEndDate(localFormattedEndDate);
    setformattedId(localFormattedId);

    if (selectedId.length > 0) {
        updateData(localFormattedId, localFormattedStartDate, localFormattedEndDate);
    }
    }

    const updateData = async (formattedId, formattedStartDate, formattedEndDate) => {
        setLoading(true);
        console.log(formattedId, formattedStartDate, formattedEndDate);
        try {
            const genderData = await axios.get(
                `https://reports.lockated.com/api-fm/stepathon/gender-participation-datewise/?site_id=${formattedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`
            );
            setGender({female:genderData.data.final_female_count, male:genderData.data.final_male_count});

            const achieversData = await axios.get(
                `https://reports.lockated.com/api-fm/stepathon/circle-wise-20k-achiever/?site_id=${formattedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`
            );
            setAchieversCount(achieversData.data.data);

            const functionRankingData = await axios.get(
                `https://reports.lockated.com/api-fm/stepathon/function-leveling-ranking/?site_id=${formattedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`
            );
            setFunctionRanking(functionRankingData.data.data);

            const clusterRankingData = await axios.get(
                `https://reports.lockated.com/api-fm/stepathon/cluster-leveling-ranking/?site_id=${formattedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`
            );
            setClusterRanking(clusterRankingData.data.data);

            const circleRankingData = await axios.get(
                `https://reports.lockated.com/api-fm/stepathon/circle-leveling-ranking/?site_id=${formattedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`
            );
            setCircleRanking(circleRankingData.data.data);

            const stepCountData = await axios.get(
                `https://reports.lockated.com/api-fm/stepathon/get-organisation-daily-step-count/?site_id=${formattedId}&from_date=${formattedStartDate}&to_date=${formattedEndDate}`
            );
            setStepCount(stepCountData.data.response);

        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchNames = async () => {
    try {
        const response = await axios.get("https://reports.lockated.com/api-fm/stepathon/vi-site-lists/");
        const data = response.data.data; // assuming this is an array

        const formattedNames = data.map((item) => ({
            label: item.name,
            value: item.id,
        }));
        setSelectedId(formattedNames.map((name) => name.value));
    } catch (error) {
        console.error("Failed to fetch names:", error);
    }
};
fetchNames();
    }, []);


function formatTimestampToCustomDate(timestamp) {
  const date = new Date(timestamp);

  // Options for formatting the date
  const options = {
    weekday: 'long',  // "Tuesday"
    month: 'long',    // "June"
    day: 'numeric',   // "10"
    year: 'numeric'   // "2025"
  };

  // Use toLocaleDateString to format the date
  return date.toLocaleDateString('en-US', options);
}
    
useEffect(() => {
    const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    handleDropDown();
  }
};

if (showUserModal) {
  document.addEventListener('mousedown', handleClickOutside);
}

return () => {
  document.removeEventListener('mousedown', handleClickOutside);
};
}, [showUserModal,handleDropDown]);

    const handleChange = (selectedOptions) => {
        const checkAll=selectedOptions.find((option) => option.value === "*");
        if(checkAll){
            setSelectedId([]);
        }
        else{
            setSelectedId(selectedOptions.map((option) => option.value));
        }
        
        console.log(selectedId);
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,

            maxWidth: "300px",

        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '40px', // Set your desired fixed height here
            overflowY: 'hidden',
            overflowX: 'auto',
            flexWrap: 'nowrap',
        }),
        multiValue: (provided, state) => ({
            ...provided,
            // Ensure multivalues don't shrink too much if needed
            flexShrink: 0,
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '2px', // Adjust as needed
        }),
        // ... include your existing styles for control, valueContainer etc. ...

        // ... multiValue, input styles ...

        menu: (provided, state) => ({
            ...provided, // Base styles are crucial
            maxHeight: '200px', // Or your desired max-height/height e.g., '150px'
            backgroundColor: 'white', // Ensure solid white background
            zIndex: 5000, // High z-index for stacking
            // Check for any opacity being applied by provided or external CSS
            // opacity: 1, // Explicitly set if needed, but usually not required
            border: '1px solid #DDD', // Optional: adds definition
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // Optional: enhances visual separation
        }),

        menuList: (provided, state) => ({
            ...provided, // Base styles
            // --- Add vertical scroll when content overflows ---
            overflowY: 'auto',
            // --- Ensure list respects menu's max-height ---
            // maxHeight: '200px', // Explicitly set if needed, matching menu's maxHeight
            // Or often just inheriting works if menu has maxHeight set:
            maxHeight: 'inherit',
            // Ensure background just in case (usually inherits from menu)
            // backgroundColor: 'white',
        }),

        // If using portals:
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999, // Ensure portal container is also high
        }),
    };


    return (
        <div className="dashboard">
            
            <div className='header'>
                <img alt="logo" src="logo.png" />
                <div className=" header-right">

                    {/* <Select
                        isMulti
                        options={options}
                        onChange={handleChange}
                        placeholder="Select Categories..."
                        closeMenuOnSelect={false} 
                        hideSelectedOptions={true} 
                        className="w-full "
                        styles={customStyles}
                        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                        formatOptionLabel={({label,value})=>{
                              if(value==='*'){
                                return(
                                    <div style={{fontWeight:"500",color:"red"}}>
                                        {label}
                                    </div>
                                )
                              }
                              return (
                                <span>{label}</span>
                              )
                        }}
                    /> */}
                   <span className="mt-2" style={{"fontSize":"18px",fontWeight:"400"}}> {
                        formatTimestampToCustomDate(Date.now())
                    }</span>
                    <div className="user-icon-wrapper" style={{ position: 'relative' }}> {/* This is a flex item, and the new positioning context */}
      <CircleUser className="user-icon" onClick={handleDropDown} ref={dropdownRef}/>
      {showUserModal && (
        <div className="dropdown" > {/* This will be absolute, positioned relative to user-icon-wrapper */}
          <span style={{borderBottom:"1px solid #DDD" ,display:"inline",textAlign:"left"
          }}><CircleUser size={18} style={{display:"inline",margin:"8px",marginRight:"10px",}}/><p style={{display:"inline"}}>My Profile</p></span>
          <span style={{borderBottom:"1px solid #DDD",display:"inline",textAlign:"left"}}><Settings size={18} style={{display:"inline",   margin:"8px",marginRight:"10px",}}/><p style={{display:"inline"}}>Account</p></span>
          <span style={{display:"inline",textAlign:"left"}}><LogOut size={18} style={{display:"inline",margin:"8px",marginRight:"10px"}}/><p style={{display:"inline"}}>SignOut</p></span>
        </div>
      )}
    </div>
                </div>
                
                     
            </div>
            <div className="flex d-col gap-2 p-lg-3 p-md-2">
                <div className="d-flex flex-row align-items-center justify-content-between " style={{ height: "60px", padding: "10px 60px" }}>
                    <span className="fw-medium fs-2 " style={{ color: "rgba(34, 43, 69, 1)", margin: "20px" }}>Vi Stepping Stars</span>
                    <div className="d-flex align-items-center gap-2">
                        <div className="position-relative">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label style={{ fontSize: "12px", color: "grey", textAlign: "left" }}>
                                    Select Start Date
                                </label>
                                <DatePicker
                                    ref={Startdatepickref}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    className=" date-input "
                                />
                                <Calendar className="calendar-icon" onClick={() => Startdatepickref.current?.setOpen(true)} />
                            </div>
                        </div>
                        <span className="to" style={{ marginTop: "15px" }}>TO</span>
                        <div className="position-relative">
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label style={{ fontSize: "12px", color: "grey", textAlign: "left" }}>
                                    Select End Date
                                </label>
                                <DatePicker
                                    ref={Enddatepickref}
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    minDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="date-input "
                                >
                                </DatePicker>
                                <Calendar className="calendar-icon" onClick={() => Enddatepickref.current?.setOpen(true)} />
                            </div>
                        </div>
                        <button className="btn-red" onClick={formatData} >
                            Apply
                        </button>
                    </div>
                </div>
                <div className="heading"></div>
                <div class="dashboard-grid-1">

                    <div class="card gender-card">
                        <div class="card-header">
                            <h3>Gender-wise Participants</h3>
                            <span className="icon" onClick={genderwiseToExcel}><Download /></span>

                        </div>
                        <div class="card-body">
                            <div style={{ height: "100%" }}>

                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart >
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={100}
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



                                <div class="legend">
                                    <span style={{ marginRight: "45px" }}  ><span class="color-dot red"></span> Male</span>
                                    <span><span class="color-dot yellow"></span> Female</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class=" card step-count-card">
                        <div className="d-flex d-row justify-content-between align-items-center">
                            <div>
                                <div class="step-icon">
                                    <img src="famicons_footsteps.png" />
                                </div>
                                <div class="step-value">{stepCount ? stepCount : 0}</div>
                            </div>
                            
                                <span className="icon" onClick={stepCountToExcel}><Download style={{ color: "#888" }} /></span>
                            
                        </div>
                        <div ><p style={{ marginTop: "55px", fontWeight: "500" }}>An Organisation's Daily Step Count</p></div>
                    </div>

                    <div class="card achievers-card">
                        <div class="card-header">
                            <h3>20K Steps Achievers Count</h3>
                            <span className="icon" onClick={kAchieversToExcel}><Download /></span>

                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Circle Name</span><span>User Count</span></li>
                                {achieversCount.map((item, index) => (
                                    <li><span>{index + 1}</span><span>{item.circle_name}</span><span>{item.users_with_20k_steps>=10?item.users_with_20k_steps:`${0}${item.users_with_20k_steps}`}</span></li>
                                ))

                                }

                            </ul>
                        </div>
                    </div>

                    <div class="card ranking-card">
                        <div class="card-header">
                            <h3>Top 10 Circle Level Ranking</h3>
                            <span className="icon" onClick={top10CircleToExcel}><Download /></span>

                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Circle Name</span><span>Avg steps</span></li>
                                {circleRanking.map((item, index) => (
                                    <li><span>{index + 1}</span><span>{item.circle_name}</span><span>{item.avg_steps>=10?item.avg_steps:`${0}${item.avg_steps}`}</span></li>
                                ))

                                }
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='heading' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                    <p>Function Statistics</p>
                </div>
                <div className='dashboard-grid-2'>
                    <div class="card function-ranking-card">
                        <div class="card-header">
                            <h3>Top 10 Function Level Ranking</h3>
                            <span className="icon" onClick={top10FunctionToExcel}><Download /></span>

                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Functions</span><span>Avg Steps</span></li>
                                {functionRanking.map((item, index) => (
                                    <li><span>{index + 1}</span><span>{item.department_name}</span><span>{item.avg_steps>=10?item.avg_steps:`${0}${item.avg_steps}`}</span></li>
                                ))

                                }
                            </ul>
                        </div>
                    </div>
                    <div className="card-body bar-card">
                        <div className="bg-white shadow-md rounded-lg h-100 card">
                            <h2 className="text-lg font-semibold m-4 text-gray-700" style={{ fontSize: "16px" }}>
                                Function Wise Average Steps
                            </h2>
                            <ResponsiveContainer width="100%" height={450}>
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
                                        angle={-45}
                                        textAnchor="end"
                                        interval={0}
                                        height={60}
                                        dy={10}
                                        style={{ fontSize: "12px" }}
                                    />

                                    <YAxis
                                    domain={[0,20000]}
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
                                    <Bar dataKey="steps" fill={COLORS[1]} name="Steps" barSize={45} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
                <div className="heading" >
                    <p >Cluster Statistics</p>
                </div>
                <div className='dashboard-grid-2'>
                    <div class="card function-ranking-card">
                        <div class="card-header">
                            <h3>Top 10 Cluster Level Ranking</h3>
                            <span className="icon" onClick={top10clusterToExcel}><Download /></span>
                        </div>
                        <div class="card-body">
                            <ul class="rank-list">
                                <li><span>Rank</span><span>Cluster</span><span>Avg Steps</span></li>
                                {clusterRanking.map((item, index) => (
                                    <li><span>{index + 1}</span><span>{item.cluster_name}</span><span>{item.avg_steps>=10?item.avg_steps:`${0}${item.avg_steps}`}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="card-body bar-card">
                        <div className="bg-white shadow-md rounded-lg h-100 card">
                            <h2 className="text-lg font-semibold m-4 text-gray-700" style={{ fontSize: "16px" }}>
                                Cluster Wise Average Steps
                            </h2>
                            <ResponsiveContainer width="90%" height={400} >
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
                                            fill: "#333",
                                        }}
                                    />

                                    <YAxis
                                        domain={[0,20000]}
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
            {(loading || isDownloading)? <Loader isLoading={loading||isDownloading} /> : null};
        </div>
    )
}

export default dashboard