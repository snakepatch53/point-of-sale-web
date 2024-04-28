import { fetchAdapter } from "./../services/apiConfig";

const resource = "info-web";

export async function getInfo() {
    const response = await fetchAdapter({
        resource,
        // printResponse: true,
    });
    return response;
}

export async function updateInfo({ id, data }) {
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
