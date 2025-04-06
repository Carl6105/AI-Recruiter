import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Calendar, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Active Job Descriptions', value: '12', icon: FileText, color: 'bg-blue-500' },
    { label: 'Candidates Reviewed', value: '156', icon: Users, color: 'bg-green-500' },
    { label: 'Interviews Scheduled', value: '28', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Successful Placements', value: '18', icon: CheckCircle, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Placeholder for recent activity */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm text-gray-900">New candidate application received</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;