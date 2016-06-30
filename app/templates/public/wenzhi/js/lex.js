/*
 *************************************************
 * @Author : thinkerguo
 * @File   : lex.js
 * @Date   : 2015-02-12
 * @Desc   : 句法分析绘图相关代码
 * @Deps   : D3.js/jquery.js
 *************************************************
 */
// Nodes属性
// Links属性
//
// common defs
var x_init      = 50;  // 初始X坐标
var y_init      = 200; // 初始Y坐标
var node_dist   = 20;  // 节点间距
var node_height = 20;  // 节点高度

var graph_width_node  = 50;
var graph_height = 250;

function DrawGraph(url) {
    graph=JSON.parse(decodeURIComponent(url));
    graph_width = graph.nodes.length * graph_width_node + 500;
    // create graph svg
    //var svg = d3.select("body")
    var svg = d3.select(".dependency_chart")
        .append("svg")
		.attr("class","sentence_svg")
        .attr("width",  graph_width)
        .attr("height", graph_height);
    // load data and draw graph
//    d3.json(url, function(error, graph) {
        // Adjust Nodes 
        AdjustNodesPosition(graph.nodes);
        // append <g> 
        var g = svg.selectAll(".node")
            .data(graph.nodes)
            .enter()
            .append("g");
        // append <rect>
        var node = g.append("rect")
            .attr("class", function(e){return e.class;})
			.attr("data-word",function(e){return e.word;})
            .attr("x", function(e){return e.x;})
            .attr("y", function(e){return e.y;})
            .attr("width", function(e){return e.w;})
            .attr("height",function(e){return e.h;});
        // append <text> word
        var text = g.append("text")
            .text(function(e){return e.word;})
			.attr("class", "orign_word")
            .attr("x", function(e){return e.x + (e.w - BytesLength(e.word)*8)/2;})
            .attr("y", function(e){return e.y + 15;});
        // append <text> pos
        var pos = g.append("text")
            .text(function(e){return e.pos == "标点符号"? "标点" : e.pos;})
            .attr("class", "pos")
			.attr("fill","#678f80")
            .attr("x", function(e){return e.x + (e.w - BytesLength(e.word)*8)/2 -5;})
            .attr("y", function(e){return e.y + 40;});

        // config arrow
        ConfigArrow4Svg(svg);
        // append links
        var path = svg.selectAll(".link")
            .data(graph.links)
            .enter()
            .append("path")
            .attr("d", function(e){return LineFunction(e);})
			.attr("data-relation",function(e){return e.relation;})
			.attr("data-from",function(e){return e.source ;})
			.attr("data-to",function(e){return e.target;})
            .attr("class", "link")
            .attr("marker-end", "url(#arrowhead)");

        // append link relation
        var relation = svg.selectAll(".text")
            .data(graph.links)
            .enter()
            .append("text")
			.attr("class","sentence_speech_en")
			.attr("data-from",function(e){return e.source ;})
			.attr("data-to",function(e){return e.target;})
			.attr("data-relation",function(e){return e.relation;})
            .text(function(e){return e.relation;})
            .attr("x", function(e){return e.mid_x - 12;})
            .attr("y", function(e){return e.mid_y+10;});
        // LineFunction defin
        function LineFunction(e) {
            var node_source = graph.nodes[e.source];
            var node_target = graph.nodes[e.target];
            var x_beg = node_source.x + node_source.w / 2;
            var x_end = node_target.x + node_target.w / 2;
            var y     = node_source.y;
            var direction = 0; // 0:left=>right, 1:right=>left
            if (x_beg > x_end) {
                direction = 1;
            }
            var dist  = direction == 0 ? e.target - e.source : e.source - e.target;

            var x_len = direction == 0 ? x_end - x_beg : x_beg - x_end;
            // adjust begin position
            if (direction == 0) {
                x_beg += 10 - dist * 2;
            } else {
                x_beg -= 10 - dist * 2;
            }

            // decide mid position
            var x_mid = 0;
            // ---- left => right
            if (direction == 0) {
                x_mid = x_beg + x_len / 2;
            } else {
                x_mid = x_beg - x_len / 2;
            }

            var y_mid = y_init - dist * 20;
            if (y_mid <= 0) {
                y_mid = 10;
            }
            e.mid_x = x_mid;
            e.mid_y = y_mid;

            var d = "M" + x_beg + "," + y + " ";
            d += "A" + x_len / 2 + " "+ (y-y_mid) + " 0 0 " + (1-direction) + " " + x_end + " " + y;
            return d;
        }
    //}) ;
}

function BytesLength(str) {
    return str.replace(/[^\x00-\xff]/gi, "--").length; 
}

// input nodes : 节点数组
// 根据宽度, 添加坐标以及宽高信息 (用于Rect绘制)
function AdjustNodesPosition(nodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (i == 0) {
            nodes[i].x = x_init;
        } else {
            nodes[i].x = parseInt(nodes[i-1].x) + nodes[i-1].w + node_dist;
        }
        nodes[i].y = y_init;
        nodes[i].w = BytesLength(nodes[i].word) * 8 + 10;  // 一个字节宽度8px, 预留边框20PX
        nodes[i].h = node_height;
    }
}

function ConfigArrow4Svg(svg) {
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("markerWidth", 6)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("fill", "#1a9300")
        .attr("d", "M0,-5L10,0L0,5");
}
