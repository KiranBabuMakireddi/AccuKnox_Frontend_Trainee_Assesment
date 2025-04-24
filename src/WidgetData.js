const dashboardData = [
    {
      category: "CSPM Executive Dashboard",
      key: "CSPM",
      widgets: [
        { name: "Cloud Accounts", text: "Cloud account info", chartType: 'pie' },
        { name: "Cloud Account Risk Assessment", text: "Risk analysis info", chartType: 'bar' },
      ],
    },
    {
      category: "CWPP Dashboard",
      key: "CWPP",
      widgets: [
        { name: "Top 5 Namespace Specific Alerts", text: "No Graph data available!", chartType: 'pie' },
        { name: "Workload Alerts", text: "No Graph data available!", chartType: 'bar' },
      ],
    },
    {
      category: "Registry Scan",
      key: "Image",
      widgets: [
        { name: "Image Risk Assessment", text: "1470 Total Vulnerabilities", chartType: 'pie' },
        { name: "Image Security Issues", text: "2 Total Images", chartType: 'bar' },
      ],
    },
  ];
  
  export default dashboardData;
  