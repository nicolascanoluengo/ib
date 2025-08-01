import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProgressPage = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Mock data for now
    const mockAnalyses = [
      { date: '2023-10-01', grade: 5 },
      { date: '2023-10-15', grade: 6 },
      { date: '2023-11-05', grade: 6 },
      { date: '2023-11-20', grade: 7 },
    ];
    
    const labels = mockAnalyses.map(a => new Date(a.date).toLocaleDateString());
    const data = mockAnalyses.map(a => (a.grade / 7) * 100);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Average Score (%)',
          data,
          borderColor: 'rgba(96, 165, 250, 1)',
          backgroundColor: 'rgba(96, 165, 250, 0.5)',
          type: 'line',
          tension: 0.4,
          yAxisID: 'y',
        },
        {
          label: 'Score',
          data,
          backgroundColor: 'rgba(74, 222, 128, 0.2)',
          borderColor: 'rgba(74, 222, 128, 1)',
          borderWidth: 1,
          type: 'bar',
          yAxisID: 'y'
        }
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#cbd5e1'
          }
        },
        title: {
          display: true,
          text: 'Your Grade Progression Over Time',
          color: '#f8fafc',
          font: {
              size: 18
          }
        },
      },
      scales: {
        x: {
            ticks: { color: '#94a3b8' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        y: {
            beginAtZero: true,
            max: 100,
            ticks: { 
                color: '#94a3b8',
                callback: function(value) {
                    return value + '%'
                }
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      }
    });

  }, []);

  return (
    <>
      <Helmet>
        <title>My Progress - IB Assessment AI</title>
        <meta name="description" content="Track your IB essay grade improvement over time with detailed charts and statistics." />
      </Helmet>
      <Navigation />
      <div className="pt-40 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-400" />
              My Progress
            </h1>
            <p className="text-xl text-gray-300">
              Visualize your journey to a 7.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Highest Score</p>
                    <p className="text-2xl font-bold">7</p>
                  </div>
                  <Award className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Average Score</p>
                    <p className="text-2xl font-bold">6</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
             <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Improvement</p>
                    <p className="text-2xl font-bold">+2 Points</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Grade Progression</CardTitle>
                <CardDescription>
                  This chart shows the percentage equivalent of your grades over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 relative">
                  <Bar options={chartOptions} data={chartData} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProgressPage;