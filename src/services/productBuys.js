import { fetchAdapter } from "./../services/apiConfig";

const resource = "productBuys";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getProductBuys() {
    const response = await fetchAdapter({
        resource,
        // printResponse: true,
    });
    return mapNames(response);
}

export async function storageProductBuy({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateProductBuy({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyProductBuy({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
