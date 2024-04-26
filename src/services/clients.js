import { fetchAdapter } from "./apiConfig";

const resource = "clients";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getClients() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storageClient({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function updateClient({ id, data }) {
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

export async function updateClientSession({ data }) {
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

export async function destroyClient({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
