export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function compareVersion(v1, v2) {
  if (typeof v1 !== "string") return false;
  if (typeof v2 !== "string") return false;
  v1 = v1.split(".");
  v2 = v2.split(".");
  const k = Math.min(v1.length, v2.length);
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length === v2.length ? 0 : v1.length < v2.length ? -1 : 1;
}

export function exportTableToCsv(tableId, filename) {
  if (filename === null || typeof filename === undefined) filename = tableId;
  filename += ".csv";

  const BOM = "\uFEFF";

  const table = document.getElementById(tableId);
  let csvString = BOM;
  for (var rowCnt = 0; rowCnt < table.rows.length; rowCnt++) {
    let rowData = table.rows[rowCnt].cells;
    for (var colCnt = 0; colCnt < rowData.length; colCnt++) {
      let columnData = rowData[colCnt].innerHTML;
      if (columnData === null || columnData.length === 0) {
        columnData = "".replace(/"/g, '""');
      } else {
        columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
      }
      csvString = csvString + '"' + columnData + '",';
    }
    csvString = csvString.substring(0, csvString.length - 1);
    csvString = csvString + "\r\n";
  }
  csvString = csvString.substring(0, csvString.length - 1);

  // IE 10, 11, Edge Run
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([decodeURIComponent(csvString)], {
      type: "text/csv;charset=utf8"
    });

    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else if (window.Blob && window.URL) {
    // HTML5 Blob
    const blob = new Blob([csvString], { type: "text/csv;charset=utf8" });
    const csvUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.setAttribute("style", "display:none");
    a.setAttribute("href", csvUrl);
    a.setAttribute("download", filename);
    document.body.appendChild(a);

    a.click();
    a.remove();
  } else {
    // Data URI
    const csvData =
      "data:application/csv;charset=utf-8," + encodeURIComponent(csvString);
    //const blob = new Blob([csvString], { type: "text/csv;charset=utf8" });
    //const csvUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.setAttribute("style", "display:none");
    a.setAttribute("target", "_blank");
    a.setAttribute("href", csvData);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
