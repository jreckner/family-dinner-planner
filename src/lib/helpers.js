export const getCurrentMealPlanDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const options = { month: 'numeric', day: 'numeric' };
    const mondayStr = monday.toLocaleDateString(undefined, options);
    const sundayStr = sunday.toLocaleDateString(undefined, options);

    return `Monday ${mondayStr} - Sunday ${sundayStr}`;
};

const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}

export const exportToJson = (data) => {
    downloadFile({
        data: JSON.stringify(data, null, 2),
        fileName: 'recipes.json',
        fileType: 'text/json',
    })
}