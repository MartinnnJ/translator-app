export type StatusNumber = -1 | 0 | 1 | 2 | 3; // -1 None, 0 OK, 1 Error, 2 Translating, 3 Bad Request

export default function apiStatusName(num: StatusNumber) {
  switch(num) {
    case 0:
      return '200 OK';
    case 1:
      return '500 Error';
    case 2:
      return 'translating...'
    case 3:
      return '400 Bad Request'
    default:
      return undefined;
  }
}