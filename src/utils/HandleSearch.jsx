export default function HandleSearch(router, search, params) {
   
    if (search) {
        params.set("search", search);
    } else {
        params.delete("search");
    }

    router.push(`/tools?${params.toString()}`);
}
