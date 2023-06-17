// Function to initialize the dashboard
function init() {
    // Fetch the data
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function (data) {
        // Populate the dropdown with sample IDs
        var dropdown = d3.select("#selDataset");
        data.names.forEach(function (sampleId) {
          dropdown.append("option").text(sampleId).property("value", sampleId);
        });
  
        // Get the first sample ID
        var initialSampleId = data.names[0];
  
        // Create the initial charts and display metadata
        var initialData = data.samples.filter(sample => sample.id === initialSampleId);
        createBarChart(initialData);
        createBubbleChart(initialData);
        displayMetadata(initialSampleId, data);
      });
  }
  
  // Function to create the bar chart
  function createBarChart(data) {
    // Get the first sample's data
    var sample = data[0];
  
    // Get the top 10 OTUs
    var otuIds = sample.otu_ids.slice(0, 10).reverse();
    var sampleValues = sample.sample_values.slice(0, 10).reverse();
    var otuLabels = sample.otu_labels.slice(0, 10).reverse();
  
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
  }
  
  // Function to create the bubble chart
  function createBubbleChart(data) {
    // Get the first sample's data
    var sample = data[0];
  
    // Get the OTU IDs, sample values, and OTU labels
    var otuIds = sample.otu_ids;
    var sampleValues = sample.sample_values;
    var otuLabels = sample.otu_labels;
  
    // Create the trace for the bubble chart
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
  
 // Function to display sample metadata
function displayMetadata(sampleId, data) {
    // Find the metadata for the selected sample
    var metadata = data.metadata.find(obj => obj.id === parseInt(sampleId));
  
    // Select the sample metadata element
    var sampleMetadataElement = d3.select("#sample-metadata");
  
    // Clear any existing metadata
    sampleMetadataElement.html("");
  
    // Loop through each key-value pair in the metadata object
    Object.entries(metadata).forEach(([key, value]) => {
      // Append a new paragraph element with the key-value pair
      sampleMetadataElement
        .append("p")
        .text(`${key}: ${value}`);
    });
  }
  
  // Function to handle option change
function optionChanged(sampleId) {
    // Fetch the updated data for the selected sample
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function (data) {
        // Filter the data for the selected sample
        var sampleData = data.samples.filter(sample => sample.id === sampleId);
  
        // Update the bar chart
        createBarChart(sampleData);
  
        // Update the bubble chart
        createBubbleChart(sampleData);
  
        // Update the sample metadata
        displayMetadata(sampleId, data);
  
        // Get the washing frequency value for the selected sample
        var washingFrequency = data.metadata.find(obj => obj.id === parseInt(sampleId)).wfreq;
  
        // Update the gauge chart
        createGaugeChart(washingFrequency);
      });
  }
  
  
  // Call the init() function to initialize the dashboard
  init();
  