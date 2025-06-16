export const buildOkResponse = (data: any): object => {
    return {
        status: 'success',
        data: data || null,
    }
}

export const buildErrorResponse = (error: any): object => {
  return {
    status: 'error',
    message: error.message || 'An unexpected error occurred',
    code: error.code || 500,
  };
};

export const getScheduleId = (scheduleId: string): any => {
  if (!scheduleId || typeof scheduleId !== 'string') {
    throw new Error('Invalid scheduleId provided');
  }
  // Asumiendo que la cadena tiene el siguiente formato:
  // [0-2]: scheduleId (3 dígitos)
  // [3]: centerId (1 dígito)
  // [4]: specialtyId (1 dígito)
  // [5]: medicId (1 dígito)
  // [6-19]: fecha y hora (YYYYMMDDHHmmss, 14 dígitos)
  const schedule = {
    scheduleId: parseInt(scheduleId.substring(0, 3), 10),
    centerId: parseInt(scheduleId.substring(3, 4), 10),
    specialtyId: parseInt(scheduleId.substring(4, 5), 10),
    medicId: parseInt(scheduleId.substring(5, 6), 10),
    date: fromatDate(scheduleId.substring(6, 20)),
  };

  return schedule;
}

export const fromatDate = (dateString: string): string => {
   const year = dateString.substring(0, 4);
  const day = dateString.substring(4, 6);
  const month = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  const second = dateString.substring(12, 14);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}