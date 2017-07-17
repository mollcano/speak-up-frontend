<template>
  <div class="diary">
    <button id="presentation-btn" type="button" v-on:click="seen = !seen">Submit a New Presentation</button>

    <v-layout class="mb-3" column align-center v-if="seen">
      <v-card class="mt-3"align-center>
        <v-toolbar dark>
          <v-toolbar-title>Upload a .wav audio file</v-toolbar-title>
          <div class="error" v-if="error">
            <p>{{ error }}</p>
          </div>
        </v-toolbar>
        <v-card-text class="pb-1">
          <v-text-field
            label="Title of Presentation"
            class="mt-1"
            v-model="audio.title"
            required
          ></v-text-field>
          <input
            type="file"
            label=""
            v-on:change="audioUpload"
          >
        </v-card-text>
        <v-card-actions class="pt-1">
          <v-btn id="submit-btn" @click.native="submit()">SUBMIT</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <h2><span>{{ first_name }}'s Diary</span></h2>
<!-- <svg class="myFillers" height="400" width="450"></svg>
<svg class="pace" height="350" width="1250"></svg> -->
    <v-layout row>
    <v-flex xs12 sm12>
      <v-card class="mb-5" v-for="item in items" :key="item" v-bind:value="item === 2" >
        <v-card-title class="diary-panels" primary-title>
          <div>
            <div class="headline">{{ item.title }}</div>
            <span class="grey--text"><v-icon dark class="date-icon">date_range</v-icon>
            {{ item.date }}
            <v-icon dark class="timer-icon">timer</v-icon>
            {{ item.length_of_audio }}</span>
          </div>
        </v-card-title>
        <v-card-actions class="ml-2">
          Analyze this presentation
          <v-btn icon @click.native="show[item.id] = !show[item.id]">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show[item.id]">
            <div class="clarity">
              <v-icon fa class="icons">glass</v-icon> <h3 class="conf-title">Clarity</h3><input type="range" min="0" max="1" step="0.1" :value="item.confidence" class="range-bar"/><h3 class="conf-val">{{ item.confidence }}</h3>
            </div>
            <div class="fillers">
              <v-icon fa class="icons">commenting-o</v-icon> <h3 class="fillers-title">Fillers</h3><svg :id="item.id+'myFillers'" class="myFillers" height="400" width="1050"></svg>
            </div>
            <div class="pacing">
              <v-icon fa class="icons">fast-forward</v-icon> <h3 class="pace-title">Pace</h3><svg class="pace" height="400" width="1050"></svg>
            </div>

          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import watson from '../watson/watson';
import auth from '../auth/auth';


