const Tenant = require('../models/Tenant');

const tenantIdentification = async (req, res, next) => {
  const host = req.headers.host; // e.g., 'abcacademy.educreative.com' or 'veereducation.com'
  
  try {
    let tenant = null;

    // 1. Check for Custom Domain
    tenant = await Tenant.findOne({ where: { customDomain: host, isActive: true } });

    // 2. Fallback to Subdomain (if it's a subdomain of your main platform)
    const baseDomain = process.env.BASE_DOMAIN || 'educreative.com';
    if (!tenant && host.includes(baseDomain)) {
      const subdomain = host.split('.')[0];
      tenant = await Tenant.findOne({ where: { subdomain, isActive: true } });
    }


    if (tenant) {
      req.tenant = tenant;
      req.tenantId = tenant.id;
    }

    next();
  } catch (error) {
    console.error('Tenant identification error:', error);
    next(); // Continue even if tenant is not found (might be global marketplace)
  }
};

module.exports = tenantIdentification;
