$(document).ready(function() {
    $("#classify_button").click(function(){
        // alert($("#input_sec2").val());
        $.post("api/semctc",
        {
            "token" : "qC7pRO8LH912194p36DH",
            "text": $("#input_sec2").val(),
        },
        function(data) {
            var classify_data = eval("(" + data + ")");
            var classify_data_array = new Array();
            var classification = new Array();
            var possibility = new Array();
            classify_data_array = classify_data.classify_data;
            for (var i = 0; i < classify_data.classify_data.length; i++) {
                classification[i] = classify_data.classify_data[i].classification;
                possibility[i] = parseFloat(classify_data.classify_data[i].possibility * 100);

            }
            draw_classify_chart(classification, possibility);
        });
    });

    function draw_classify_chart(classification, possibility) {
    $(function () {
        Highcharts.setOptions({
            colors: ['rgb(74,211,200)']
        });
        // Create the chart
        $('#classify_container').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(0,0,0,0)',
            },
            title: {
                text: '文本分类'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                categories: classification
            },
            yAxis: {
                title: {
                    text: '可能性'
                }

            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [{
                name: 'Brands',
                colorByPoint: false,
                data: [{
                    name: classification[0],
                    y: possibility[0],

                }, {
                    name: classification[1],
                    y: possibility[1],
                   
                }, {
                    name: classification[2],
                    y: possibility[2],
                    
                }, {
                    name: classification[3],
                    y: possibility[3],
                   
                }, {
                    name: classification[4],
                    y: possibility[4],
                  
                }]
            }],
            
        });
    });
    }
})

$(document).ready(function() {
    $("#extract_button").click(function(){
        $.post("api/semcke",
        {
            "token" : "qC7pRO8LH912194p36DH",
            "text": $("#input_sec3").val(),
        },
        function(data) {
            var word_list = eval("(" + data + ")");
            $(function() {
                $("#extract_container").empty();
                $("#extract_container").jQCloud(word_list);
            });
        });
        //draw_extract_chart();
    });
    // function draw_extract_chart() {
    //     var word_list = [
    //     {text: "Lorem", weight: 13},
    //     {text: "Ipsum", weight: 10.5},
    //     {text: "Dolor", weight: 9.4},
    //     {text: "Sit", weight: 8},
    //     {text: "Amet", weight: 6.2},
    //     {text: "Consectetur", weight: 5},
    //     {text: "Adipiscing", weight: 5},
    //     {text: "Elit", weight: 5},
    //     {text: "Nam et", weight: 5},
    //     {text: "Leo", weight: 4},
    //     {text: "Sapien", weight: 4},
    //     {text: "Pellentesque", weight: 3},
    //     {text: "habitant", weight: 3},
    //     {text: "morbi", weight: 3},
    //     {text: "tristisque", weight: 3},
    //     {text: "senectus", weight: 3},
    //     {text: "et netus", weight: 3},
    //     {text: "et malesuada", weight: 3},
    //     {text: "fames", weight: 2},
    //     {text: "ac turpis", weight: 2},
    //     {text: "egestas", weight: 2},
    //     {text: "Aenean", weight: 2},
    //     {text: "vestibulum", weight: 2},
    //     {text: "elit", weight: 2},
    //     {text: "sit amet", weight: 2},
    //     {text: "metus", weight: 2},
    //     {text: "adipiscing", weight: 2},
    //     {text: "ut ultrices", weight: 2},
    //     {text: "justo", weight: 1},
    //     {text: "dictum", weight: 1},
    //     {text: "Ut et leo", weight: 1},
    //     {text: "metus", weight: 1},
    //     {text: "at molestie", weight: 1},
    //     {text: "purus", weight: 1},
    //     {text: "Curabitur", weight: 1},
    //     {text: "diam", weight: 1},
    //     {text: "dui", weight: 1},
    //     {text: "ullamcorper", weight: 1},
    //     {text: "id vuluptate ut", weight: 1},
    //     {text: "mattis", weight: 1},
    //     {text: "et nulla", weight: 1},
    //     {text: "Sed", weight: 1}
    //   ];
      
    // }
})
