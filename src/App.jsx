import React, { useState, useEffect } from 'react';
import dashboardData from './WidgetData';
import AddWidgetModal from './components/AddWidgetModal';
import { generateRandomChartData } from './generateRandomChartData';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {ArrowsCounterClockwise } from 'phosphor-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function App() {
  const [dashboard, setDashboard] = useState(dashboardData);
  const [modalCategoryKey, setModalCategoryKey] = useState(null);
  const [isGlobalModalOpen, setGlobalModalOpen] = useState(false);

  useEffect(() => {
    // Initialize dashboard with random chart data when the app mounts
    setDashboard((prevDashboard) =>
      prevDashboard.map((category) => ({
        ...category,
        widgets: category.widgets.map((widget) => ({
          ...widget,
          chartData: generateRandomChartData(widget.chartType),
        })),
      }))
    );
  }, []);

  const handleAddWidgets = (widgetsToAdd, categoryKey) => {
    setDashboard((prev) =>
      prev.map((cat) =>
        cat.key === categoryKey
          ? {
              ...cat,
              widgets: [
                ...cat.widgets,
                ...widgetsToAdd.filter(
                  (w) => !cat.widgets.some((existing) => existing.name === w.name)
                ).map((widget) => ({
                  ...widget,
                  chartData: generateRandomChartData(widget.chartType), // Generate chart data for new widgets
                })),
              ],
            }
          : cat
      )
    );
    setModalCategoryKey(null);
  };

  const handleGlobalAddWidgets = (widgetsMap) => {
    setDashboard((prev) =>
      prev.map((cat) => {
        const newWidgets = widgetsMap[cat.key] || [];
        return {
          ...cat,
          widgets: [
            ...cat.widgets,
            ...newWidgets.filter(
              (w) => !cat.widgets.some((existing) => existing.name === w.name)
            ).map((widget) => ({
              ...widget,
              chartData: generateRandomChartData(widget.chartType), // Generate chart data for new widgets
            })),
          ],
        };
      })
    );
    setGlobalModalOpen(false);
  };

  const handleRemoveWidget = (catKey, widgetName) => {
    setDashboard((prev) =>
      prev.map((cat) =>
        cat.key === catKey
          ? {
              ...cat,
              widgets: cat.widgets.filter((w) => w.name !== widgetName),
            }
          : cat
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 p-4 bg-white sticky top-0 z-50">
        <h1 className="text-lg font-semibold">CNAPP Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button className="border px-3 py-1 rounded text-sm"><ArrowsCounterClockwise size={32} /></button>
          <button className="border px-3 py-1 rounded text-sm">⋮</button>
          <button className="border px-3 py-1 rounded text-sm bg-[#0A1B53] text-white" onClick={() => setGlobalModalOpen(true)}>
            + Add Widget
          </button>
          <div className="relative">
            <select className="text-sm border px-2 py-1 rounded">
              <option>Last 2 days</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>
      </div>

      {dashboard.map(({ category, widgets, key }) => (
        <div key={key} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {widgets.map((w) => (
              <div key={w.name} className="bg-white p-4 rounded shadow relative">
                <button
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => handleRemoveWidget(key, w.name)}
                >
                  &times;
                </button>
                <h3 className="font-semibold mb-1">{w.name}</h3>
                <p className="text-sm text-gray-700">{w.text}</p>

                {w.chartType === 'pie' && w.chartData && (
                  <Pie
                  data={w.chartData}
                  height={80}
                  width={80}
                  options={{
                    plugins: {
                      legend: { display: true },
                    },
                  }}
                />
                
                )}
                {w.chartType === 'bar' && w.chartData && (
                  <Bar data={w.chartData} />
                )}
              </div>
            ))}
            <button
              onClick={() => setModalCategoryKey(key)}
              className="border-2 border-dashed border-gray-400 rounded flex items-center justify-center h-32 text-gray-600"
            >
              + Add Widget
            </button>
          </div>
        </div>
      ))}

      {(modalCategoryKey || isGlobalModalOpen) && (
        <AddWidgetModal
          isGlobal={isGlobalModalOpen}
          onClose={() => {
            setModalCategoryKey(null);
            setGlobalModalOpen(false);
          }}
          onSave={
            isGlobalModalOpen
              ? handleGlobalAddWidgets
              : (widgets) => handleAddWidgets(widgets, modalCategoryKey)
          }
          categoryKey={modalCategoryKey}
          currentWidgetsMap={Object.fromEntries(
            dashboard.map((cat) => [cat.key, cat.widgets])
          )}
        />
      )}
    </div>
  );
}
