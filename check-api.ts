async function check() {
  try {
    const res = await fetch('http://localhost:3000/api/test-key');
    const data = await res.json();
    console.log(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
check();
