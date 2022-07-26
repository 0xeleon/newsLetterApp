const defaultPath = 'http://127.0.0.1:3001/api/v1/';

export const getEmails = async () => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}email`, {
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

export const createEmail = async (body) => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}email`, {
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


export const updateEmail = async (body, id) => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}email?id=${id}`, {
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


export const deleteEmail = async (id) => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}email?id=${id}`, {
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
