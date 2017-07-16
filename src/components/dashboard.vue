<template>
  <div class="dashboard">
    <h2 class="text-xs-center">Welcome Back, {{ first_name }}</h2>
    <div class="box">
      <img class="user-pic ml-5 mb-3 mt-3" src="../assets/MollyPic.jpg" alt="">
      <div id="chart">

      </div>

    </div>
    <v-tabs dark fixed icons centered class="mb-3">
      <v-tabs-bar slot="activators" class="data-tab">
        <v-tabs-slider class="tab-slider"></v-tabs-slider>
        <v-tabs-item href="#tab-1">
          <v-icon>star</v-icon>
          My Goals
        </v-tabs-item>
        <v-tabs-item href="#tab-2">
          <v-icon>assessment</v-icon>
          All Data
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-content
        v-for="i in 2"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <div id="containerChart">
          </div>
          <v-card-text>{{ items }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs>
  </div>
</template>

<script>
import watson from '../watson/watson';
import auth from '../auth/auth';

export default {
  data () {
    return {
      items: [
      ],
      first_name: auth.user.first_name,
      last_name: auth.user.last_name,
    };
  },
  created: function() {
    var self = this
    console.log(auth.user)
    this.$http.get('http://localhost:3000/audio/' + auth.user.id)
    .then(data => {
      for (var i=0; i<data.body.length; i++){
        this.items===this.items.push(data.body[i])
      }
    })
  },
  methods: {
    renderChart: function(jsonData) {
      var svgWidth = 600;
      var svgHeight = 300;

      var yScale = d3.scaleLinear()
      .domain([0, 30])
      .range([0, svgHeight]);

      var xScale = d3.scaleBand()
      .domain(jsonData.map(function(d) { return d.title; }))
      .range([0, svgWidth])
      .padding(0.1);

      var svg = d3.select("#containerChart")
      .append("svg")
      .attr("x", function (d) {return xScale(d.title);})
      .attr("y", 0)
      .attr("height", function (d) { return yScale(d.number_of_fillers); })
      .attr("width", xScale.range)
      .attr("fill", "#4DE0FF");

      svg.selectAll("rect")
      .data(jsonData)
      .enter().append("rect")
    },
  },
  mounted: function() {
    this.renderChart(this.items);
  },
};
</script>

<style lang="css">
.dashboard{
  font-family: 'Open Sans', sans-serif;
}
.data-tab{
  background-color: #4DD6B6;
}
.tab-slider{
  background-color: #433A3F;
}
.user-pic{
  width: 20%;
  border-radius: 50%;
  border: 2px solid #433A3F;
}
.box{
  width: 70%;
  border: 5px double #4DD6B6;
  margin-bottom: 2%;
  margin-left: 15%;
}
.bar {
  fill: steelblue;
}
</style>
