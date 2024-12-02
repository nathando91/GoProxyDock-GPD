const axios = require('axios');
require('dotenv').config();

// GoDaddy API credentials
const apiKey = process.env.GODADDY_API_KEY;
const apiSecret = process.env.GODADDY_API_SECRET;
// Interval for checking IP address (in milliseconds)
const interval = process.env.INTERVAL || 300000; // Default is 5 minutes (300,000 ms)

// Domains details
const domains = process.env.DOMAINS.split(',');

// Object to store the last known IP for each domain
const lastKnownIps = {};

// Get the current public IP address
const getCurrentIp = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching current IP address:', error);
    throw error;
  }
};

// Update the DNS record on GoDaddy
const updateDnsRecord = async (domain, ip) => {
  const url1 = `https://api.godaddy.com/v1/domains/${domain}/records/A/@`;
  const url2 = `https://api.godaddy.com/v1/domains/${domain}/records/A/*`;
  const headers = {
    'Authorization': `sso-key ${apiKey}:${apiSecret}`,
    'Content-Type': 'application/json',
  };
  const data = [
    {
      'data': ip,
      'ttl': 600,
    },
  ];

  try {
    await axios.put(url1, data, { headers });
    await axios.put(url2, data, { headers });
    console.log(`DNS record for ${domain} updated successfully to IP: ${ip}`);
  } catch (error) {
    console.error(`Error updating DNS record for ${domain}:`, error);
    throw error;
  }
};

// Get the last known IP address from memory
const getLastKnownIps = () => {
  return lastKnownIps;
};

// Set the current IP address in memory
const setLastKnownIps = (ips) => {
  Object.assign(lastKnownIps, ips);
};

// Main function
const main = async () => {
  try {
    const currentIp = await getCurrentIp();
    const lastKnownIps = getLastKnownIps();

    const updatePromises = domains.map(async (domain) => {
      if (currentIp !== lastKnownIps[domain]) {
        await updateDnsRecord(domain, currentIp);
        lastKnownIps[domain] = currentIp;
      } else {
        console.log(`IP address for ${domain} has not changed.`);
      }
    });

    await Promise.all(updatePromises);
    setLastKnownIps(lastKnownIps);
  } catch (error) {
    console.error('Error in main function:', error);
  }
};

main();
setInterval(main, interval);
