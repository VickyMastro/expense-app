// siempre recibe un valor numerico, devuelve string
export const amountFormatter = (amount) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = "$1.";
    let negative = false;
  
    if (amount < 0) {
      negative = true;
      amount = Math.abs(amount);
    }
    let arr = amount.toString().split(".");
  
    arr[0] = arr[0].replace(exp, rep);
    if (arr[1]) {
      arr[1] = arr[1].substring(0, 2);
    }
    let formatted = arr[1] ? arr.join(",") : arr[0] + ",00";
    let simbol = negative ? "-$ " : "$ ";
  
    return simbol + formatted;
  };