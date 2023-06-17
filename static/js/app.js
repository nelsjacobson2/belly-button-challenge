// Function to initialize the dashboard
function init() {
    // Fetch the data from samples.json using D3
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(data => {
        // Call functions to create the charts and display the sample metadata
        createBarChart(data);
        createBubbleChart(data);
        displayMetadata(data);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }
  
  // Function to create the bar chart
function createBarChart(data) {
    // Select the dropdown element
    var dropdown = d3.select("#selDataset");
  
    // Get the OTU IDs, sample values, and OTU labels for the selected individual
    var otuIds = data.samples[0].otu_ids.slice(0, 10).reverse();
    var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
    var otuLabels = data.samples[0].otu_labels.slice(0, 10).reverse();
  
    // Create an array of strings for the y-axis labels by adding "OTU" to each OTU ID
    var yLabels = otuIds.map(id => `OTU ${id}`);
  
    // Create the trace for the bar chart
    var trace = {
      x: sampleValues,
      y: yLabels,
      type: "bar",
      orientation: "h",
      text: otuLabels,
      hovertemplate: "%{text}<extra></extra>"
    };
  
    // Create the data array
    var data = [trace];
  
    // Create the layout for the bar chart
    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
  
    // Plot the bar chart
    Plotly.newPlot("bar", data, layout);
  
    // Update the dropdown options
    dropdown.on("change", function () {
      var selectedValue = this.value;
      updateCharts(selectedValue, data);
      updateMetadata(selectedValue, data);
    });
  
    // Initial chart and metadata update
    var initialSample = dropdown.property("value");
    updateCharts(initialSample, data);
    updateMetadata(initialSample, data);
  }
  
  
  // Function to create the bubble chart
function createBubbleChart(data) {
    // Get the OTU IDs, sample values, and OTU labels for the selected sample
    var sample = data.samples[0]; // Assuming you want to display the chart for the first sample only
    var otuIds = sample.otu_ids;
    var sampleValues = sample.sample_values;
    var otuLabels = sample.otu_labels;
  
    // Create the trace object for the bubble chart
    var trace = {
      x: otuIds,
      y: sampleValues,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth"
      },
      text: otuLabels,
      hovertemplate: "OTU ID: %{x}<br>Sample Value: %{y}<br>OTU Label: %{text}<extra></extra>"
    };
  
    // Create the layout for the bubble chart
    var layout = {
      title: "Bacterial Cultures per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Value" },
      showlegend: false
    };
  
    // Plot the bubble chart
    Plotly.newPlot("bubble", [trace], layout);
  }  
  
  // Function to display the sample metadata
  function displayMetadata(data) {
    // TODO: Implement code to display the sample metadata
  }
  
  // Function to update the charts and metadata when a new sample is selected
  function updateCharts(sample, data) {
    // TODO: Implement code to update the charts based on the selected sample
  }
  
  // Function to update the sample metadata when a new sample is selected
  function updateMetadata(sample, data) {
    // TODO: Implement code to update the sample metadata based on the selected sample
  }
  
  // Call the init() function to initialize the dashboard
  init();
  