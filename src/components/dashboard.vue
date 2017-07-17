<template>
  <div class="dashboard">
    <h2 class="text-xs-center">Welcome Back, {{ first_name }}</h2>
    <div class="box mb-5">
      <div class="my-pic">
        <img class="user-pic ml-4 mb-3 mt-4" src="../assets/MollyPic.jpg" alt="">
      </div>
      <div class="stats mt-4 ml-2">
        <div class="left-side">
          <ul>
            <li><v-icon fa class="icons mic">microphone</v-icon> {{ items.length }} Presentations</li>
            <li><v-icon fa class="icons soc">futbol-o</v-icon> 2 Goals Met</li>
            <li><v-icon fa class="icons fil">commenting-o</v-icon>  30% decrease in fillers</li>
          </ul>

        </div>
        <div class="right-side">
          <ul>
            <li><v-icon fa class="icons pau">pause</v-icon> 15% decrease in pauses</li>
            <li><v-icon fa class="icons clo">clock-o</v-icon>  15% increase in WPM</li>
            <li><v-icon fa class="icons gla">glass</v-icon> 5% increase in clarity</li>
          </ul>

        </div>
      </div>
    </div>
    <v-tabs dark fixed icons centered class="mb-3">
      <v-tabs-bar slot="activators" class="data-tab">
        <v-tabs-slider class="tab-slider"></v-tabs-slider>
        <v-tabs-item class="tab-title" href="#tab-1">
          <v-icon class="icons">assessment</v-icon>
          All Data
        </v-tabs-item>
        <!-- <v-tabs-item href="#tab-2">
          <v-icon>assessment</v-icon>
          All Data
        </v-tabs-item> -->
      </v-tabs-bar>
      <v-tabs-content
        v-for="i in 2"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <div class="chart-titles">
            <v-card-text class="leftmost-titles"><v-icon fa class="icons">commenting-o</v-icon> Fillers</v-card-text>
            <v-card-text class="middle-title"><v-icon fa class="icons">clock-o</v-icon> WPM</v-card-text>
            <v-card-text class="rightmost-title"><v-icon fa class="icons">pause</v-icon> Pauses</v-card-text>
          </div>
          <div class="countFillers">
            <svg class="fillers" style="height: 350; width: 450;"></svg>
          </div>
          <div class="myWPM">
            <svg class="wpm" style="height: 350; width: 450;"></svg>
          </div>

          <div class="myPauses">
            <svg class="pauses" style="height: 350; width: 450;"></svg>
          </div>
          <div class="chart-titles">
            <v-card-text class="leftmost-titles"><v-icon fa class="icons">glass</v-icon> Clarity</v-card-text>
            <v-card-text><v-icon fa class="icons">quote-left</v-icon> Most Common Fillers Used</v-card-text>
          </div>
          <div class="confidence">
            <svg class="clarity" style="height: 400; width: 450;"></svg>
          </div>

          <div class="fillersUsed">
            <svg class="whatFillers" style="height: 400; width: 450;"></svg>
          </div>

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

      whatFillers: [{"name": "um, uh, hmm", "fillerNum": 59.88 }, { "name": "so", "fillerNum": 20.12 }, { "name": "like", "fillerNum": 10.00 }, { "name": "you know", "fillerNum": 2 }, { "name": "well", "fillerNum": 3 }, { "name": "actually", "fillerNum": 1 }, { "name": "basically", "fillerNum": 2 }, { "name": "I mean", "fillerNum": 1 }],

      fillers: [{"title": "Capstone Practice #1", "number_of_fillers": 25 }, { "title": "Capstone Practice #2", "number_of_fillers": 24 }, { "title": "Capstone Practice #3", "number_of_fillers": 22 }, { "title": "Capstone Practice #4", "number_of_fillers": 22 }, { "title": "Capstone Practice #5", "number_of_fillers": 25 }, { "title": "Capstone Practice #6", "number_of_fillers": 22 }, { "title": "Capstone Practice #7", "number_of_fillers": 21 }, { "title": "Capstone Practice #8", "number_of_fillers": 20 }, { "title": "Capstone Practice #9", "number_of_fillers": 22 }, { "title": "Capstone Practice #10", "number_of_fillers": 19 }, { "title": "Capstone Practice #11", "number_of_fillers": 18 }, { "title": "Capstone Practice #12", "number_of_fillers": 17 }, { "title": "Capstone Practice #13", "number_of_fillers": 18 }, { "title": "Capstone Practice #14", "number_of_fillers": 15 }, { "title": "Capstone Practice #15", "number_of_fillers": 18 }, { "title": "Capstone Practice #16", "number_of_fillers": 17 }, { "title": "Capstone Practice #17", "number_of_fillers": 15 }, { "title": "Capstone Practice #18", "number_of_fillers": 10 }, { "title": "Capstone Practice #19", "number_of_fillers": 14 }, { "title": "Capstone Practice #20", "number_of_fillers": 13 }, { "title": "Capstone Practice #21", "number_of_fillers": 12 }, { "title": "Capstone Practice #22", "number_of_fillers": 8 }, { "title": "Capstone Practice #23", "number_of_fillers": 5 }, { "title": "Capstone Practice #24", "number_of_fillers": 7 }, { "title": "Capstone Practice #25", "number_of_fillers": 6 }],
    };
  },
  created: function() {
    var self = this
    this.$http.get('http://localhost:3000/audio/' + auth.user.id)
    .then(data => {
      for (var i=0; i<data.body.length; i++){
        this.items===this.items.push(data.body[i])
      }
      this.renderFillers(this.fillers)
      this.renderWpm(this.items)
      this.renderPauses(this.items)
      this.renderClarity(this.items)
      this.renderWhatFillers(this.whatFillers)

    })

  },
  methods: {
    renderFillers: function(jsonData) {
      const svg = d3.select('svg.fillers'),
          margin = {
              top: 30,
              right: 20,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');
      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain((jsonData).map((d) => {
          return d.title;
      }));
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain([0, 30]);
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
          .text('Num of Fillers');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')') // centre below axis
      g.selectAll('.countFillers .bar')
          .data(jsonData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => {
              return x(d.title);
          })
          //.attr('y', (d) => { return y(d.value); })
          .attr('y', (d) => {
              return height;
          })
          .attr('width', x.bandwidth())
          .transition()
          .duration(4000)
          .attr('y', (d) => {
              return y(d.number_of_fillers);
          })
          .attr('height', (d) => {
              return height - y(d.number_of_fillers);
          });
      d3.selectAll('.countFillers .bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.title) + '<br>' + (d.number_of_fillers));
      });
      d3.selectAll('.countFillers .bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },
    renderWpm: function(jsonData) {
      const svg = d3.select('svg.wpm'),
          margin = {
              top: 30,
              right: 20,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain((jsonData).map((d) => {
          return d.title;
      }));
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain([0, 250]);
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
          .text('WPM');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')') // centre below axis
      g.selectAll('.myWPM .bar')
          .data(jsonData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => {
              return x(d.title);
          })
          //.attr('y', (d) => { return y(d.value); })
          .attr('y', (d) => {
              return height;
          })
          .attr('width', x.bandwidth())
          .transition()
          .duration(4000)
          .attr('y', (d) => {
              return y(d.wpm);
          })
          .attr('height', (d) => {
              return height - y(d.wpm);
          });
      d3.selectAll('.myWPM .bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.title) + '<br>' + (d.wpm) + "WPM");
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },
    renderPauses: function(jsonData) {
      const svg = d3.select('svg.pauses'),
          margin = {
              top: 30,
              right: 20,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain((jsonData).map((d) => {
          return d.title;
      }));
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain([0, 0.08]);
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
          .text('Average Pause Length');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')') // centre below axis
      g.selectAll('.myPauses .bar')
          .data(jsonData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => {
              return x(d.title);
          })
          //.attr('y', (d) => { return y(d.value); })
          .attr('y', (d) => {
              return height;
          })
          .attr('width', x.bandwidth())
          .transition()
          .duration(4000)
          .attr('y', (d) => {
              return y(d.pauses);
          })
          .attr('height', (d) => {
              return height - y(d.pauses);
          });
      d3.selectAll('.myPauses .bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.title) + '<br>' + (d.pauses));
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },
    renderClarity: function(jsonData) {
      const svg = d3.select('svg.clarity'),
          margin = {
              top: 20,
              right: 20,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain((jsonData).map((d) => {
          return d.title;
      }));
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain([0, 1]);
      // g.append('g')
      //     .attr('class', 'axis axis--x')
      //     .attr('transform', 'translate(0,' + height + ')')
      //     .call(d3.axisBottom(x));
      g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3.axisLeft(y).ticks(5))
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          // .text('Frequency');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(-' + (margin.left / 2) + ',' + (height / 2) + ')rotate(-90)') // text is drawn off the screen top left, move down and out and rotate
          .text('Clarity');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')') // centre below axis
      g.selectAll('.confidence .bar')
          .data(jsonData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => {
              return x(d.title);
          })
          //.attr('y', (d) => { return y(d.value); })
          .attr('y', (d) => {
              return height;
          })
          .attr('width', x.bandwidth())
          .transition()
          .duration(4000)
          .attr('y', (d) => {
              return y(d.confidence);
          })
          .attr('height', (d) => {
              return height - y(d.confidence);
          });
      d3.selectAll('.confidence .bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.title) + '<br>' + (d.confidence));
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },
    renderWhatFillers: function(jsonData) {
      const svg = d3.select('svg.whatFillers'),
          margin = {
              top: 20,
              right: 20,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');
      // var fillers= [
      //   {
      //   "name": "hesitation",
      //   "total": 0
      //   },
      //   {
      //   "name": "so",
      //   "total": 0
      //   },
      //   {
      //   "name":"like",
      //   "total": 0
      //   },
      //   {
      //   "name":"you_know",
      //   "total": 0
      //   },
      //   {
      //   "name":"well",
      //   "total": 0
      //   },
      //   {
      //   "name":"actually",
      //   "total": 0
      //   },
      //   {
      //   "name":"basically",
      //   "total": 0
      //   },
      //   {
      //   "name":"i_mean",
      //   "total": 0
      // }
      // ]
      // var total = 0
      // jsonData.map((d)=>{
      //   console.log(d, "data")
      //   return d.name
      // })
      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain((jsonData).map((d) => {
          return d.name;
      }));
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain([0, 100]);
      // g.append('g')
      //     .attr('class', 'axis axis--x')
      //     .attr('transform', 'translate(0,' + height + ')')
      //     .call(d3.axisBottom(x));
      g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3.axisLeft(y).ticks(5))
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          // .text('Frequency');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(-' + (margin.left / 2) + ',' + (height / 2) + ')rotate(-90)') // text is drawn off the screen top left, move down and out and rotate
          .text('What Fillers Used');
      g.append('text')
          .attr('text-anchor', 'middle') // this makes it easy to centre the text as the transform is applied to the anchor
          .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')') // centre below axis
      g.selectAll('.fillersUsed .bar')
          .data(this.whatFillers)
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
          .duration(4000)
          .attr('y', (d) => {
              return y(d.fillerNum);
          })
          .attr('height', (d) => {
              return height - y(d.fillerNum);
          });
      d3.selectAll('.fillersUsed .bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.name) + '<br>' + (d.fillerNum) + "%");
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },

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
  width: 80%;
  border-radius: 50%;
  border: 4px double #433A3F;
}
.box{
  width: 70%;
  border: 5px double #4DD6B6;
  margin-bottom: 2%;
  margin-left: 15%;
  display: flex;
}
.my-pic{
  width: 25%;
}
.stats{
  width: 75%;
  font-size: 20px;
  display: flex;
}
.left-side{
  width: 50%;
}
.right-side{
  width: 50%;
}
.tab-title{
  font-size: 23px;
}
.chart-titles{
  display: flex;
  font-size: 30px;
}
.leftmost-titles{
  margin-left: 10%;
}
.middle-title{
  margin-left: 10%;
}
.rightmost-title{
  margin-right: 0;
  margin-left: 10%;
}
.icons{
  font-size: 150%;
}
.left-side li, .right-side li{
  list-style-type: none;
  margin-bottom: 10%;
}
.mic, .clo{
  color: #23CE6B !important;
}
.soc, .gla{
  color: #42C3DD !important;
}
.pau, .fil{
  color: #DD7373 !important;
}
.legend {
  border: 1px solid #555555;
  border-radius: 5px 5px 5px 5px;
  font-size: 0.8em;
  margin: 10px;
  padding: 8px;
}
.bld {
    font-weight: bold;
}
.bar {
	fill: #42C3DD;
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
</style>
