const isProduction = import.meta.env.MODE == "production";
export const API_URL = isProduction
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_LOCAL;

const _API_URL = API_URL + "api/v1/";

export async function fetchAdapter({
    resource,
    method = "GET",
    data = null,
    printResponse = false,
    all = false,
    formData = false,
}) {
    const session = JSON.parse(localStorage.getItem("session"));
    const sessionToken = session?.token;

    let body = formData ? data : JSON.stringify(data);
    body = method === "GET" ? null : body;

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", sessionToken ? `Bearer ${sessionToken}` : "");
    if (!formData) headers.append("Content-Type", "application/json");
    const response = await fetch(_API_URL + resource, {
        method,
        headers,
        body: body,
    }).then((res) => res.json());

    if (printResponse) console.log(response);
    if (all) return response;
    const token = response?.token;
    const _data = response?.data;

    if (!token) return _data;

    const res = {
        ..._data,
        token,
    };

    if (response.success) return res;
    return false;
}
