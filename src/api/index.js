import ajax from "./base";

const baseURL = "";

//get the information from weather api
export const reqWeather = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather`;
  const result = await ajax(url, {
    q: city,
    appid: "31b67d550e93316925f5913b31894f17",
  });
  return result;
};

export function getLogin(loginId, loginPwd) {
  console.log("here");
  const user = datas.user.filter(
    (item) => item.loginId === loginId && item.loginPwd === loginPwd
  );
  console.log("user", user);
  if (user) return 1;
  else {
    return 0;
  }
}

//add user
export function addUser(user) {
  datas.user.push(user);
  return 1;
}
//update user
export function updateUser(id, loginId, loginPwd, email, role) {
  //
}
//delete user
export function deleteUser(id) {
  const user = datas.user.filter((item) => {
    item.id = id;
  });
  const index = datas.user.indexOf(user);
  datas.user.slice(index, 1);
  return 1;
}

//get the userlist information
export function getUsers() {
  return datas.user;
}

//adding a new role
export function addRole(rolename) {
  const obj = {
    rolename,
    authTime: "",
    authAuthor: "",
    menus: [""],
    createAt: "",
  };
  datas.role.push(obj);
  return 1;
}

//getting the role lists
export function getRoles() {
  return datas.role;
}

export const datas = {
  user: [
    {
      id: "1",
      loginId: "guoliang",
      loginPwd: "admin",
      email: "g.zhang724@mybvc.ca",
      role: "admin",
      imgUrl:
        "data:image/jpeg;base64,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",
    },
    {
      id: "2",
      loginId: "sales",
      loginPwd: "admin",
      email: "q.www724@mybvc.ca",
      role: "admin",
      imgUrl:
        "data:image/jpeg;base64,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",
    },
  ],
  role: [
    {
      id: "1",
      authTime: "",
      authAuthor: "",
      menus: [""],
      createAt: "",
      rolename: "admin",
    },
    {
      id: "2",
      authTime: "",
      authAuthor: "",
      menus: [""],
      createAt: "",
      rolename: "salesman",
    },
  ],
};
