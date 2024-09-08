import { BACKEND_URL } from "./constants";

export const updateUserData = async () => {
    const storedData = localStorage.getItem("userData");
    const email = storedData ? JSON.parse(storedData).data.email : null;
    if (email) {
        try {
            const response = await fetch(`${BACKEND_URL}/student/update_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data) {
                localStorage.setItem("userData", JSON.stringify(data.data));
            } else {
                console.error('Failed to update user:', data);
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    }
};