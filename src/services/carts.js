import { fetchAdapter } from "./../services/apiConfig";

const resource = "carts";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getCarts() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}

export async function getCartsAllData() {
    const response = await fetchAdapter({
        resource: resource + "?includeProductCartsProductCategoryBusiness=true&includeUser=true",
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storagetCart({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function createBulkCart({ data }) {
    const response = await fetchAdapter({
        resource: "create-bulk-cart",
        data,
        method: "POST",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function updateCart({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function updateCartState({ id, data }) {
    const response = await fetchAdapter({
        resource:
            resource +
            `/${id}/update-state?includeProductCartsProductCategoryBusiness=true&includeUser=true`,
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyCart({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
