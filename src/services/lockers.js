import { fetchAdapter } from "./../services/apiConfig";

const resource = "lockers";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getLockers() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storageLocker({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateLocker({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyLocker({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
