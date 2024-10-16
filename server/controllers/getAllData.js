const { StatusCodes, ReasonPhrases } = require('http-status-codes');

exports.getAllData = (req, res) => {
  res.status(StatusCodes.OK).json({
    status: ReasonPhrases.OK,
    data: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ],
  });
};
