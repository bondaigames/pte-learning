import XLSX from "xlsx";

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export const readExcelFile = (file, sheet, callback /*:File*/) => {
  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;
  reader.onload = e => {
    /* Parse data */
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
    /* Get first worksheet */
    const wsname = wb.SheetNames[sheet];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    if (data.length > 0) {
      /* Update state */
      const result = {
        data: data,
        cols: make_cols(ws["!ref"])
      };
      callback(result);
      return;
    }
    callback({ error: "Data is empty" });
  };
  if (rABS) reader.readAsBinaryString(file);
  else reader.readAsArrayBuffer(file);
};
