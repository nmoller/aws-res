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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5604794520547945, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8, 500, 1500, "149 \/login\/index.php"], "isController": false}, {"data": [0.9283333333333333, 500, 1500, "880 Finish Attempt-0"], "isController": false}, {"data": [0.5433333333333333, 500, 1500, "296 login"], "isController": true}, {"data": [0.52, 500, 1500, "732 \/mod\/quiz\/processattempt.php-1"], "isController": false}, {"data": [0.6933333333333334, 500, 1500, "720 \/mod\/quiz\/startattempt.php-0"], "isController": false}, {"data": [0.7333333333333333, 500, 1500, "732 \/mod\/quiz\/processattempt.php-0"], "isController": false}, {"data": [0.9266666666666666, 500, 1500, "880 \/mod\/quiz\/processattempt.php-0"], "isController": false}, {"data": [0.7966666666666666, 500, 1500, "880 \/mod\/quiz\/processattempt.php-1"], "isController": false}, {"data": [0.5366666666666666, 500, 1500, "630 \/mod\/quiz\/view.php"], "isController": false}, {"data": [0.5683333333333334, 500, 1500, "720 \/mod\/quiz\/startattempt.php-1"], "isController": false}, {"data": [0.8433333333333334, 500, 1500, "880 Finish Attempt-1"], "isController": false}, {"data": [0.21083333333333334, 500, 1500, "464 \/course\/view.php"], "isController": false}, {"data": [0.4483333333333333, 500, 1500, "880 \/mod\/quiz\/processattempt.php"], "isController": false}, {"data": [0.655, 500, 1500, "300 \/login\/index.php-0"], "isController": false}, {"data": [0.20666666666666667, 500, 1500, "732 \/mod\/quiz\/processattempt.php"], "isController": false}, {"data": [0.2833333333333333, 500, 1500, "720 \/mod\/quiz\/startattempt.php"], "isController": false}, {"data": [0.46, 500, 1500, "880 Finish Attempt"], "isController": false}, {"data": [0.255, 500, 1500, "880 mod\/quiz\/processattempt.php"], "isController": true}, {"data": [0.5483333333333333, 500, 1500, "1031 Page 1"], "isController": false}, {"data": [0.325, 500, 1500, "300 \/login\/index.php-2"], "isController": false}, {"data": [0.8116666666666666, 500, 1500, "300 \/login\/index.php-1"], "isController": false}, {"data": [0.5433333333333333, 500, 1500, "300 \/login\/index.php"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 5800, 0, 0.0, 932.9243103448266, 162, 8397, 2011.9000000000005, 2751.8999999999996, 4913.809999999996, 28.869509815633336, 4900.693761658243, 25.248707871670053], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["149 \/login\/index.php", 600, 0, 0.0, 505.0433333333334, 186, 1977, 1074.9, 1208.8999999999944, 1905.5000000000014, 3.190335410596167, 85.65397347967225, 1.325775450900738], "isController": false}, {"data": ["880 Finish Attempt-0", 300, 0, 0.0, 358.9066666666668, 199, 1668, 651.6000000000015, 763.95, 1228.6600000000021, 1.8501958123901445, 2.038612237503469, 0.0], "isController": false}, {"data": ["296 login", 300, 0, 0.0, 1959.2599999999982, 343, 8397, 5616.600000000005, 6244.299999999999, 7417.780000000001, 1.8535566663165504, 167.02677274352646, 2.7747598485644205], "isController": true}, {"data": ["732 \/mod\/quiz\/processattempt.php-1", 300, 0, 0.0, 1057.2133333333336, 317, 4838, 2032.7, 2493.6, 3064.8900000000003, 1.840886079833093, 481.34464503497685, 1.0920193753259901], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php-0", 300, 0, 0.0, 720.2466666666667, 210, 3386, 1557.1000000000004, 1869.4999999999995, 2192.94, 1.846881233224162, 2.0602104444211875, 1.2152622802211333], "isController": false}, {"data": ["732 \/mod\/quiz\/processattempt.php-0", 300, 0, 0.0, 608.5833333333335, 190, 2215, 1274.900000000001, 1526.6, 1690.97, 1.8421408132437644, 2.087303850381323, 3.2149914570719784], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php-0", 300, 0, 0.0, 348.47, 191, 1832, 625.2000000000016, 771.4499999999998, 1351.5700000000004, 1.8496368546308741, 2.063284361628667, 3.2426807364945684], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php-1", 300, 0, 0.0, 559.3733333333331, 299, 3212, 1050.5000000000023, 1259.7999999999997, 2190.5800000000004, 1.8485996857380533, 481.21297384809134, 1.0965951104538312], "isController": false}, {"data": ["630 \/mod\/quiz\/view.php", 300, 0, 0.0, 1029.1766666666679, 299, 5346, 2296.7000000000007, 2606.95, 3116.1500000000005, 1.8448142272073202, 473.376370110858, 0.9580783262000517], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php-1", 300, 0, 0.0, 972.0766666666672, 316, 4248, 1898.0000000000005, 2374.0499999999997, 2947.010000000002, 1.8391255571017833, 481.0591320534296, 1.152039743503289], "isController": false}, {"data": ["880 Finish Attempt-1", 300, 0, 0.0, 500.68, 307, 1429, 760.8000000000001, 1062.5, 1353.6100000000004, 1.8507322730693778, 487.7228252739083, 0.0], "isController": false}, {"data": ["464 \/course\/view.php", 600, 0, 0.0, 2710.956666666664, 413, 10274, 6968.099999999998, 8429.549999999997, 9266.51, 3.44220255067209, 2456.660776227432, 4.814780817752586], "isController": false}, {"data": ["880 \/mod\/quiz\/processattempt.php", 300, 0, 0.0, 907.9166666666663, 494, 4023, 1528.7, 2059.999999999999, 3454.1900000000032, 1.8461765683269948, 482.6416313104623, 4.331772064117713], "isController": false}, {"data": ["300 \/login\/index.php-0", 300, 0, 0.0, 989.7600000000007, 162, 5145, 2692.2000000000007, 4145.0499999999965, 5096.880000000001, 1.8637592023110614, 2.0985006445500574, 1.2841252368527318], "isController": false}, {"data": ["732 \/mod\/quiz\/processattempt.php", 600, 0, 0.0, 2157.108333333331, 517, 7720, 4235.299999999999, 5091.549999999991, 6591.380000000001, 3.5317385571670745, 1389.1952954391274, 9.220090956983425], "isController": false}, {"data": ["720 \/mod\/quiz\/startattempt.php", 300, 0, 0.0, 1692.4033333333346, 540, 5767, 3494.4000000000015, 4062.6999999999994, 5346.320000000005, 1.8352215724178433, 482.0851727765526, 2.3571843954168403], "isController": false}, {"data": ["880 Finish Attempt", 300, 0, 0.0, 859.6266666666672, 509, 2660, 1397.3000000000009, 1704.6, 2368.8500000000013, 1.846290187583083, 488.58651292710846, 0.0], "isController": false}, {"data": ["880 mod\/quiz\/processattempt.php", 300, 0, 0.0, 1767.543333333333, 1044, 6115, 2821.300000000001, 3581.8999999999987, 5478.170000000001, 1.8395428122930515, 967.7083289420635, 4.316206966195335], "isController": true}, {"data": ["1031 Page 1", 300, 0, 0.0, 982.5166666666668, 322, 3602, 1907.3000000000002, 2227.4499999999994, 2771.3200000000024, 1.843805122090629, 482.11262350613373, 1.0037214133380863], "isController": false}, {"data": ["300 \/login\/index.php-2", 100, 0, 0.0, 1532.57, 334, 3143, 2795.0, 2990.049999999999, 3142.94, 7.166403898523721, 1535.1773153083345, 4.253652626487028], "isController": false}, {"data": ["300 \/login\/index.php-1", 300, 0, 0.0, 458.4100000000001, 163, 1859, 932.8000000000001, 1145.55, 1798.6300000000003, 1.8598538154901023, 32.69499501714165, 1.134777212761077], "isController": false}, {"data": ["300 \/login\/index.php", 300, 0, 0.0, 1959.2599999999986, 343, 8397, 5616.600000000005, 6244.299999999999, 7417.780000000001, 1.8535681186283597, 167.0278047285295, 2.7747769925857275], "isController": false}]}, function(index, item){
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
