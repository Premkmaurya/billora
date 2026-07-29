/**
 * Utility to parse and calculate start and end Date boundaries
 * for dashboard date range filtering.
 */
function calculateDashboardDateRange(query = {}) {
  const range = String(query.range || query.dateRange || "today").trim();
  const lowerRange = range.toLowerCase();
  const now = new Date();

  let startDate;
  let endDate;

  switch (lowerRange) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      break;
    }
    case "yesterday": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
      break;
    }
    case "last7days": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      break;
    }
    case "last30days": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      break;
    }
    case "thismonth": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    }
    case "lastmonth": {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;
    }
    case "thisyear": {
      startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    }
    case "custom": {
      const fromVal = query.from || query.startDate || query.dateFrom;
      const toVal = query.to || query.endDate || query.dateTo;

      if (fromVal) {
        const parsedFrom = new Date(fromVal);
        if (!isNaN(parsedFrom.getTime())) {
          startDate = new Date(parsedFrom.getFullYear(), parsedFrom.getMonth(), parsedFrom.getDate(), 0, 0, 0, 0);
        } else {
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        }
      } else {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      }

      if (toVal) {
        const parsedTo = new Date(toVal);
        if (!isNaN(parsedTo.getTime())) {
          endDate = new Date(parsedTo.getFullYear(), parsedTo.getMonth(), parsedTo.getDate(), 23, 59, 59, 999);
        } else {
          endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        }
      } else {
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      }
      break;
    }
    default: {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      break;
    }
  }

  return { startDate, endDate, range };
}

module.exports = { calculateDashboardDateRange };
