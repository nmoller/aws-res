/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.555068493150685, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7883333333333333, 500, 1500, "149 \/login\/index.php"], "isController": false}, {"data": [0.9283333333333333, 500, 1500, "880 Finish Attempt-0"], "isController": false}, {"data": [0.5133333333333333, 500, 1500, "296 login"], "isController": true}, {"data": [0.515, 500, 1500, "732 \/mod\/quiz\/processattempt.php-1"], "isController": false}, {"data": [0.675, 500, 1500, "720 \/mod\/quiz\/startattempt.php-0"], "isController": false}, {"data": [0.7233333333333334, 500, 1500, "732 \/mod\/quiz\/processattempt.php-0"], "isController": false}, {"data": [0.9316666666666666, 500, 1500, "880 \/mod\/quiz\/processattempt.php-0"], "isController": false}, {"data": [0.8416666666666667, 500, 1500, "880 \/mod\/quiz\/processattempt.php-1"], "isController": false}, {"data": [0.535, 500, 1500, "630 \/mod\/quiz\/view.php"], "isController": false}, {"data": [0.5633333333333334, 500, 1500, "720 \/mod\/quiz\/startattempt.php-1"], "isController": false}, {"data": [0.835, 500, 1500, "880 Finish Attempt-1"], "isController": false}, {"data": [0.21416666666666667, 500, 1500, "464 \/course\/view.php"], "isController": false}, {"data": [0.44333333333333336, 500, 1500, "880 \/mod\/quiz\/processattempt.php"], "isController": false}, {"data": [0.6466666666666666, 500, 1500, "300 \/login\/index.php-0"], "isController": false}, {"data": [0.2, 500, 1500, "732 \/mod\/quiz\/processattempt.php"], "isController": false}, {"data": [0.2683333333333333, 500, 1500, "720 \/mod\/quiz\/startattempt.php"], "isController": false}, {"data": [0.45666666666666667, 500, 1500, "880 Finish Attempt"], "isController": false}, {"data": [0.275, 500, 1500, "880 mod\/quiz\/processattempt.php"], "isController": true}, {"data": [0.5416666666666666, 500, 1500, "1031 Page 1"], "isController": false}, {"data": [0.37, 500, 1500, "300 \/login\/index.php-2"], "isController": false}, {"data": [0.7716666666666666, 500, 1500, "300 \/login\/index.php-1"], "isController": false}, {"data": [0.5133333333333333, 500, 1500, "300 \/login\/index.php"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 5800, 0, 0.0, 965.5365517241395, 156, 10059, 2140.800000000001, 2804.0, 5191.949999999999, 28.565659152584946, 4850.069118006031, 24.97735794433144], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["149 \/login\/index.php", 600, 0, 0.0, 537.4966666666675, 188, 2710, 1103.9, 1781.2499999999964, 2291.8900000000003, 3.17567853664733, 85.25653817628721, 1.3192711420798577], "isController": false}, {"data": ["880 Finish Attempt-0", 300, 0, 0.0, 359.4199999999998, 215, 1209, 625.9000000000003, 787.8999999999997, 1167.3500000000006, 1.8163324614937517, 2.0025774892836385, 0.0], "isController": false}, {"data": ["296 login", 300, 0, 0.0, 2110.79, 336, 10059, 6021.000000000002, 7020.049999999998, 8467.030000000002, 1.8449390247652315, 166.41834059649955, 2.7611386271808716], "isController": true}, {"data": ["732 \/mod\/quiz\/processattempt.php-1", 300, 0, 0.0, 1080.1199999999992, 328, 4648, 2222.1000000000004, 2583.8999999999996, 2885.4900000000007, 1.811845848155239, 473.8369754423169, 1.0750757200577374], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php-0", 300, 0, 0.0, 761.4900000000005, 226, 2191, 1694.3000000000002, 1812.9, 2063.8100000000004, 1.8277414598780288, 2.0401450084380732, 1.2023111790760157], "isController": false}, {"data": ["732 \/mod\/quiz\/processattempt.php-0", 300, 0, 0.0, 622.9766666666671, 203, 3193, 1289.5000000000002, 1636.3999999999992, 1834.93, 1.8130503363208375, 2.0556166410825116, 3.1644987652371768], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php-0", 300, 0, 0.0, 345.4866666666666, 198, 1470, 579.0000000000003, 785.8999999999997, 1321.4300000000005, 1.8170475400204722, 2.02820833812832, 3.1823647586658024], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php-1", 300, 0, 0.0, 532.6500000000002, 307, 2754, 946.2000000000003, 1297.7499999999993, 2219.4100000000026, 1.8149808519520119, 472.51873802301697, 1.0769359039512134], "isController": false}, {"data": ["630 \/mod\/quiz\/view.php", 300, 0, 0.0, 1090.6800000000005, 317, 3742, 2505.100000000001, 2685.5499999999997, 3488.9900000000043, 1.8311888077740068, 469.94755694615696, 0.9506445021608028], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php-1", 300, 0, 0.0, 966.6633333333327, 319, 2804, 2083.1000000000004, 2457.7, 2732.9700000000003, 1.811845848155239, 474.00819841372896, 1.1352346642347668], "isController": false}, {"data": ["880 Finish Attempt-1", 300, 0, 0.0, 512.9200000000008, 314, 1867, 804.7000000000007, 1269.1, 1742.8700000000001, 1.8160465876484617, 478.605357327975, 0.0], "isController": false}, {"data": ["464 \/course\/view.php", 600, 0, 0.0, 2853.611666666669, 427, 10430, 7050.799999999999, 8798.849999999995, 9761.11, 3.4293356805230877, 2447.935986448408, 4.795711615731506], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php", 300, 0, 0.0, 878.2133333333336, 513, 3789, 1578.5000000000011, 1985.35, 2924.370000000001, 1.812152293278727, 473.8050849465264, 4.249048808811892], "isController": false}, {"data": ["300 \/login\/index.php-0", 300, 0, 0.0, 1054.2399999999998, 163, 6196, 2700.3, 4994.549999999999, 5747.93, 1.8545420826507588, 2.0881226238679567, 1.2775331885760208], "isController": false}, {"data": ["732 \/mod\/quiz\/processattempt.php", 600, 0, 0.0, 2207.9133333333334, 545, 8151, 4254.0, 5351.75, 6679.99, 3.4788658897199514, 1368.6604180708964, 9.083407168638024], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php", 300, 0, 0.0, 1728.2633333333329, 549, 4917, 3653.800000000002, 4096.75, 4498.72, 1.8083945675827189, 475.1238373529926, 2.322656772739055], "isController": false}, {"data": ["880 Finish Attempt", 300, 0, 0.0, 872.4099999999996, 539, 2730, 1438.8000000000015, 1768.95, 2462.940000000001, 1.812732634021366, 479.7305984264725, 0.0], "isController": false}, {"data": ["880 mod\/quiz\/processattempt.php", 300, 0, 0.0, 1750.623333333333, 1059, 5351, 2944.2000000000007, 3435.999999999999, 4412.660000000002, 1.8059777864732265, 950.1336611684676, 4.234571117900249], "isController": true}, {"data": ["1031 Page 1", 300, 0, 0.0, 1009.4666666666669, 315, 2886, 2128.0000000000014, 2396.8, 2769.94, 1.812645011600928, 474.064548902519, 0.9870418539733179], "isController": false}, {"data": ["300 \/login\/index.php-2", 100, 0, 0.0, 1583.5399999999997, 342, 4176, 3514.3, 3646.3999999999996, 4174.119999999999, 6.896551724137931, 1479.2467672413793, 4.092133620689655], "isController": false}, {"data": ["300 \/login\/index.php-1", 300, 0, 0.0, 528.5866666666674, 156, 2843, 1089.5000000000002, 1791.6499999999996, 2324.2400000000016, 1.8508121980862602, 32.536808509571784, 1.1288990443639684], "isController": false}, {"data": ["300 \/login\/index.php", 300, 0, 0.0, 2110.79, 336, 10059, 6021.000000000002, 7020.049999999998, 8467.030000000002, 1.8449390247652315, 166.41834059649955, 2.7611386271808716], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 5800, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
