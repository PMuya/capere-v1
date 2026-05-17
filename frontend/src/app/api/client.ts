const API_BASE_URL = "https://capere-v1-backend.onrender.com";

export async function getRequest(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error("GET request failed");
  return res.json();
}

export async function postRequest(path: string, data: any) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("POST request failed");
  return res.json();
}