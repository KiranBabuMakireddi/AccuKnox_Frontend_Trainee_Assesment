import React, { memo } from 'react';
import { Pie, Bar } from 'react-chartjs-2';

const Widget = memo(({ widget, categoryKey, onRemove }) => {
  return (
    <div className="bg-white p-4 rounded shadow relative">
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={() => onRemove(categoryKey, widget.name)}
        aria-label={`Remove ${widget.name} widget`}
      >
        &times;
      </button>
      <h3 className="font-semibold mb-1">{widget.name}</h3>
      <p className="text-sm text-gray-700">{widget.text}</p>
      {widget.chartType === 'pie' && widget.chartData && (
        <Pie
          data={widget.chartData}
          height={80}
          width={80}
          options={{ plugins: { legend: { display: true } } }}
        />
      )}
      {widget.chartType === 'bar' && widget.chartData && (
        <Bar data={widget.chartData} />
      )}
    </div>
  );
});

export default Widget;