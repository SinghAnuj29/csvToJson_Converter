function generateAgeDistributionReport(AGE_GROUPS) {
  console.log("Age-Group      %Distribution");
  AGE_GROUPS.forEach((group) => {
    console.log(
      `${group.range}     ${((group.count / 60000) * 100).toFixed(2)} %`
    );
  });
}

module.exports = { generateAgeDistributionReport };
