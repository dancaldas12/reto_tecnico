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