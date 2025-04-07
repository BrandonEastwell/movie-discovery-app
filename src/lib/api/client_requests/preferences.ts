const updateUserPreferences = async () => {
    try {
        const response = await fetch('/api/account/preferences/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const updatedPreferences = await response.json();
        if (response.ok && updatedPreferences.result) {
            return updatedPreferences.result;
        } else {
            console.error('Could not update preferences')
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
    }
}