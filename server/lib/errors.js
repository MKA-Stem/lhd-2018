import {createError} from 'apollo-errors';

export const UnauthenticatedError = createError('UnauthenticatedError', {
  message: 'Request was not authenticated.'
});

export const BadAuthenticationError = createError('BadAuthenticationError', {
  message: 'Request had a malformed authentication header'
});
