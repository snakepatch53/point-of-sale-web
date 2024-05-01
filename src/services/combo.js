import { fetchAdapter } from "./apiConfig";

const resource = "combo";

export async function bulkSale({ data }) {
    const response = await fetchAdapter({
        resource: resource + "/bulkSale",
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}
