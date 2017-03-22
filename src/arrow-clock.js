import * as most from 'most';

// generate an infinite stream of numbers
function* numbers(from=0) {
    for(let i=from ;; ++i) {
        yield i;
    }
}

// create an array with nodes
var nodes = new vis.DataSet([
    {
        id: 0,
        label: ''
    }
]);

// connect all nodes to center
var edges = new vis.DataSet([]);

// create a network
var graphView = document.getElementById('graphview');
var graphController = document.getElementById('graphctrl');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes: {
        shape: 'circle'
    },
    edges: {
      smooth: {
        type: "continuous",
        roundness: 0.1,
        forceDirection: "none"
      }
    },
    configure: {
      enabled: true,
      filter: ['edges'],
      container: graphController
    }
};

// initialize your network!
var network = new vis.Network(graphView, data, options);

var stream = most.from(numbers(1));

var maxNeighbors = 24;

stream.take(maxNeighbors)
    .zip(v=>v, most.periodic(100))
    .delay(1000)
    .forEach((i) => {
      nodes.add({
        id: i,
        label: ""
      });
      edges.add({
        from: 0,
        to: i
      })
    }
  );
