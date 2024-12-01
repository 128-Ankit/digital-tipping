const QRCode = require("qrcode");

exports.generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (error) {
    throw new Error("Error generating QR Code");
  }
};
