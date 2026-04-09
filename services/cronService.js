const cron = require('node-cron');
const { Op } = require('sequelize');
const Installment = require('../models/Installment');

/**
 * Runs every day at midnight (00:00)
 * Logic: Checks the Installment table for any 'Pending' payments 
 * where the dueDate has passed, and updates them to 'Overdue'.
 */
const startCronJobs = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running midnight installment check...');
    
    try {
      const today = new Date();
      const updatedCount = await Installment.update(
        { status: 'Overdue' },
        { 
          where: { 
            status: 'Pending',
            dueDate: { [Op.lt]: today }
          }
        }
      );
      
      console.log(`Cron Task: Updated ${updatedCount[0]} installments to Overdue status.`);
      
      // WhatsApp/Email integration hook would go here
      // triggerAlerts(updatedCount[0]);
    } catch (err) {
      console.error('Cron job error:', err);
    }
  });
  
  console.log('Cron services initialized.');
};

module.exports = { startCronJobs };
