const request = async (url, method = "GET", body = {}) => {
  const options = {
    method,
    // body: JSON.stringify(body),
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };
  if (method === "POST") options.body = JSON.stringify(body);

  const response = await fetch(`http://localhost:5001${url}`, options);
  return await response.json();
};

const addEmp = async () => {
  const $inp = document.getElementById("name");
  console.log($inp);
  const res = await request("/emps", "POST", { name });
  console.log("post ress>>", res);
};

const delEmp = async () => {
  const $inp = document.getElementById("name");
  console.log($inp);
  const res = await request("/emps", "DELETE", { name });
  console.log("post ress>>", res);
};

const setEmps = async () => {
  const emps = await request("/emps");
  //   console.log(emps);
  const $emps = document.getElementById("emps");
  emps.forEach((emp) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
    ${emp.name}
    <button onclick='delEmp()'></button>
    `;
    $emps.appendChild($li);
  });
};

setEmps();
