export const generateRandomChartData = (type) => {
    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
    const data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
  
    if (type === 'pie') {
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
  
    return { labels: [], datasets: [] };  // Fallback for invalid type
  };
  