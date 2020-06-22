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

    var data = {"OkPercent": 99.98275862068965, "KoPercent": 0.017241379310344827};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.036301369863013695, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.13, 500, 1500, "149 \/login\/index.php"], "isController": false}, {"data": [0.06333333333333334, 500, 1500, "880 Finish Attempt-0"], "isController": false}, {"data": [0.051666666666666666, 500, 1500, "296 login"], "isController": true}, {"data": [0.0016666666666666668, 500, 1500, "732 \/mod\/quiz\/processattempt.php-1"], "isController": false}, {"data": [0.011666666666666667, 500, 1500, "720 \/mod\/quiz\/startattempt.php-0"], "isController": false}, {"data": [0.0033333333333333335, 500, 1500, "732 \/mod\/quiz\/processattempt.php-0"], "isController": false}, {"data": [0.05, 500, 1500, "880 \/mod\/quiz\/processattempt.php-0"], "isController": false}, {"data": [0.03666666666666667, 500, 1500, "880 \/mod\/quiz\/processattempt.php-1"], "isController": false}, {"data": [0.01, 500, 1500, "630 \/mod\/quiz\/view.php"], "isController": false}, {"data": [0.0016666666666666668, 500, 1500, "720 \/mod\/quiz\/startattempt.php-1"], "isController": false}, {"data": [0.05, 500, 1500, "880 Finish Attempt-1"], "isController": false}, {"data": [0.004166666666666667, 500, 1500, "464 \/course\/view.php"], "isController": false}, {"data": [0.018333333333333333, 500, 1500, "880 \/mod\/quiz\/processattempt.php"], "isController": false}, {"data": [0.12166666666666667, 500, 1500, "300 \/login\/index.php-0"], "isController": false}, {"data": [0.0, 500, 1500, "732 \/mod\/quiz\/processattempt.php"], "isController": false}, {"data": [0.0016666666666666668, 500, 1500, "720 \/mod\/quiz\/startattempt.php"], "isController": false}, {"data": [0.02, 500, 1500, "880 Finish Attempt"], "isController": false}, {"data": [0.0, 500, 1500, "880 mod\/quiz\/processattempt.php"], "isController": true}, {"data": [0.0, 500, 1500, "1031 Page 1"], "isController": false}, {"data": [0.0, 500, 1500, "300 \/login\/index.php-2"], "isController": false}, {"data": [0.12166666666666667, 500, 1500, "300 \/login\/index.php-1"], "isController": false}, {"data": [0.051666666666666666, 500, 1500, "300 \/login\/index.php"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 5800, 1, 0.017241379310344827, 8240.916724137925, 26, 32700, 14772.900000000001, 17819.999999999996, 30051.819999999996, 12.639029322548028, 2146.253541192476, 11.049008278836599], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["149 \/login\/index.php", 600, 0, 0.0, 3475.3300000000017, 232, 8455, 6295.299999999999, 7652.799999999999, 8369.18, 1.5482951979624435, 41.56750756567997, 0.6434093911845232], "isController": false}, {"data": ["880 Finish Attempt-0", 300, 0, 0.0, 4974.059999999998, 326, 9599, 7957.7, 8418.9, 9084.16, 0.8677743323922802, 0.9561675433597908, 0.0], "isController": false}, {"data": ["296 login", 300, 0, 0.0, 13538.423333333327, 400, 32700, 30750.9, 31522.5, 32304.190000000002, 0.8091029475620379, 73.57300051276899, 1.211220791383593], "isController": true}, {"data": ["732 \/mod\/quiz\/processattempt.php-1", 300, 0, 0.0, 8152.649999999996, 1399, 11800, 10489.700000000003, 11023.8, 11639.060000000001, 0.8086885497788238, 211.4816905330875, 0.4797271046793415], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php-0", 300, 0, 0.0, 7120.286666666665, 452, 11058, 9878.9, 10093.45, 10630.65, 0.8121013935659914, 0.9059265975387915, 0.5343690615085596], "isController": false}, {"data": ["732 \/mod\/quiz\/processattempt.php-0", 300, 0, 0.0, 6248.279999999998, 1093, 11676, 8677.1, 9231.699999999999, 10106.440000000002, 0.8064646203971032, 0.9138147221460561, 1.4033245705911923], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php-0", 300, 0, 0.0, 5036.3066666666655, 370, 9055, 7632.200000000001, 8095.0, 8969.740000000005, 0.8446159953377197, 0.9421977365699019, 1.4819216544760425], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php-1", 300, 0, 0.0, 6501.669999999998, 558, 10770, 9269.200000000003, 9897.349999999999, 10418.0, 0.851240114974165, 221.60346936652837, 0.5049693801836976], "isController": false}, {"data": ["630 \/mod\/quiz\/view.php", 300, 0, 0.0, 8058.196666666666, 402, 12748, 11115.9, 11471.6, 12391.230000000003, 0.8064602845191884, 206.98714407799412, 0.41882380791728946], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php-1", 300, 0, 0.0, 8539.246666666666, 729, 12983, 10984.300000000001, 11362.449999999999, 11646.48, 0.8073913991285556, 211.2330310087077, 0.5057655315192146], "isController": false}, {"data": ["880 Finish Attempt-1", 300, 0, 0.0, 5644.116666666669, 560, 10655, 8659.6, 9412.75, 10600.720000000003, 0.8910776395947378, 234.83154966198455, 0.0], "isController": false}, {"data": ["464 \/course\/view.php", 600, 0, 0.0, 20112.180000000015, 480, 43748, 39067.3, 40640.7, 43114.58, 1.4959273378227775, 1067.7833845402765, 2.0924381028898824], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php", 300, 0, 0.0, 11538.03333333333, 1027, 19150, 16126.400000000001, 17621.899999999998, 18354.75, 0.8409839512229308, 219.87162675643, 1.97443430688906], "isController": false}, {"data": ["300 \/login\/index.php-0", 300, 0, 0.0, 5720.550000000001, 186, 15838, 13646.8, 14770.4, 15771.810000000001, 0.8214609409013617, 0.9249243742521284, 0.565984449059838], "isController": false}, {"data": ["732 \/mod\/quiz\/processattempt.php", 600, 1, 0.16666666666666666, 18414.693333333344, 2610, 33750, 26279.8, 27757.349999999988, 31215.100000000002, 1.5582189557335966, 612.3111268195453, 4.059946590422148], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php", 300, 0, 0.0, 15659.483333333324, 1195, 22300, 20311.300000000003, 20876.1, 21752.840000000004, 0.7982863453120634, 209.74144513527628, 1.0253406021739997], "isController": false}, {"data": ["880 Finish Attempt", 300, 0, 0.0, 10618.229999999998, 900, 19167, 15860.2, 16682.35, 18546.730000000003, 0.8663734473865845, 229.27571540787417, 0.0], "isController": false}, {"data": ["880 mod\/quiz\/processattempt.php", 300, 0, 0.0, 22156.263333333336, 1994, 36171, 30436.400000000012, 32463.899999999998, 33728.65, 0.8382229673093042, 440.9757957661009, 1.9679521601704388], "isController": true}, {"data": ["1031 Page 1", 300, 1, 0.3333333333333333, 8027.213333333338, 26, 11692, 10112.400000000001, 10414.75, 11361.36, 0.8230384935103414, 214.50151387642902, 0.44805229655174306], "isController": false}, {"data": ["300 \/login\/index.php-2", 100, 0, 0.0, 9838.669999999995, 2538, 13033, 11365.1, 11662.65, 13030.64, 2.216852512802323, 480.34959417743687, 1.3158232004699726], "isController": false}, {"data": ["300 \/login\/index.php-1", 300, 0, 0.0, 4538.329999999996, 191, 9848, 7624.8, 8987.499999999998, 9754.19, 0.8124246814618228, 14.281331030899219, 0.49569541860181715], "isController": false}, {"data": ["300 \/login\/index.php", 300, 0, 0.0, 13538.423333333327, 400, 32700, 30750.9, 31522.5, 32304.190000000002, 0.8091051297265225, 73.57319894040941, 1.2112240580667781], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502\/Bad Gateway", 1, 100.0, 0.017241379310344827], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 5800, 1, "502\/Bad Gateway", 1, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["1031 Page 1", 300, 1, "502\/Bad Gateway", 1, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
