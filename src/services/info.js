import { fetchAdapter } from "./../services/apiConfig";

const resource = "info-web";

export async function getInfo() {
    const response = await fetchAdapter({
        resource,
        // printResponse: true,
    });
    return response;
}
