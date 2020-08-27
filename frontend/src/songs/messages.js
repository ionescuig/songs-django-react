export function alertMsg (err, action) {
  if(err.response.status === 401) return `You are not authorized to ${action}. \nPlease login.`;
  else if(err.response.status === 403) return `You are not authorized to ${action}. \nPlease login with correct credentials.`;
  else return err.response.status;
};
