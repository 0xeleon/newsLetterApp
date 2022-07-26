const defaultPath = 'http://127.0.0.1:3001/api/v1/';

export const getEmail = async (email) => {
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}single-email?email=${email}`, {
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
