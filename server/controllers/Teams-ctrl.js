const teams = require("../models/Teams");

const getTeams = async () => {
  await teams
    .find({})
    .then((data, err) => {
      if (err) {
        return res.status(200).json({ success: false, error: err });
      }
      if (data.length == 0) {
        return res
          .status(400)
          .json({
            success: false,
            message: "There is no teams to view at this Time.",
          });
      }
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      if (err) res.status(400).json({ success: false, error: err });
    });
};

const createTeams = async (req, res) => {
  await teams
    .insertMany(req.body.teams)
    .then((equipment) => {
      if (equipment.length == 0) {
        return res
          .status(400)
          .json({ success: false, message: "Cant send empty fields!" });
      }
      return res
        .status(300)
        .json({ success: true, message: "teams added successfully." });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
};

module.exports = {
  createTeams,
  getTeams
};
