const defaultPath = 'http://127.0.0.1:3001/api/v1/';

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

export const createNewMessage = async (body) => {
    console.log(body)
    return await new Promise((resolve, reject) => {
        try{			
			fetch(`${defaultPath}newsLetter`, {
                method: 'POST',
                body : body
            }).then((res) => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err));

		} catch(err) {
			console.log('*********** err  ', err);
			reject();
		}
    });
}