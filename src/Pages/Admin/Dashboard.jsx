import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const orderStatusData = {
    labels: dashboardData.orderStatusBreakdown?.map(status => status._id) || [],
    datasets: [{
      data: dashboardData.orderStatusBreakdown?.map(status => status.count) || [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  const revenueData = {
    labels: ['Revenue'],
    datasets: [{
      data: [dashboardData.totalRevenue || 0],
      backgroundColor: '#36A2EB',
    }]
  };

  return (
    <div className="dashboard w-full p-4  lg:p-8">
      <h1 className="text-xl lg:text-2xl pt-[50px] lg:pt-8 font-bold mb-6 text-center lg:text-left">Admin Dashboard</h1>

      <div className="dashboard-stats grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        <div className="stat bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-md lg:text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-xl lg:text-2xl font-bold">{dashboardData.totalUsers}</p>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-md lg:text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-xl lg:text-2xl font-bold">{dashboardData.totalOrders}</p>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-md lg:text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-xl lg:text-2xl font-bold">Rs.{Math.round(dashboardData.totalRevenue)}</p>
        </div>
        <div className="stat bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-md lg:text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-xl lg:text-2xl font-bold">{dashboardData.productCounts}</p>
        </div>
      </div>

      <div className="dashboard-charts grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="chart bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-md lg:text-lg font-semibold mb-4 text-center">Order Status Breakdown</h3>
          <Pie data={orderStatusData} />
        </div>
        <div className="chart bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-md lg:text-lg font-semibold mb-4 text-center">Total Revenue</h3>
          <Bar data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
