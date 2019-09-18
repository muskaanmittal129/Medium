const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  fetch('http://1f8ee1bf.ngrok.io/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'test2',
      password: 'abcd'
    });
  })
    .then(res => res.json())
    .then(resData => console.log(resData))
    .catch(err => console.log(err));
});