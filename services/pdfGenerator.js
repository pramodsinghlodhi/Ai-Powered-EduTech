const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 * High-res Certificate Generator with Unique QR Code placeholder.
 */
const generateCertificate = (data, outputPath) => {
  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4'
  });

  doc.pipe(fs.createWriteStream(outputPath));

  // 1. Background Border
  doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

  // 2. Main Platform Brand
  doc.fontSize(30).text('EduCreative Certification', 0, 80, { align: 'center' });
  
  // 3. User Name
  doc.moveDown();
  doc.fontSize(20).text('This is to certify that', { align: 'center' });
  doc.moveDown();
  doc.fontSize(40).fillColor('#4F46E5').text(data.userName, { align: 'center' });
  
  // 4. Achievement Description
  doc.moveDown();
  doc.fillColor('#000').fontSize(20).text(`Has successfully completed the ${data.level} Level`, { align: 'center' });
  doc.fontSize(25).text(data.courseName || 'Professional Teaching Excellence', { align: 'center' });

  // 5. Unique QR Code Placeholder
  doc.moveDown();
  doc.fontSize(10).text(`Verification ID: ${data.uniqueId}`, 40, doc.page.height - 80);
  
  doc.end();
  
  return outputPath;
};

module.exports = { generateCertificate };
