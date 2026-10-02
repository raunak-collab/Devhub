import { useFormStatus } from "react-dom";

export default function OAuthButton({ children }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex gap-3 items-center justify-center w-full
            disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {pending ? (
                <>
                    <span className="h-4 w-4 border-2 border-white/30
                    border-t-white rounded-full animate-spin" />
                </>
            ) : (
                children
            )}
        </button>
    );
}