import { auth } from '~/lib/auth';

export async function loader({ request }: any) {
    return auth.handler(request);
}

export async function action({ request }: any) {
    return auth.handler(request);
}