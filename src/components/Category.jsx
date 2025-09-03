import React, { memo } from 'react';
import Widget from './Widget';

const Category = memo(({ category, widgets, categoryKey, onAddWidget, onRemoveWidget }) => {
  return (
    <div className="mb-6 px-6">
      <h2 className="text-lg font-semibold mb-2">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {widgets.map((widget) => (
          <Widget
            key={widget.name}
            widget={widget}
            categoryKey={categoryKey}
            onRemove={onRemoveWidget}
          />
        ))}
        <button
          onClick={() => onAddWidget(categoryKey)}
          className="border-2 border-dashed border-gray-400 rounded flex items-center justify-center h-32 text-gray-600"
          aria-label={`Add widget to ${category}`}
        >
          + Add Widget
        </button>
      </div>
    </div>
  );
});

export default Category;