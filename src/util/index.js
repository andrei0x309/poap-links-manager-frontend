const getThemeMode = () => {
  let theme = localStorage.getItem("theme");
  if (theme == null) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      theme = "dark";
    } else {
      theme = "light";
    }

    localStorage.setItem("theme", "light");
    theme = "light";
  }
  return theme;
};

async function postData(url = "", data = {}, headers = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });
  return response;
}

async function getData(url = "", headers = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return response;
}

const checkAlreadyLogin = async (endpointBase, router) => {
  const lsPass = localStorage.getItem("adminPass");
  if (lsPass) {
    //lsPass
    const res = await getData(`${endpointBase}/require-auth-check`, {
      "CUSTOM-AUTH-PSK": lsPass,
    });
    if (res.ok) router.push("/admin");
  }
};

const checkAlreadyLoginAdmin = async (endpointBase, router) => {
  const lsPass = localStorage.getItem("adminPass");
  if (!lsPass) {
    router.push("/login");
  } else {
    //
    const res = await getData(`${endpointBase}/require-auth-check`, {
      "CUSTOM-AUTH-PSK": lsPass,
    });
    if (!res.ok) router.push("/login");
  }
};

const nextDayOfWeek = function (dayName) {
  const date = new Date();
  const now = date.getDay();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const day = days.indexOf(dayName.toLowerCase());
  let diff = day - now;
  diff = diff < 1 ? 7 + diff : diff;
  const nextDayTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * diff;
  return new Date(nextDayTimestamp);
};

function openInNewTab(href) {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href: href,
  }).click();
}

export {
  getThemeMode,
  postData,
  getData,
  checkAlreadyLogin,
  checkAlreadyLoginAdmin,
  nextDayOfWeek,
  openInNewTab,
};
