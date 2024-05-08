import { fetchAdapter } from "./apiConfig";

const resource = "entities";

export async function getEntities() {
    const response = await fetchAdapter({
        resource
        // printResponse: true,
    });
    return response;
}

export async function findEntity(entityName) {
    const response = await fetchAdapter({
        resource: resource + "/find" + "/" + entityName,
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
