import React, { useState, useEffect } from 'react';
import dashboardData from './WidgetData';
import AddWidgetModal from './components/AddWidgetModal';
import { generateRandomChartData } from './generateRandomChartData';
import Header from './components/Header';
import Category from './components/Category';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function App() {
  const [dashboard, setDashboard] = useState(dashboardData);
  const [modalCategoryKey, setModalCategoryKey] = useState(null);
  const [isGlobalModalOpen, setGlobalModalOpen] = useState(false);

  useEffect(() => {
    setDashboard((prev) =>
      prev.map((category) => ({
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
                ...widgetsToAdd
                  .filter((w) => !cat.widgets.some((existing) => existing.name === w.name))
                  .map((widget) => ({
                    ...widget,
                    chartData: generateRandomChartData(widget.chartType),
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
            ...newWidgets
              .filter((w) => !cat.widgets.some((existing) => existing.name === w.name))
              .map((widget) => ({
                ...widget,
                chartData: generateRandomChartData(widget.chartType),
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
          ? { ...cat, widgets: cat.widgets.filter((w) => w.name !== widgetName) }
          : cat
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] p-6">
      <Header setGlobalModalOpen={setGlobalModalOpen} />
      {dashboard.map(({ category, widgets, key }) => (
        <Category
          key={key}
          category={category}
          widgets={widgets}
          categoryKey={key}
          onAddWidget={setModalCategoryKey}
          onRemoveWidget={handleRemoveWidget}
        />
      ))}
      {(modalCategoryKey || isGlobalModalOpen) && (
        <AddWidgetModal
          isGlobal={isGlobalModalOpen}
          onClose={() => {
            setModalCategoryKey(null);
            setGlobalModalOpen(false);
          }}
          onSave={isGlobalModalOpen ? handleGlobalAddWidgets : handleAddWidgets}
          categoryKey={modalCategoryKey}
          currentWidgetsMap={Object.fromEntries(dashboard.map((cat) => [cat.key, cat.widgets]))}
        />
      )}
    </div>
  );
}