export default {
  data() {

    return {
      seen: false,
      show: {},
      audio: {
        title: '',
        file: '',
      },
      error: '',
      items: [],
      fillers: [{ "name": "um, uh, hmm", "fillerNum": 7 }, { "name": "so", "fillerNum": 5 }, { "name": "like", "fillerNum": 2 }, { "name": "you know", "fillerNum": 0 }, { "name": "well", "fillerNum": 0 }, { "name": "actually", "fillerNum": 0 }, { "name": "basically", "fillerNum": 1 }, { "name": "I mean", "fillerNum": 0 }],
      pace:  [ { "name": "part1", "part": 111.84 }, { "name": "part2", "part": 254.91 }, { "name": "part3", "part": 159.32 }, { "name": "part4", "part": 286.77 }, { "name": "part4", "part": 286.77 }, { "name": "part5", "part": 318.64 }, { "name": "part6", "part": 191.18 }, { "name": "part7", "part": 191.18 }, { "name": "part8", "part": 95.59 }, { "name": "part9", "part": 31.86 }, { "name": "part10", "part": 31.86 } ],
      first_name: auth.user.first_name,
      last_name: auth.user.last_name,
    };
  },
  watch: {
    show: {
      handler(val, oldval){
        console.log(this.show)
        this.renderpace(this.pace)
        this.renderHorizontal(this.fillers)
      },
      deep: true
    }
  },
  created: function() {
    var self = this
    console.log(auth.user)
    this.$http.get('http://localhost:3000/audio/' + auth.user.id)
    .then(data => {
      var show = {}
      for (var i=(data.body.length)-1; i>=0; i--){
        show[data.body[i].id] =false
        this.items.push(data.body[i])
      }
      // console.log(data.body[data.body.length-1].fillers)
      this.show = show

    })
  },
  methods: {
    audioUpload(e){
      var uploadedFile = e.target.files || e.dataTransfer.files

      if(!uploadedFile.length){
        console.log('Audio file is undefined')
        return
      }
      this.audio.file = uploadedFile[0]
    },
    submit() {
      const audio = {
        title: this.audio.title,
        file: this.audio.file,
        user_id: auth.user.id,
      };
      watson.addAudio(this, audio)
      .then(data => {
        this.items.push(data.body)
      })
      .catch(err =>{
        console.log(err)
        this.error = err
      });
      this.seen = false;
    },
    renderHorizontal: function(jsonData){
      var svg = d3.select("svg.myFillers"),
      margin = {top: 20, right: 10, bottom: 30, left: 70},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

      var tooltip = d3.select("body").append("div").attr("class", "toolTip");

      var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleBand().range([height, 0]);

      var g = svg.append("g")
      		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain([0, d3.max(jsonData, function(d) { return d.fillerNum; })]);
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain(jsonData.map(function(d) { return d.name; })).padding(0.1);

      g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x).ticks(10).tickFormat(function(d) {return d*10 + "%" }).tickSizeInner([-height]));

      g.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(y));

      g.selectAll(".bar")
        .data(this.fillers)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .transition()
        .duration(2000)
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return x(d.fillerNum); })
        .on("mousemove", function(d){
          tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 70 + "px")
            .style("display", "inline-block")
            .html((d.name) + "<br>"  + (d.fillerNum));
        })
      	.on("mouseout", function(d){ tooltip.style("display", "none");});

    },

    renderpace: function(jsonData) {
      console.log("hello yo");
      console.log(d3.select('svg.pace').attr('width'), "width")
      const svg = d3.select('svg.pace'),
          margin = {
              top: 30,
              right: 10,
              bottom: 30,
              left: 60
          },
          width = +svg.attr('width') - (margin.left)-(margin.right),
          height = +svg.attr('height') - margin.top - (margin.bottom*3);
      let div = d3.select('body').append('div').attr('class', 'toolTip');
      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      x.domain((jsonData).map((d) => {
          return d.name;
      }));
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain([0, 300]);
      // g.append('g')
      //     .attr('class', 'axis axis--x')
      //     .attr('transform', 'translate(0,' + height + ')')
      //     .call(d3.axisBottom(x));
      g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3.axisLeft(y).ticks(10))
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          // .text('Frequency');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(-' + (margin.left / 2) + ',' + (height / 2) + ')rotate(-90)') // text is drawn off the screen top left, move down and out and rotate
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')') // centre below axis
      g.selectAll('.bar')
          .data(jsonData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => {
              return x(d.name);
          })
          //.attr('y', (d) => { return y(d.value); })
          .attr('y', (d) => {
              return height;
          })
          .attr('width', x.bandwidth())
          .transition()
          .duration(2000)
          .attr('y', (d) => {
              return y(d.part);
          })
          .attr('height', (d) => {
              return height - y(d.part);
          });
      d3.selectAll('.bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.name) + '<br>' + (d.part + "wpm"));
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },
  },
  mounted: function(){
    // setTimeout(() => this.renderMyFillers(this.fillers), 2000);
    // this.renderpace(this.pace)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.diary {
  font-family: 'Open Sans', sans-serif;
}
#presentation-btn{
  width: 60%;
  margin-left: 20%;
  background-color: #4DD6B6;
  height: 80px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 300%;
  color: #FAFAFA;
  border-style: outset;
  outline: none;
}
#hidden{
  display: none;
  background-color: #433A3F;
  width: 50%;
}
#submit-btn{
  background-color: #4DD6B6;
  color: #FAFAFA;
  font-family: 'Open Sans', sans-serif;
  margin-left: 35% !important;
}
#submit-btn:hover{
  color: #FAFAFA;
}
.diary-panels{
  background-color: #433A3F;
  color: #FAFAFA;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
}
.date-icon, .timer-icon{
  margin-left: 10px;
  margin-right: 0px;
}
h2 {
  width:100%;
  text-align:center;
  border-bottom: 1px solid #000;
  line-height:0.1em;
  margin:10px 0 20px;
  margin-top: 5%;
  margin-bottom: 5%;
}
h2 span {
  background-color: rgb(249, 249, 249);
  padding:0 10px;
}

input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 80%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 80%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #42C3DD;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}
input[type=range]::-moz-range-track {
  width: 80%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #42C3DD;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 80%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #42C3DD;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #42C3DD;
}
input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}
.icons{
  font-size: 150% !important;
}
.clarity, .fillers, .pacing{
  font-size: 20px;
}
.conf-title{
  margin-right: 2%;
  font-size: 25px;
  display: inline;
}
.conf-val{
  margin-left: 2%;
  font-size: 25px;
  display: inline;
}
.fillers .bar {
	fill: #23CE6B;
}
.pacing .bar{
  fill: #DD7373;
}
.axis path,
.axis line {
  fill: none;
  stroke: #D4D8DA;
  stroke-width: 1px;
  shape-rendering: crispEdges;
}
.x path {
	display: none;
}
.toolTip {
	position: absolute;
  display: none;
  min-width: 80px;
  height: auto;
  background: none repeat scroll 0 0 #ffffff;
  border: 1px solid #6F257F;
  padding: 14px;
  text-align: center;
}
.fillers, .pacing{
  display: flex;
}
.fillers svg, .pacing svg{
  margin-left: 2%;
}
.fillers-title, .pace-title{
  margin-right: 2%;
  margin-left: 1%;
  font-size: 25px;
  align-self: center;
  margin-top: 1%;
}


</style>
