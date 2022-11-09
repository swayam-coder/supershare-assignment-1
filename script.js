let data = [
  {
    establishment: "theater",
    symbol: "T",
    unitTimeEarning: 1500,
    buildTime: 5
  },
  {
    establishment: "pub",
    symbol: "P",
    unitTimeEarning: 1000,
    buildTime: 4
  },
  {
    establishment: "park",
    symbol: "C",
    unitTimeEarning: 3000,
    buildTime: 10
  }
];

function calculateProfits(data, earnings, totalTimeUnits) {
  const { unitTimeEarning, buildTime, symbol } = data;
  const noOfPossibleUnits = Math.floor(totalTimeUnits / buildTime);
  
  let totalEarningTime = 0
  let totalDevelopmentTime = 0
  for(let i = 1; i<= noOfPossibleUnits; i++){
     let bussinessRunningTime = (totalTimeUnits - totalDevelopmentTime) - buildTime
     totalEarningTime += bussinessRunningTime
     totalDevelopmentTime += buildTime
  }
  
  let totalProfit = totalEarningTime * unitTimeEarning

  return { totalProfit, noOfPossibleUnits, establishment: symbol };
}

function getResultString({ establishment, noOfPossibleUnits }) {
  return `T: ${establishment === "T" ? noOfPossibleUnits : "0"}, P: ${
    establishment === "P" ? noOfPossibleUnits : "0"
  }, C: ${establishment === "C" ? noOfPossibleUnits : "0"}`;
}

let form = document.getElementById("myform");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let totalTimeUnits = parseInt(document.forms["myForm"]["time"].value);
  let earnings = parseInt(document.forms["myForm"]["earnings"].value);

  const possibleEstablishments = data.filter(val => totalTimeUnits > val.buildTime);

  const solutions = possibleEstablishments
    .map(val => {
      let { totalProfit, ...res } = calculateProfits(
        val,
        earnings,
        totalTimeUnits
      );
      return totalProfit >= 0 ? { totalProfit, ...res } : false;
    })
    .reduce((prev, curr) => {
      if (curr === false) return prev;

      if (!prev.length) return [curr];

      if (prev[0].totalProfit === curr.totalProfit) return [...prev, curr];

      if (prev[0].totalProfit < curr.totalProfit) return [curr];

      return prev;
    }, []);

  document.getElementById("results").innerHTML = solutions.length
    ? solutions
        .map(
          (val, index) =>
            `<div>
      <b>${index + 1}.)</b> ${getResultString(val)}
    </div>`
        )
        .join("")
    : "No Solutions";
});