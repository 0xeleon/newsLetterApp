const defaultPath = 'http://127.0.0.1:3001/api/v1/';

export const getCategories = async () => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}category`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));

		} catch(err) {
			console.log('*********** err  ', err);
			reject();
		}
    });
}

export const getCategoriesByEmail = async () => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}categoryEmail`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));

		} catch(err) {
			console.log('*********** err  ', err);
			reject();
		}
    });
}

export const createCategory = async (body) => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}category`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body : JSON.stringify(body)
            }).then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));

		} catch(err) {
			console.log('*********** err  ', err);
			reject();
		}
    });
}


export const updateCategory = async (body, id) => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}category?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body : JSON.stringify(body)
            }).then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));

		} catch(err) {
			console.log('*********** err  ', err);
			reject();
		}
    });
}


export const deleteCategory = async (id) => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}category?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));

		} catch(err) {
			console.log('*********** err  ', err);
			reject();
		}
    });
}
