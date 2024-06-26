import { fetchAdapter } from "./../services/apiConfig";

const resource = "productIns";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getProductIns() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storageProductIn({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateProductIn({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyProductIn({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
