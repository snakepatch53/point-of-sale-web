import { fetchAdapter } from "./../services/apiConfig";

const resource = "productSales";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getProductSales() {
    const response = await fetchAdapter({
        resource: resource + "?includeClient=true",
        // printResponse: true,
    });
    return mapNames(response);
}

export async function storageProductSale({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateProductSale({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyProductSale({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
