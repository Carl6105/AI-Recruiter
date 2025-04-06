import React from 'react';
import { motion } from 'framer-motion';
import { Save, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const [settings, setSettings] = React.useState({
    matchThreshold: 80,
    autoShortlist: true,
    emailNotifications: true,
    interviewDuration: 60,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save to a backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="text-base font-medium text-gray-900">
                Matching Settings
              </label>
              <div className="mt-4 space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-gray-700">
                    Match Score Threshold (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.matchThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        matchThreshold: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoShortlist"
                    checked={settings.autoShortlist}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        autoShortlist: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoShortlist" className="text-sm text-gray-700">
                    Automatically shortlist candidates above threshold
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-900">
                Interview Settings
              </label>
              <div className="mt-4 space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-gray-700">
                    Default Interview Duration (minutes)
                  </label>
                  <select
                    value={settings.interviewDuration}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        interviewDuration: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-900">
                Notification Settings
              </label>
              <div className="mt-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emailNotifications: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="emailNotifications"
                    className="text-sm text-gray-700"
                  >
                    Receive email notifications for new candidates
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;