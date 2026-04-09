const express = require('express');
const router = express.Router();

router.get('/config', async (req, res) => {
  // 1. If tenant is found, return their custom colors and branding
  if (req.tenant) {
    return res.json({
      name: req.tenant.name,
      logoUrl: req.tenant.logoUrl,
      themePrimaryColor: req.tenant.themePrimaryColor,
      branding: req.tenant.branding_json || {},
      isWhiteLabel: true
    });
  }

  // 2. Fallback to Main Platform (Global Marketplace)
  res.json({
    name: 'EduCreative Marketplace',
    themePrimaryColor: '#4F46E5',
    isWhiteLabel: false
  });
});

module.exports = router;
