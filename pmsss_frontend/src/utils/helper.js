import { BACKEND_URL } from "./constants";

export const updateUserData = async () => {
    const storedData = localStorage.getItem("userData");
    const email = storedData ? JSON.parse(storedData).data.email : null;
    const role = storedData ? JSON.parse(storedData).role : null;
    console.log("role is", role);
    if (email && role === 'student') {
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
                localStorage.setItem("userData", JSON.stringify(data));
            } else {
                console.error('Failed to update user:', data);
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    } else if (role === 'sag') {
        try {
            const response = await fetch(`${BACKEND_URL}/sag/update_sag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data) {
                localStorage.setItem("userData", JSON.stringify(data));
            } else {
                console.error('Failed to get user:', data);
            }
        } catch (error) {
            console.error('Failed to get user:', error);
        }
    } else if (email && role === 'financial') {
        try {
            const response = await fetch(`${BACKEND_URL}/financial/update_financial`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data) {
                localStorage.setItem("userData", JSON.stringify(data));
            } else {
                console.error('Failed to get user:', data);
            }
        } catch (error) {
            console.error('Failed to get user:', error);
        }
    }

};