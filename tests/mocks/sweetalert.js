const sweetalert = jest.genMockFromModule('sweetalert');

sweetalert.fire = jest.fn();
module.exports = sweetalert;
