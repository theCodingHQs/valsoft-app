export const accordionColorTrigger = (
    status: string
  ): { backgroundColor: string; color: string } => {
    const colorMap: Record<string, { backgroundColor: string; color: string }> = {
      VALUATION_NEW: {
        backgroundColor: 'rgba(112, 128, 144, 0.1)', // slategray/10
        color: '#708090',
      },
      VALUATION_DRAFT: {
        backgroundColor: '#FEFCE8', // yellow-50
        color: '#ab9d07', // yellow-800
      },
      READY_FOR_VISIT: {
        backgroundColor: '#EFF6FF', // blue-50
        color: '#2563EB', // blue-600
      },
      VISIT_DELAYED: {
        backgroundColor: '#FEF2F2', // red-50
        color: '#B91C1C', // red-700
      },
      VISIT_COMPLETED: {
        backgroundColor: 'rgba(0, 128, 128, 0.1)', // teal/10
        color: '#008080',
      },
      REPORT_DELAYED: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)', // gold/10
        color: '#4B5563', // gray-600
      },
      VALUATION_COMPLETED: {
        backgroundColor: '#D1FAE5', // green-100
        color: '#047857', // green-700
      },
      VALUATION_DELETED: {
        backgroundColor: '#ffd0d0', // red-500
        color: '#f97171',
      },
      VALUATION_CANCELLED: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        color: '#000000',
      },
    };
  
    return (
      colorMap[status] || {
        backgroundColor: '#15803D', // fallback green-700
        color: 'black',
      }
    );
  };
  