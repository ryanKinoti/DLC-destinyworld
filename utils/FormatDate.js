const formatDate = () => {
  let date = new Date(); // Replace this with your date object
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  let formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
};

const calculateAge = (birthdateStr) => {
  let birthdate = parseDate(birthdateStr);
  let currentDate = new Date();

  let yearsDiff = currentDate.getFullYear() - birthdate.getFullYear();
  let birthMonth = birthdate.getMonth();
  let currentMonth = currentDate.getMonth();

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < birthdate.getDate())
  ) {
    return yearsDiff - 1; // Adjust age if birthdate hasn't occurred yet this year
  }

  return yearsDiff;
};

function parseDate(dateStr) {
  let parts = dateStr.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

exports.formatDate = formatDate;
exports.calculateAge = calculateAge;
