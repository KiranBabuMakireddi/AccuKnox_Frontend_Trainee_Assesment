export const generateRandomChartData = (type, widgetName) => {
  if (type === 'pie') {
    if (widgetName === 'Cloud Accounts') {
      return {
        labels: ['Connected', 'Not Connected'],
        datasets: [
          {
            data: [2, 0], // Fixed data from image
            backgroundColor: ['#0055A4', '#D3D3D3'], // Blue for Connected, Light Gray for Not Connected
            borderColor: 'white',
            borderWidth: 2,
          },
        ],
      };
    } else if (widgetName === 'Cloud Account Risk Assessment') {
      return {
        labels: ['Failed', 'Warning', 'Not Assessed', 'Passed'],
        datasets: [
          {
            data: [66, 18, 8, 8], // Fixed percentages from image
            backgroundColor: ['#FF0000', '#FFFF00', '#808080', '#00FF00'], // Red, Yellow, Gray, Green
            borderColor: 'white',
            borderWidth: 2,
          },
        ],
      };
    }
    // Fallback for other pie charts (if any)
    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
    const data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    return {
      labels: labels,
      datasets: [
        {
          label: 'Random Pie Data',
          data: data,
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700'],
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };
  } else if (type === 'bar') {
    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
    const data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    return {
      labels: labels,
      datasets: [
        {
          label: 'Random Bar Data',
          data: data,
          backgroundColor: '#33FF57',
          borderColor: '#1C3D1A',
          borderWidth: 1,
        },
      ],
    };
  }

  return { labels: [], datasets: [] }; // Fallback for invalid type
};