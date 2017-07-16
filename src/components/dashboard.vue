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
          <svg class="fillers" style="height: 300; width: 350;"></svg>
          <svg class="wpm" style="height: 300; width: 350;"></svg>
          <svg class="pauses" style="height: 300; width: 350;"></svg>
          <svg class="clarity" style="height: 300; width: 380;"></svg>
          <svg class="whatFillers" style="height: 300; width: 380;"></svg>
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
      fillers: [
        {"%HESITATION": 0},
        {"so": 0},
        {"like": 0},
        {"you_know": 0},
        {"well": 0},
        {"actually": 0},
        {"basically": 0},
        {"i_mean": 0}
      ],
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
      this.renderFillers(this.items)
      this.renderWpm(this.items)
      this.renderPauses(this.items)
      this.renderClarity(this.items)
      this.renderWhatFillers(this.items)

    })

  },
  methods: {
    renderFillers: function(jsonData) {
      const svg = d3.select('svg.fillers'),
          margin = {
              top: 50,
              right: 10,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');

      console.log(jsonData, "jsonData")
      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);
      const g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain((jsonData).map((d) => {
          return d.title;
      }));
      //y.domain([0, d3.max(dri, (d) => { return d.value; console.log(d.value) })]);
      y.domain([0, 8]);
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
          .text('Speeches');
      g.selectAll('.bar')
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
          .duration(1000)
          .attr('y', (d) => {
              return y(d.number_of_fillers);
          })
          .attr('height', (d) => {
              return height - y(d.number_of_fillers);
          });
      d3.selectAll('.bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.title) + '<br>' + (d.number_of_fillers));
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },
    renderWpm: function(jsonData) {
      const svg = d3.select('svg.wpm'),
          margin = {
              top: 50,
              right: 10,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');

      console.log(jsonData, "jsonData")
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
          .text('Speeches');
      g.selectAll('.bar')
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
          .duration(1000)
          .attr('y', (d) => {
              return y(d.wpm);
          })
          .attr('height', (d) => {
              return height - y(d.wpm);
          });
      d3.selectAll('.bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.title) + '<br>' + (d.wpm));
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    },
    renderPauses: function(jsonData) {
      const svg = d3.select('svg.pauses'),
          margin = {
              top: 50,
              right: 10,
              bottom: 30,
              left: 80
          },
          width = +svg.attr('width') + (margin.left*3)+(margin.right*3),
          height = +svg.attr('height') + margin.top + (margin.bottom * 7);
      let div = d3.select('body').append('div').attr('class', 'toolTip');

      console.log(jsonData, "jsonData")
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
          .text('Speeches');
      g.selectAll('.bar')
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
          .duration(1000)
          .attr('y', (d) => {
              return y(d.pauses);
          })
          .attr('height', (d) => {
              return height - y(d.pauses);
          });
      d3.selectAll('.bar').on('mousemove', function(d) {
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

      console.log(jsonData, "jsonData")
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
          .text('Speeches');
      g.selectAll('.bar')
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
          .duration(1000)
          .attr('y', (d) => {
              return y(d.confidence);
          })
          .attr('height', (d) => {
              return height - y(d.confidence);
          });
      d3.selectAll('.bar').on('mousemove', function(d) {
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

      console.log(jsonData, "jsonData")
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
          .text('Speeches');
      g.selectAll('.bar')
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
          .duration(1000)
          .attr('y', (d) => {
              return y(d.confidence);
          })
          .attr('height', (d) => {
              return height - y(d.confidence);
          });
      d3.selectAll('.bar').on('mousemove', function(d) {
          div.style('left', d3.event.pageX + 10 + 'px');
          div.style('top', d3.event.pageY - 25 + 'px');
          div.style('display', 'inline-block');
          div.html((d.title) + '<br>' + (d.confidence));
      });
      d3.selectAll('.bar').on('mouseout', function(d) {
          div.style('display', 'none');
      });
    }
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
