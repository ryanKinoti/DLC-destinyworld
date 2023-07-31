const Childrens = require("../Models/Childrens");

const getHistory = async (req, res, next) => {
  try {
    const childId = req.params.id;

    // Find the child by their name
    const child = await Childrens.findOne({ _id: childId });

    if (!child) {
      return res.status(404).json({ message: "Child not found." });
    }
    const childName = child.childName;
    // Group the attendance by month
    const attendanceByMonth = child.attendance.reduce((result, record) => {
      const dateParts = record.date.split("/");
      const year = "20" + dateParts[2];
      const monthName = new Date(
        year,
        parseInt(dateParts[1]) - 1
      ).toLocaleString("default", { month: "long" });
      const key = `${monthName.toUpperCase()} ${year}`;

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push({
        date: `${year}-${dateParts[1]}-${dateParts[0]}`,
        present: record.present,
      });
      return result;
    }, {});

    // Convert the grouped attendance object to an array
    const formattedAttendance = Object.keys(attendanceByMonth).map((month) => ({
      month,
      attend: attendanceByMonth[month],
    }));

    // Return the attendance grouped by month for the child
    res.status(200).json({ childName, attendance: formattedAttendance });
  } catch (error) {
    next(error);
  }
};

exports.getHistory = getHistory;
