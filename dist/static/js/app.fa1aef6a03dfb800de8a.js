webpackJsonp([0],[function(t,e,a){"use strict";var s=a(2);e.a={myUser:{authenticated:!1},user:{id:0,first_name:"",last_name:""},login:function(t,e,a){var r=this;t.$http.post("https://speak-up-backend.herokuapp.com/signin",e).then(function(t){r.user.id=t.body.id,r.user.first_name=t.body.first_name,r.user.last_name=t.body.last_name,a&&s.a.replace(a+t.body.id)}).catch(function(e){console.log(e),t.error=e})},signup:function(t,e,a){var r=this;t.$http.post("https://speak-up-backend.herokuapp.com/signup",e,function(t){localStorage.setItem("id_token",t.token),r.myUser.authenticated=!0,a&&s.a.replace(a+t.body.id)}).error(function(e){t.error=e})},logout:function(){localStorage.removeItem("token"),this.myUser.authenticated=!1},checkAuth:function(){var t=localStorage.getItem("id_token");this.myUser.authenticated=!!t},getAuthHeader:function(){return{Authorization:"Bearer "+localStorage.getItem("access_token")}}}},,function(t,e,a){"use strict";var s=a(3),r=a(30),n=a(22),i=a.n(n),l=a(24),o=a.n(l),c=a(23),d=a.n(c),u=a(25),p=a.n(u);s.a.use(r.a),e.a=new r.a({routes:[{path:"/",name:"Hello",component:i.a},{path:"/diary/:id",name:"Diary",component:o.a},{path:"/dashboard/:id",name:"Dashboard",component:d.a},{path:"/goals/:id",name:"Goals",component:p.a}]})},,function(t,e,a){"use strict";a(2),a(0);e.a={addAudio:function(t,e){var a=new FormData;return a.append("title",e.title),a.append("file",e.file),a.append("user_id",e.user_id),console.log(e,a),t.$http.post("https://speak-up-backend.herokuapp.com/addAudio/"+e.user_id,a,{method:"post",headers:{"Content-Type":"multipart/form-data","Transfer-Encoding":"chunked"}})}}},function(t,e,a){t.exports=a.p+"static/img/MollyPic.66d4323.jpg"},function(t,e,a){t.exports=a.p+"static/img/speakup_logo_hor.1fa926d.png"},,function(t,e){},function(t,e,a){function s(t){a(18)}var r=a(1)(a(13),a(27),s,"data-v-22533d9c",null);t.exports=r.exports},,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(3),r=a(11),n=a.n(r),i=a(8),l=(a.n(i),a(9)),o=a.n(l),c=a(10),d=a(2);window.d3=a(7),s.a.use(c.a),s.a.use(n.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:d.a,template:"<App/>",components:{App:o.a}})},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(0);e.default={data:function(){return{drawer:null,fixed:!1,shown:!0,items:[{title:"Dashboard",icon:"dashboard",path:"/dashboard/"},{title:"Diary",icon:"mic",path:"/diary/"},{title:"Goals",icon:"star",path:"/goals/"}],mini:!1,right:null,user:s.a.user}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(0);e.default={data:function(){return{signup:!1,login:!1,credentials:{username:"",password:""},error:""}},methods:{submit:function(){var t={username:this.credentials.username,password:this.credentials.password};s.a.login(this,t,"/dashboard/")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=(a(4),a(0));e.default={data:function(){return{items:[],first_name:s.a.user.first_name,last_name:s.a.user.last_name,whatFillers:[{name:"um, uh, hmm",fillerNum:59.88},{name:"so",fillerNum:20.12},{name:"like",fillerNum:10},{name:"you know",fillerNum:2},{name:"well",fillerNum:3},{name:"actually",fillerNum:1},{name:"basically",fillerNum:2},{name:"I mean",fillerNum:1}],fillers:[{title:"Capstone Practice #1",number_of_fillers:25},{title:"Capstone Practice #2",number_of_fillers:24},{title:"Capstone Practice #3",number_of_fillers:22},{title:"Capstone Practice #4",number_of_fillers:22},{title:"Capstone Practice #5",number_of_fillers:25},{title:"Capstone Practice #6",number_of_fillers:22},{title:"Capstone Practice #7",number_of_fillers:21},{title:"Capstone Practice #8",number_of_fillers:20},{title:"Capstone Practice #9",number_of_fillers:22},{title:"Capstone Practice #10",number_of_fillers:19},{title:"Capstone Practice #11",number_of_fillers:18},{title:"Capstone Practice #12",number_of_fillers:17},{title:"Capstone Practice #13",number_of_fillers:18},{title:"Capstone Practice #14",number_of_fillers:15},{title:"Capstone Practice #15",number_of_fillers:18},{title:"Capstone Practice #16",number_of_fillers:17},{title:"Capstone Practice #17",number_of_fillers:15},{title:"Capstone Practice #18",number_of_fillers:10},{title:"Capstone Practice #19",number_of_fillers:14},{title:"Capstone Practice #20",number_of_fillers:13},{title:"Capstone Practice #21",number_of_fillers:12},{title:"Capstone Practice #22",number_of_fillers:8},{title:"Capstone Practice #23",number_of_fillers:5},{title:"Capstone Practice #24",number_of_fillers:7},{title:"Capstone Practice #25",number_of_fillers:6}]}},created:function(){var t=this;this.$http.get("https://speak-up-backend.herokuapp.com/audio/"+s.a.user.id).then(function(e){for(var a=0;a<e.body.length;a++)t.items,t.items.push(e.body[a]);t.renderFillers(t.fillers),t.renderWpm(t.items),t.renderPauses(t.items),t.renderClarity(t.items),t.renderHorizontal(t.whatFillers)})},methods:{renderFillers:function(t){var e=d3.select("svg.fillers-values"),a={top:30,right:20,bottom:30,left:80},s=+e.attr("width")+3*a.left+3*a.right,r=+e.attr("height")+a.top+7*a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleBand().rangeRound([0,s]).padding(.1),l=d3.scaleLinear().rangeRound([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain(t.map(function(t){return t.title})),l.domain([0,30]),o.append("g").attr("class","axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(i).ticks(10)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)"),o.append("g").attr("class","axis axis--y").call(d3.axisLeft(l).ticks(10)).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","0.71em").attr("text-anchor","end"),o.append("text").attr("text-anchor","middle").attr("transform","translate(-"+a.left/2+","+r/2+")rotate(-90)").text("Num of Fillers"),o.append("text").attr("text-anchor","middle").attr("transform","translate("+s/2+","+(r+a.bottom)+")"),o.selectAll(".countFillers .bar").data(t).enter().append("rect").attr("class","bar").attr("x",function(t){return i(t.title)}).attr("y",function(t){return r}).attr("width",i.bandwidth()).transition().duration(4e3).attr("y",function(t){return l(t.number_of_fillers)}).attr("height",function(t){return r-l(t.number_of_fillers)}),d3.selectAll(".countFillers .bar").on("mousemove",function(t){n.style("left",d3.event.pageX+10+"px"),n.style("top",d3.event.pageY-25+"px"),n.style("display","inline-block"),n.html(t.title+"<br>"+t.number_of_fillers)}),d3.selectAll(".countFillers .bar").on("mouseout",function(t){n.style("display","none")})},renderWpm:function(t){var e=d3.select("svg.wpm"),a={top:30,right:20,bottom:30,left:80},s=+e.attr("width")+3*a.left+3*a.right,r=+e.attr("height")+a.top+7*a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleBand().rangeRound([0,s]).padding(.1),l=d3.scaleLinear().rangeRound([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain(t.map(function(t){return t.title})),l.domain([0,250]),o.append("g").attr("class","axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(i).ticks(10)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)"),o.append("g").attr("class","axis axis--y").call(d3.axisLeft(l).ticks(10)).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","0.71em").attr("text-anchor","end"),o.append("text").attr("text-anchor","middle").attr("transform","translate(-"+a.left/2+","+r/2+")rotate(-90)").text("WPM"),o.append("text").attr("text-anchor","middle").attr("transform","translate("+s/2+","+(r+a.bottom)+")"),o.selectAll(".myWPM .bar").data(t).enter().append("rect").attr("class","bar").attr("x",function(t){return i(t.title)}).attr("y",function(t){return r}).attr("width",i.bandwidth()).transition().duration(4e3).attr("y",function(t){return l(t.wpm)}).attr("height",function(t){return r-l(t.wpm)}),d3.selectAll(".myWPM .bar").on("mousemove",function(t){n.style("left",d3.event.pageX+10+"px"),n.style("top",d3.event.pageY-25+"px"),n.style("display","inline-block"),n.html(t.title+"<br>"+t.wpm+"WPM")}),d3.selectAll(".myWPM .bar").on("mouseout",function(t){n.style("display","none")})},renderPauses:function(t){var e=d3.select("svg.pauses"),a={top:30,right:20,bottom:30,left:80},s=+e.attr("width")+3*a.left+3*a.right,r=+e.attr("height")+a.top+7*a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleBand().rangeRound([0,s]).padding(.1),l=d3.scaleLinear().rangeRound([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain(t.map(function(t){return t.title})),l.domain([0,.08]),o.append("g").attr("class","axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(i).ticks(10)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)"),o.append("g").attr("class","axis axis--y").call(d3.axisLeft(l).ticks(10)).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","0.71em").attr("text-anchor","end"),o.append("text").attr("text-anchor","middle").attr("transform","translate(-"+a.left/2+","+r/2+")rotate(-90)").text("Average Pause Length"),o.append("text").attr("text-anchor","middle").attr("transform","translate("+s/2+","+(r+a.bottom)+")"),o.selectAll(".myPauses .bar").data(t).enter().append("rect").attr("class","bar").attr("x",function(t){return i(t.title)}).attr("y",function(t){return r}).attr("width",i.bandwidth()).transition().duration(4e3).attr("y",function(t){return l(t.pauses)}).attr("height",function(t){return r-l(t.pauses)}),d3.selectAll(".myPauses .bar").on("mousemove",function(t){n.style("left",d3.event.pageX+10+"px"),n.style("top",d3.event.pageY-25+"px"),n.style("display","inline-block"),n.html(t.title+"<br>"+t.pauses)}),d3.selectAll(".myPauses .bar").on("mouseout",function(t){n.style("display","none")})},renderClarity:function(t){var e=d3.select("svg.clarity"),a={top:20,right:20,bottom:30,left:80},s=+e.attr("width")+3*a.left+3*a.right,r=+e.attr("height")+a.top+7*a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleBand().rangeRound([0,s]).padding(.1),l=d3.scaleLinear().rangeRound([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain(t.map(function(t){return t.title})),l.domain([0,1]),o.append("g").attr("class","axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(i).ticks(10)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)"),o.append("g").attr("class","axis axis--y").call(d3.axisLeft(l).ticks(5)).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","0.71em").attr("text-anchor","end"),o.append("text").attr("text-anchor","middle").attr("transform","translate(-"+a.left/2+","+r/2+")rotate(-90)").text("Clarity"),o.append("text").attr("text-anchor","middle").attr("transform","translate("+s/2+","+(r+a.bottom)+")"),o.selectAll(".confidence .bar").data(t).enter().append("rect").attr("class","bar").attr("x",function(t){return i(t.title)}).attr("y",function(t){return r}).attr("width",i.bandwidth()).transition().duration(4e3).attr("y",function(t){return l(t.confidence)}).attr("height",function(t){return r-l(t.confidence)}),d3.selectAll(".confidence .bar").on("mousemove",function(t){n.style("left",d3.event.pageX+10+"px"),n.style("top",d3.event.pageY-25+"px"),n.style("display","inline-block"),n.html(t.title+"<br>"+t.confidence)}),d3.selectAll(".confidence .bar").on("mouseout",function(t){n.style("display","none")})},renderWhatFillers:function(t){var e=d3.select("svg.whatFillers"),a={top:20,right:20,bottom:30,left:80},s=+e.attr("width")+3*a.left+3*a.right,r=+e.attr("height")+a.top+7*a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleBand().rangeRound([0,s]).padding(.1),l=d3.scaleLinear().rangeRound([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain(t.map(function(t){return t.name})),l.domain([0,100]),o.append("g").attr("class","axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(i).ticks(10)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)"),o.append("g").attr("class","axis axis--y").call(d3.axisLeft(l).ticks(5)).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","0.71em").attr("text-anchor","end"),o.append("text").attr("text-anchor","middle").attr("transform","translate(-"+a.left/2+","+r/2+")rotate(-90)").text("What Fillers Used"),o.append("text").attr("text-anchor","middle").attr("transform","translate("+s/2+","+(r+a.bottom)+")"),o.selectAll(".fillersUsed .bar").data(this.whatFillers).enter().append("rect").attr("class","bar").attr("x",function(t){return i(t.name)}).attr("y",function(t){return r}).attr("width",i.bandwidth()).transition().duration(4e3).attr("y",function(t){return l(t.fillerNum)}).attr("height",function(t){return r-l(t.fillerNum)}),d3.selectAll(".fillersUsed .bar").on("mousemove",function(t){n.style("left",d3.event.pageX+10+"px"),n.style("top",d3.event.pageY-25+"px"),n.style("display","inline-block"),n.html(t.name+"<br>"+t.fillerNum+"%")}),d3.selectAll(".fillersUsed .bar").on("mouseout",function(t){n.style("display","none")})},renderPausesLine:function(t){var e=d3.select("svg.pauses-line"),a={top:20,right:20,bottom:30,left:50},s=+document.getElementById("pauses-line").style.width.slice(0,-2)-2*a.left-2*a.right,r=+document.getElementById("pauses-line").style.height.slice(0,-2)-a.top-5*a.bottom;console.log(t);var n=d3.scaleBand().rangeRound([0,s]).padding(.1),i=d3.scaleLinear().range([r,0]),l=d3.line().x(function(t){return n(t.title)}).y(function(t){return i(+t.pauses)}),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");n.domain(t.map(function(t){return t.title})),i.domain([0,d3.max(t,function(t){return+t.pauses})]),o.append("path").data([t]).attr("class","line").attr("d",l),o.append("g").attr("class","axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(n)).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-65)"),o.append("g").call(d3.axisLeft(i))},renderHorizontal:function(t){var e=d3.select("svg.whatFillers"),a={top:20,right:10,bottom:30,left:70},s=+document.getElementById("totalFillers").style.width.slice(0,-2)-2*a.left-2*a.right,r=+document.getElementById("totalFillers").style.height.slice(0,-2)-4*a.top-4*a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleLinear().range([0,s]),l=d3.scaleBand().range([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain([0,70]),l.domain(t.map(function(t){return t.name})).padding(.1),o.append("g").attr("class","x axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(i).ticks(10).tickFormat(function(t){return t+"%"}).tickSizeInner([-r])),o.append("g").attr("class","y axis").call(d3.axisLeft(l)),o.selectAll(".fillers .bar").data(this.whatFillers).enter().append("rect").attr("class","bar").attr("x",0).attr("height",l.bandwidth()).transition().duration(4e3).attr("y",function(t){return l(t.name)}).attr("width",function(t){return i(+t.fillerNum)}).on("mousemove",function(t){n.style("left",d3.event.pageX-50+"px").style("top",d3.event.pageY-70+"px").style("display","inline-block").html(t.name+"<br>"+ +t.fillerNum)}).on("mouseout",function(t){n.style("display","none")})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(4),r=a(0);e.default={data:function(){return{seen:!1,show:{},audio:{title:"",file:""},error:"",items:[],fillers:[{name:"um, uh, hmm",fillerNum:7},{name:"so",fillerNum:5},{name:"like",fillerNum:2},{name:"you know",fillerNum:0},{name:"well",fillerNum:0},{name:"actually",fillerNum:0},{name:"basically",fillerNum:1},{name:"I mean",fillerNum:0}],pace:[{name:"part1",part:111.84},{name:"part2",part:254.91},{name:"part3",part:159.32},{name:"part4",part:286.77},{name:"part4",part:286.77},{name:"part5",part:318.64},{name:"part6",part:191.18},{name:"part7",part:191.18},{name:"part8",part:95.59},{name:"part9",part:31.86},{name:"part10",part:31.86}],first_name:r.a.user.first_name,last_name:r.a.user.last_name}},watch:{show:{handler:function(t,e){console.log(this.show),this.renderpace(this.pace),this.renderHorizontal(this.fillers)},deep:!0}},created:function(){var t=this;console.log(r.a.user),this.$http.get("https://speak-up-backend.herokuapp.com/audio/"+r.a.user.id).then(function(e){for(var a={},s=e.body.length-1;s>=0;s--)a[e.body[s].id]=!1,t.items.push(e.body[s]);t.show=a})},methods:{audioUpload:function(t){var e=t.target.files||t.dataTransfer.files;if(!e.length)return void console.log("Audio file is undefined");this.audio.file=e[0]},submit:function(){var t=this,e={title:this.audio.title,file:this.audio.file,user_id:r.a.user.id};s.a.addAudio(this,e).then(function(e){t.items.push(e.body)}).catch(function(e){console.log(e),t.error=e}),this.seen=!1},renderHorizontal:function(t){var e=d3.select("svg.myFillers"),a={top:20,right:10,bottom:30,left:70},s=+e.attr("width")-a.left-a.right,r=+e.attr("height")-a.top-a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleLinear().range([0,s]),l=d3.scaleBand().range([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain([0,d3.max(t,function(t){return t.fillerNum})]),l.domain(t.map(function(t){return t.name})).padding(.1),o.append("g").attr("class","x axis").attr("transform","translate(0,"+r+")").call(d3.axisBottom(i).ticks(10).tickFormat(function(t){return t}).tickSizeInner([-r])),o.append("g").attr("class","y axis").call(d3.axisLeft(l)),o.selectAll(".fillers .bar").data(this.fillers).enter().append("rect").attr("class","bar").attr("x",0).attr("height",l.bandwidth()).transition().duration(2e3).attr("y",function(t){return l(t.name)}).attr("width",function(t){return i(t.fillerNum)}).on("mousemove",function(t){n.style("left",d3.event.pageX-50+"px").style("top",d3.event.pageY-70+"px").style("display","inline-block").html(t.name+"<br>"+t.fillerNum)}).on("mouseout",function(t){n.style("display","none")})},renderpace:function(t){console.log("hello yo"),console.log(d3.select("svg.pace").attr("width"),"width");var e=d3.select("svg.pace"),a={top:30,right:10,bottom:30,left:60},s=+e.attr("width")-a.left-a.right,r=+e.attr("height")-a.top-3*a.bottom,n=d3.select("body").append("div").attr("class","toolTip"),i=d3.scaleBand().rangeRound([0,s]).padding(.1),l=d3.scaleLinear().rangeRound([r,0]),o=e.append("g").attr("transform","translate("+a.left+","+a.top+")");i.domain(t.map(function(t){return t.name})),l.domain([0,300]),o.append("g").attr("class","axis axis--y").call(d3.axisLeft(l).ticks(10)).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy","0.71em").attr("text-anchor","end"),o.append("text").attr("text-anchor","middle").attr("transform","translate(-"+a.left/2+","+r/2+")rotate(-90)"),o.append("text").attr("text-anchor","middle").attr("transform","translate("+s/2+","+(r+a.bottom)+")"),o.selectAll(".pacing .bar").data(t).enter().append("rect").attr("class","bar").attr("x",function(t){return i(t.name)}).attr("y",function(t){return r}).attr("width",i.bandwidth()).transition().duration(2e3).attr("y",function(t){return l(t.part)}).attr("height",function(t){return r-l(t.part)}),d3.selectAll(".pacing .bar").on("mousemove",function(t){n.style("left",d3.event.pageX+10+"px"),n.style("top",d3.event.pageY-25+"px"),n.style("display","inline-block"),n.html(t.name+"<br>"+t.part+"wpm")}),d3.selectAll(".pacing .bar").on("mouseout",function(t){n.style("display","none")})}},mounted:function(){}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,a){t.exports=a.p+"static/img/speakup-logo-circle-only.9462955.png"},function(t,e,a){function s(t){a(20)}var r=a(1)(a(14),a(29),s,"data-v-69735bd0",null);t.exports=r.exports},function(t,e,a){function s(t){a(17)}var r=a(1)(a(15),a(26),s,null,null);t.exports=r.exports},function(t,e,a){function s(t){a(19)}var r=a(1)(a(16),a(28),s,null,null);t.exports=r.exports},function(t,e,a){var s=a(1)(null,null,null,null,null);t.exports=s.exports},function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard"},[a("h2",{staticClass:"text-xs-center"},[t._v("Welcome Back, "+t._s(t.first_name))]),t._v(" "),a("div",{staticClass:"box mb-5"},[t._m(0),t._v(" "),a("div",{staticClass:"stats mt-4 ml-2"},[a("div",{staticClass:"left-side"},[a("ul",[a("li",[a("v-icon",{staticClass:"icons mic",attrs:{fa:""}},[t._v("microphone")]),t._v(" "+t._s(t.items.length)+" Presentations")],1),t._v(" "),a("li",[a("v-icon",{staticClass:"icons soc",attrs:{fa:""}},[t._v("futbol-o")]),t._v(" 2 Goals Met")],1),t._v(" "),a("li",[a("v-icon",{staticClass:"icons fil",attrs:{fa:""}},[t._v("commenting-o")]),t._v("  30% decrease in fillers")],1)])]),t._v(" "),a("div",{staticClass:"right-side"},[a("ul",[a("li",[a("v-icon",{staticClass:"icons pau",attrs:{fa:""}},[t._v("pause")]),t._v(" 15% decrease in pauses")],1),t._v(" "),a("li",[a("v-icon",{staticClass:"icons clo",attrs:{fa:""}},[t._v("clock-o")]),t._v("  15% increase in WPM")],1),t._v(" "),a("li",[a("v-icon",{staticClass:"icons gla",attrs:{fa:""}},[t._v("glass")]),t._v(" 5% increase in clarity")],1)])])])]),t._v(" "),a("v-tabs",{staticClass:"mb-3",attrs:{dark:"",fixed:"",icons:"",centered:""}},[a("v-tabs-bar",{staticClass:"data-tab",slot:"activators"},[a("v-tabs-slider",{staticClass:"tab-slider"}),t._v(" "),a("v-tabs-item",{staticClass:"tab-title",attrs:{href:"#tab-1"}},[a("v-icon",{staticClass:"icons"},[t._v("assessment")]),t._v("\n        All Data\n      ")],1)],1),t._v(" "),t._l(2,function(e){return a("v-tabs-content",{key:e,attrs:{id:"tab-"+e}},[a("v-card",{attrs:{flat:""}},[a("div",{staticClass:"chart-titles"},[a("v-card-text",{staticClass:"leftmost-titles"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("commenting-o")]),t._v(" Fillers")],1),t._v(" "),a("v-card-text",{staticClass:"middle-title"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("clock-o")]),t._v(" WPM")],1),t._v(" "),a("v-card-text",{staticClass:"rightmost-title"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("pause")]),t._v(" Pauses")],1)],1),t._v(" "),a("div",{staticClass:"top-charts"},[a("div",{staticClass:"countFillers"},[a("svg",{staticClass:"fillers-values",staticStyle:{height:"400",width:"450"}})]),t._v(" "),a("div",{staticClass:"myWPM"},[a("svg",{staticClass:"wpm",staticStyle:{height:"400",width:"450"},attrs:{id:"wpm"}})]),t._v(" "),a("div",{staticClass:"myPauses"},[a("svg",{staticClass:"pauses",staticStyle:{height:"400",width:"450"}})])]),t._v(" "),a("div",{staticClass:"chart-titles"},[a("v-card-text",{staticClass:"leftmost-titles"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("glass")]),t._v(" Clarity")],1),t._v(" "),a("v-card-text",{staticClass:"fillers-title"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("quote-left")]),t._v(" Most Common Fillers Used")],1)],1),t._v(" "),a("div",{staticClass:"bottom-charts"},[a("div",{staticClass:"confidence"},[a("svg",{staticClass:"clarity",staticStyle:{height:"400",width:"450"}})]),t._v(" "),a("div",{staticClass:"fillersUsed"},[a("svg",{staticClass:"whatFillers",staticStyle:{height:"500",width:"950"},attrs:{id:"totalFillers"}})])])])],1)})],2)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-pic"},[s("img",{staticClass:"user-pic ml-4 mb-3 mt-4",attrs:{src:a(5),alt:""}})])}]}},function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{attrs:{id:"example-2"}},[s("v-navigation-drawer",{staticClass:"side-nav",attrs:{temporary:"","mini-variant":t.mini,dark:""},on:{"update:miniVariant":function(e){t.mini=e}},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[t.shown?s("div",[s("img",{staticClass:"shown side-nav-logo ml-5 mt-5",attrs:{src:a(6),alt:""}}),t._v(" "),s("br"),t._v(" "),s("v-icon",{staticClass:"social",attrs:{dark:"",fa:""}},[t._v("facebook-f")]),t._v(" "),s("v-icon",{staticClass:"social",attrs:{dark:"",fa:""}},[t._v("twitter")]),t._v(" "),s("v-icon",{staticClass:"social",attrs:{dark:"",fa:""}},[t._v("instagram")]),t._v(" "),s("v-icon",{staticClass:"social",attrs:{dark:"",fa:""}},[t._v("envelope")])],1):t._e(),t._v(" "),s("v-list",{staticClass:"pa-0"},[s("v-list-item",[s("v-list-tile",{staticClass:"ml-3",attrs:{avatar:"",tag:"div"}},[s("v-list-tile-avatar",[s("img",{attrs:{src:a(5)}})]),t._v(" "),s("v-list-tile-content",[s("v-list-tile-title",[t._v(t._s(t.user.first_name)+" "+t._s(t.user.last_name))])],1),t._v(" "),s("v-list-tile-action")],1)],1)],1),t._v(" "),s("v-list",{staticClass:"pt-0",attrs:{dense:""}},[s("v-divider"),t._v(" "),t._l(t.items,function(e){return s("v-list-item",{key:e},[s("v-list-tile",{staticClass:"linked"},[s("v-list-tile-action",[s("router-link",{staticClass:"links",attrs:{to:e.path}},[s("v-icon",{staticClass:"ml-3",attrs:{dark:""}},[t._v(t._s(e.icon))])],1)],1),t._v(" "),s("v-list-tile-content",[s("router-link",{staticClass:"links",attrs:{to:e.path+t.user.id}},[s("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)],1)],1)})],2)],1),t._v(" "),s("v-toolbar",{staticClass:"light-blue accent-2",attrs:{fixed:"",light:""}},[s("v-toolbar-side-icon",{attrs:{light:""},nativeOn:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),s("img",{staticClass:"speakup-logo ml-4 mr-0",attrs:{src:a(21),alt:""}}),t._v(" "),s("v-toolbar-title",{staticClass:"text-xs-center mt-0 ml-1 title"},[t._v(" Speak Up")]),t._v(" "),s("v-spacer"),t._v(" "),s("div",{staticClass:"text-xs-center"},[s("v-menu",{attrs:{"offset-y":""}},[s("v-btn",{attrs:{flat:""},slot:"activator"},[s("v-icon",[t._v("person")]),t._v(t._s(t.user.first_name)),s("v-icon",[t._v("keyboard_arrow_down")])],1),t._v(" "),s("v-list",[s("v-list-tile",[s("v-list-tile-title",[t._v("Log Out")])],1),t._v(" "),s("v-list-tile",[s("v-list-tile-title",[t._v("My Account")])],1)],1)],1)],1)],1),t._v(" "),s("main",[s("v-container",{attrs:{fluid:""}},[s("router-view")],1)],1),t._v(" "),s("v-footer",{staticClass:"pa-3",attrs:{fixed:!t.fixed}},[s("div",{staticClass:"text-xs-center"},[t._v("©2017 Speak Up")])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"diary"},[t._m(0),t._v(" "),a("br"),t._v(" "),a("button",{attrs:{id:"presentation-btn",type:"button"},on:{click:function(e){t.seen=!t.seen}}},[t._v("Submit a New Presentation")]),t._v(" "),t.seen?a("v-layout",{staticClass:"mb-3",attrs:{column:"","align-center":""}},[a("v-card",{staticClass:"mt-3",attrs:{"align-center":""}},[a("v-toolbar",{attrs:{dark:""}},[a("v-toolbar-title",[t._v("Upload a .wav audio file")]),t._v(" "),t.error?a("div",{staticClass:"error"},[a("p",[t._v(t._s(t.error))])]):t._e()],1),t._v(" "),a("v-card-text",{staticClass:"pb-1"},[a("v-text-field",{staticClass:"mt-1",attrs:{label:"Title of Presentation",required:""},model:{value:t.audio.title,callback:function(e){t.audio.title=e},expression:"audio.title"}}),t._v(" "),a("input",{attrs:{type:"file",label:""},on:{change:t.audioUpload}})],1),t._v(" "),a("v-card-actions",{staticClass:"pt-1"},[a("v-btn",{attrs:{id:"submit-btn"},nativeOn:{click:function(e){t.submit()}}},[t._v("SUBMIT")])],1)],1)],1):t._e(),t._v(" "),a("h6",[a("span",[t._v(t._s(t.first_name)+"'s Diary")])]),t._v(" "),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:"",sm12:""}},t._l(t.items,function(e){return a("v-card",{key:e,staticClass:"mb-5",attrs:{value:2===e}},[a("v-card-title",{staticClass:"diary-panels",attrs:{"primary-title":""}},[a("div",[a("div",{staticClass:"headline"},[t._v(t._s(e.title))]),t._v(" "),a("span",{staticClass:"grey--text"},[a("v-icon",{staticClass:"date-icon",attrs:{dark:""}},[t._v("date_range")]),t._v("\n            "+t._s(e.date.slice(0,10))+"\n            "),a("v-icon",{staticClass:"timer-icon",attrs:{dark:""}},[t._v("timer")]),t._v("\n            "+t._s(e.length_of_audio))],1)])]),t._v(" "),a("v-card-actions",{staticClass:"ml-2"},[t._v("\n          Analyze this presentation\n          "),a("v-btn",{attrs:{icon:""},nativeOn:{click:function(a){t.show[e.id]=!t.show[e.id]}}},[a("v-icon",[t._v(t._s(t.show?"keyboard_arrow_down":"keyboard_arrow_up"))])],1)],1),t._v(" "),a("v-slide-y-transition",[a("v-card-text",{directives:[{name:"show",rawName:"v-show",value:t.show[e.id],expression:"show[item.id]"}]},[a("div",{staticClass:"clarity"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("glass")]),t._v(" "),a("h3",{staticClass:"conf-title"},[t._v("Clarity")]),a("input",{staticClass:"range-bar",attrs:{type:"range",min:"0",max:"1",step:"0.1"},domProps:{value:e.confidence}}),a("h3",{staticClass:"conf-val"},[t._v(t._s(e.confidence))])],1),t._v(" "),a("div",{staticClass:"fillers"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("commenting-o")]),t._v(" "),a("h3",{staticClass:"fillers-title"},[t._v("Fillers")]),a("svg",{staticClass:"myFillers",attrs:{id:e.id+"myFillers",height:"400",width:"1050"}})],1),t._v(" "),a("div",{staticClass:"pacing"},[a("v-icon",{staticClass:"icons",attrs:{fa:""}},[t._v("fast-forward")]),t._v(" "),a("h3",{staticClass:"pace-title"},[t._v("Pace")]),a("svg",{staticClass:"pace",attrs:{height:"400",width:"1050"}})],1)])],1)],1)}))],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h6",{staticClass:"perfect"},[a("span",[t._v("Speak Up to Make Perfect")])])}]}},function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"hello"},[s("v-layout",{staticClass:"overlay",attrs:{column:"","align-center":"","justify-center":""}},[s("div",{staticClass:"text-data"},[s("h1",{staticClass:"white--text big-title mb-0"},[s("img",{staticClass:"speakup",attrs:{src:a(6)}})]),t._v(" "),s("h4",{staticClass:"white--text subtitle"},[t._v("Build better public speaking skills through actionable data")]),t._v(" "),s("v-layout",{staticClass:"mt-5",attrs:{row:"","justify-center":""}},[s("v-dialog",{attrs:{persistent:""},model:{value:t.signup,callback:function(e){t.signup=e},expression:"signup"}},[s("v-btn",{staticClass:"auth-btn",attrs:{light:""},slot:"activator"},[t._v("Sign Up")]),t._v(" "),s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[t._v("Sign Up")])]),t._v(" "),t.error?s("div",{staticClass:"error"},[s("p",[t._v(t._s(t.error))])]):t._e(),t._v(" "),s("v-card-text",[s("v-text-field",{staticClass:"mt-1",attrs:{label:"Email",type:"email",required:""},model:{value:t.credentials.username,callback:function(e){t.credentials.username=e},expression:"credentials.username"}}),t._v(" "),s("v-text-field",{staticClass:"mt-1",attrs:{label:"password",type:"password",required:"",hint:"Must be at least 6 characters","persistent-hint":""},model:{value:t.credentials.password,callback:function(e){t.credentials.password=e},expression:"credentials.password"}}),t._v(" "),s("v-text-field",{attrs:{label:"First Name",required:""}}),t._v(" "),s("v-text-field",{attrs:{label:"Last Name",required:""}}),t._v(" "),s("small",[t._v("*indicates required field")])],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"blue--text darken-1",attrs:{flat:""},nativeOn:{click:function(e){t.signup=!1}}},[t._v("Close")]),t._v(" "),s("v-btn",{staticClass:"blue--text darken-1",attrs:{flat:""},nativeOn:{click:function(e){t.signup=!1}}},[t._v("Sign Up")])],1)],1)],1),t._v(" "),s("v-dialog",{attrs:{persistent:""},model:{value:t.login,callback:function(e){t.login=e},expression:"login"}},[s("v-btn",{staticClass:"auth-btn",attrs:{light:""},slot:"activator"},[t._v("Log In")]),t._v(" "),s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[t._v("Log In")])]),t._v(" "),s("v-card-text",[s("v-text-field",{staticClass:"mt-1",attrs:{label:"Email",type:"email",required:""},model:{value:t.credentials.username,callback:function(e){t.credentials.username=e},expression:"credentials.username"}}),t._v(" "),s("v-text-field",{staticClass:"mt-1",attrs:{label:"password",type:"password",required:""},model:{value:t.credentials.password,callback:function(e){t.credentials.password=e},expression:"credentials.password"}}),t._v(" "),s("small",[t._v("*indicates required field")])],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"blue--text darken-1",attrs:{flat:""},nativeOn:{click:function(e){t.login=!1}}},[t._v("Close")]),t._v(" "),s("v-btn",{staticClass:"blue--text darken-1",attrs:{flat:""},nativeOn:{click:function(e){t.submit()}}},[t._v("Log In")])],1)],1)],1)],1)],1)])],1)},staticRenderFns:[]}},,,,function(t,e){}],[12]);
//# sourceMappingURL=app.fa1aef6a03dfb800de8a.js.map