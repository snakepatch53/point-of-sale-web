import { fetchAdapter } from "./../services/apiConfig";

const resource = "users";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getUsers() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storageUser({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function updateUser({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "POST",
        all: true,
        formData: true,
        // printResponse: true,
    });
    return response;
}

export async function updateProfile({ data }) {
    const response = await fetchAdapter({
        resource: "update-logued",
        data,
        method: "POST",
        all: true,
        formData: true,
        // printResponse: true,
    });
    return response;
}

export async function updateUserSession({ data }) {
    const response = await fetchAdapter({
        resource: "update-user-session",
        data,
        method: "POST",
        all: true,
        formData: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyUser({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}

export async function registerUser({ data }) {
    const response = await fetchAdapter({
        resource: "register",
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function login({ data }) {
    const response = await fetchAdapter({
        resource: resource + "/login",
        data,
        method: "POST",
        all: true,
    });
    // if (response.success) window.localStorage.setItem("session", JSON.stringify(response.data));
    return response;
}

export async function logout() {
    const response = await fetchAdapter({
        resource: resource + "/logout",
        method: "POST",
        // all: true,
        // printResponse: true,
    });
    return response;
}

export async function existSession() {
    const response = await fetchAdapter({
        resource: "exist-session",
        method: "POST",
        all: true,
        // printResponse: true,
    });
    return response;
}
