// function to retrieve saved projects 
export const getSavedProjectIds = () => {
    const savedProjectIds = localStorage.getItem('saved_projects')
    ? JSON.parse(localStorage.getItem('saved_projects'))
    : [];

    return savedProjectIds;
};

// function to save projects by Id
export const saveProjectIds = (projectIdArr) => {
    if (projectIdArr.length) {
    localStorage.setItem('saved_projects', JSON.stringify(projectIdArr));
    } else {
        localStorage.removeItem('saved_projects');
    }
};

// function to remove project 
export const removeProjectId = (projectId) => {
    const savedProjectIds = localStorage.getItem('saved_projects')
    ? JSON.parse(localStorage.getItem('saved_projects'))
    : null;

    if (!savedProjectIds) {
    return false;
    }

    const updatedSavedProjectIds = savedProjectIds?.filter((savedProjectId) => savedProjectId !== projectId);
    localStorage.setItem('saved_projects', JSON.stringify(updatedSavedProjectIds));

    return true;
};