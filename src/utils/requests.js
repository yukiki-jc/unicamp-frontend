import { getUser } from './storeUser'

export async function postRequest (
  data,
  url
) {
  var myHeaders = new Headers();
  const userInfo = getUser();
  if (userInfo !== null) {
    myHeaders.set('token', userInfo.token);
  }
  url = 'http://' + url;
  myHeaders.append('Content-Type', 'application/json; charset=utf-8');
  return fetch(url, {
    credentials: 'include',
    headers: myHeaders,
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 200) 
        return response.json()
      else {
        console.log(response);
        throw 'Connect Error'
      }
    })
}

// the successFunc of get should accept one parameter
export async function getRequest (
  url
) {
  var myHeaders = new Headers();
  const userInfo = getUser();
  if (userInfo !== null) 
    myHeaders.set('token', userInfo.token);
  url = 'http://' + url;
  return fetch(url, {
    credentials: 'include',
    headers: myHeaders,
    method: 'GET'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        throw 'Connect Error'
      }
    })
}
