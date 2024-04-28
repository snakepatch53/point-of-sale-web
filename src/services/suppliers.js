import { fetchAdapter } from "./../services/apiConfig";

const resource = "supliers";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getSuppliers() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storageSupplier({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateSupplier({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function destroySupplier({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
