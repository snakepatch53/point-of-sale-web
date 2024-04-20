import { fetchAdapter } from "./../services/apiConfig";

const resource = "categories";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getCategories() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}

export async function getCategoriesWithBusiness() {
    const response = await fetchAdapter({
        resource: resource + "?includeBusiness=true",
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storageCategory({ data }) {
    const response = await fetchAdapter({
        resource: resource + "?includeBusiness=true",
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateCategory({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id + "?includeBusiness=true",
        data,
        method: "PUT",
        all: true,
        printResponse: true,
    });
    return response;
}

export async function destroyCategory({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
