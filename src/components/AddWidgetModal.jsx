import React, { useState } from 'react';
import dashboardData from '../WidgetData';

export default function AddWidgetModal({
  onClose,
  onSave,
  currentWidgetsMap,
  categoryKey,
  isGlobal = false,
}) {
  const [activeTab, setActiveTab] = useState(categoryKey || dashboardData[0]?.key);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  const getAvailableWidgets = (key) => {
    const all = dashboardData.find((d) => d.key === key)?.widgets || [];
    const existing = currentWidgetsMap[key] || [];
    return all.filter((w) => !existing.some((e) => e.name === w.name));
  };

  const toggleWidget = (key, widget) => {
    setSelectedWidgets((prev) => {
      const list = prev[key] || [];
      const exists = list.some((w) => w.name === widget.name);
      return {
        ...prev,
        [key]: exists ? list.filter((w) => w.name !== widget.name) : [...list, widget],
      };
    });
  };

  const handleConfirm = () => {
    if (isGlobal) {
      onSave(selectedWidgets);
    } else {
      onSave(selectedWidgets[categoryKey] || []);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50"
      onClick={onClose}
    >
      <div
        className="w-[450px] lg:w-[550px] h-full bg-white shadow-xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Add Widget</h2>
        <p className="mb-4 text-sm text-gray-600">
          Personalise your dashboard by adding the following widget
        </p>
        <div className="flex space-x-4 border-b mb-4">
          {dashboardData.map((cat) => (
            <button
              key={cat.key}
              className={`pb-2 ${
                activeTab === cat.key
                  ? 'border-b-2 border-blue-600 font-semibold'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(cat.key)}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {getAvailableWidgets(activeTab).map((widget) => {
            const selected = (selectedWidgets[activeTab] || []).some(
              (w) => w.name === widget.name
            );
            return (
              <label key={widget.name} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleWidget(activeTab, widget)}
                />
                <span>{widget.name}</span>
              </label>
            );
          })}
          {getAvailableWidgets(activeTab).length === 0 && (
            <p className="text-gray-500">No widgets available</p>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-[#0A1B53] text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
