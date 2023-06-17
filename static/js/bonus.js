// Function to create the gauge chart
function createGaugeChart(washingFrequency) {
    // Create the data array for the gauge chart
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFrequency,
        title: { text: "Belly Button Washing Frequency<br>(Scrubs per Week)" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [0, 9] },
          steps: [
            { range: [0, 1], color: "rgb(255, 0, 0)" },
            { range: [1, 2], color: "rgb(255, 128, 0)" },
            { range: [2, 3], color: "rgb(255, 255, 0)" },
            { range: [3, 4], color: "rgb(128, 255, 0)" },
            { range: [4, 5], color: "rgb(0, 255, 0)" },
            { range: [5, 6], color: "rgb(0, 255, 128)" },
            { range: [6, 7], color: "rgb(0, 255, 255)" },
            { range: [7, 8], color: "rgb(0, 128, 255)" },
            { range: [8, 9], color: "rgb(0, 0, 255)" }
          ],          
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: washingFrequency
          }
        }
      }
    ];
  
    // Create the layout for the gauge chart
    var layout = { width: 500, height: 400 };
  
    // Plot the gauge chart
    Plotly.newPlot("gauge", data, layout);
  }
  