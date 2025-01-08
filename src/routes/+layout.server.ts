import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const id = cookies.get('id') || null;
    if (id === null) { return redirect(302, '/auth'); }
};